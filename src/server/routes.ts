import crypto from 'crypto';
import express, { type NextFunction, type Request, type Response } from 'express';
import type {
  ContactSubmission,
  PyqPaper,
  PyqSection,
  SearchResultItem,
  StudyNote,
} from '../shared/types';
import { catalogStore, StorageQuotaError } from './store';

function cleanText(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

function normalizeCompactText(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  // Collapse excessive consecutive blank lines to keep storage lean without altering Markdown meaning
  return value
    .replace(/\r\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim()
    .slice(0, maxLen);
}

function validateSafeHttpUrl(raw: unknown): { valid: boolean; url?: string } {
  if (raw === undefined || raw === null || String(raw).trim() === '') {
    return { valid: true, url: undefined };
  }
  if (typeof raw !== 'string') return { valid: false };
  const trimmed = raw.trim();
  if (trimmed.length > 500) return { valid: false };
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return { valid: false };
    }
    return { valid: true, url: parsed.toString() };
  } catch {
    return { valid: false };
  }
}

/**
 * Lightweight zero-dependency in-memory sliding-window rate limiter.
 * Protects free-tier CPU, bandwidth, and storage from abusive requests without requiring Redis or paid WAFs.
 */
function createRateLimiter(options: {
  windowMs: number;
  maxRequests: number;
  message: string;
}) {
  const buckets = new Map<string, { count: number; resetAt: number }>();

  return (req: Request, res: Response, next: NextFunction): void => {
    const now = Date.now();
    // Prune expired keys and enforce a hard cap: a flood of unique IPs must not
    // be able to grow this in-memory map without bound.
    if (buckets.size >= 5_000) {
      for (const [key, entry] of buckets.entries()) {
        if (entry.resetAt <= now) buckets.delete(key);
      }
      if (buckets.size >= 5_000) {
        // Evict the bucket that expires soonest. This is a bounded-memory,
        // best-effort limiter; a shared store is needed for multi-instance limits.
        let oldestKey: string | undefined;
        let earliestReset = Number.POSITIVE_INFINITY;
        for (const [key, entry] of buckets.entries()) {
          if (entry.resetAt < earliestReset) {
            earliestReset = entry.resetAt;
            oldestKey = key;
          }
        }
        if (oldestKey) buckets.delete(oldestKey);
      }
    }

    // req.ip is reliable only when TRUST_PROXY_HOPS matches the real proxy chain.
    // Cloudflare's header is only used when the owner confirms the app sits behind Cloudflare.
    const cfIp = req.headers['cf-connecting-ip'];
    const clientIp =
      (process.env.TRUST_CLOUDFLARE === 'true' && typeof cfIp === 'string' && cfIp) || req.ip || 'unknown';

    const existing = buckets.get(clientIp);
    if (!existing || existing.resetAt <= now) {
      buckets.set(clientIp, { count: 1, resetAt: now + options.windowMs });
      next();
      return;
    }

    if (existing.count >= options.maxRequests) {
      const retryAfterSec = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
      res.setHeader('Retry-After', String(retryAfterSec));
      res.status(429).json({ error: options.message });
      return;
    }

    existing.count += 1;
    next();
  };
}

const VALID_CONTACT_CATEGORIES = new Set<ContactSubmission['category']>([
  'Resource Request',
  'Original Contribution',
  'Syllabus Correction',
  'Copyright Notice',
  'General',
]);

// Public contributions must select a recognised Creative Commons licence.
// 'Original StudySphere' remains reserved for bundled editorial content.
const VALID_NOTE_LICENSES = new Set<StudyNote['license']>([
  'CC BY-SA 4.0',
  'CC BY 4.0',
]);

const VALID_PYQ_SESSIONS = new Set<PyqPaper['examSession']>([
  'Odd Semester',
  'Even Semester',
]);

const VALID_PYQ_TYPES = new Set<PyqPaper['paperType']>([
  'End Semester',
  'Carry Over',
  'Original Practice Blueprint',
]);

export function createApiRouter(): express.Router {
  const router = express.Router();

  const searchLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 60,
    message: 'Too many search requests in a short time. Please wait a few seconds and try again.',
  });

  const uploadLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    maxRequests: 10,
    message:
      'Upload rate limit reached to protect free-tier resources. Existing content remains available; please try again in a few minutes.',
  });

  const contactLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    maxRequests: 6,
    message: 'Submission rate limit reached. Please wait a few minutes before sending another message.',
  });

  router.get('/health', (_req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store');
    res.json({ status: 'ok', service: 'StudySphere API', storage: catalogStore.persistence() });
  });

  // Public Academic Catalog (cached cleanly to reduce repeated server reads on free tiers)
  router.get('/catalog', (req: Request, res: Response) => {
    if (req.query.fresh) {
      res.setHeader('Cache-Control', 'no-store');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    }
    res.json(catalogStore.getCatalog());
  });

  // Public Search across subjects, units/topics, notes, pyqs, universities, courses, branches
  router.get('/search', searchLimiter, (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=120');

    const q = cleanText(req.query.q, 120).toLowerCase();
    const rawLimit = Number(req.query.limit);
    const rawPage = Number(req.query.page);
    const limit = Number.isInteger(rawLimit) && rawLimit >= 1 && rawLimit <= 50 ? rawLimit : 24;
    const page = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

    if (!q) {
      res.json({ query: '', results: [], total: 0, page, limit });
      return;
    }

    const catalog = catalogStore.getCatalog();
    const courseById = new Map(catalog.courses.map((c) => [c.id, c]));
    const courseByUniId = new Map(catalog.courses.map((c) => [c.universityId, c]));
    const results: SearchResultItem[] = [];

    for (const uni of catalog.universities) {
      if (
        uni.name.toLowerCase().includes(q) ||
        uni.shortName.toLowerCase().includes(q) ||
        uni.state.toLowerCase().includes(q)
      ) {
        const linkedCourse = courseByUniId.get(uni.id);
        results.push({
          type: 'university',
          id: uni.id,
          title: `${uni.shortName} — ${uni.name}`,
          subtitle: `${uni.city}, ${uni.state}`,
          route: linkedCourse ? `/courses/${encodeURIComponent(linkedCourse.id)}` : '/universities',
          meta: uni.status === 'active' ? 'Active Institution' : 'Planned Architecture',
        });
      }
    }

    for (const course of catalog.courses) {
      if (
        course.name.toLowerCase().includes(q) ||
        course.shortName.toLowerCase().includes(q) ||
        course.degreeLevel.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'course',
          id: course.id,
          title: `${course.shortName} — ${course.name}`,
          subtitle: course.description,
          route: `/courses/${encodeURIComponent(course.id)}`,
          meta: `${course.degreeLevel} · ${course.durationYears} Yr`,
        });
      }
    }

    for (const branch of catalog.branches) {
      if (
        branch.name.toLowerCase().includes(q) ||
        branch.code.toLowerCase().includes(q) ||
        branch.description.toLowerCase().includes(q)
      ) {
        const parentCourse = courseById.get(branch.courseId);
        results.push({
          type: 'branch',
          id: branch.id,
          title: `${branch.code} — ${branch.name}`,
          subtitle: branch.description,
          route: `/subjects?course=${encodeURIComponent(branch.courseId)}&branch=${encodeURIComponent(branch.code)}`,
          meta: parentCourse ? `${parentCourse.shortName} · Branch` : 'Academic Branch',
        });
      }
    }

    for (const subject of catalog.subjects) {
      const parentCourse = courseById.get(subject.courseId);
      const termLabel = parentCourse?.degreeLevel === 'Secondary' ? 'Term' : 'Sem';

      const subjectMatches =
        subject.code.toLowerCase().includes(q) ||
        subject.name.toLowerCase().includes(q) ||
        subject.summary.toLowerCase().includes(q);

      if (subjectMatches) {
        results.push({
          type: 'subject',
          id: subject.id,
          title: `${subject.code} — ${subject.name}`,
          subtitle: subject.summary,
          route: `/subjects/${encodeURIComponent(subject.code)}`,
          meta: `${parentCourse?.shortName ?? 'Course'} · ${termLabel} ${subject.semester} · ${subject.credits} Credits`,
        });
      }

      for (const unit of subject.units) {
        if (unit.title.toLowerCase().includes(q)) {
          results.push({
            type: 'topic',
            id: unit.id,
            title: `Unit ${unit.unitNumber}: ${unit.title}`,
            subtitle: `${subject.code} · ${subject.name}`,
            route: `/subjects/${encodeURIComponent(subject.code)}`,
            meta: `Syllabus Unit · ${termLabel} ${subject.semester}`,
          });
        }
        for (const topic of unit.topics) {
          if (topic.title.toLowerCase().includes(q)) {
            results.push({
              type: 'topic',
              id: topic.id,
              title: topic.title,
              subtitle: `${subject.code} ${subject.name} · Unit ${unit.unitNumber}`,
              route: `/subjects/${encodeURIComponent(subject.code)}`,
              meta: `Syllabus Topic · ${termLabel} ${subject.semester}`,
            });
          }
        }
      }
    }

    for (const note of catalog.notes) {
      if (
        note.title.toLowerCase().includes(q) ||
        note.subjectCode.toLowerCase().includes(q) ||
        note.summary.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'note',
          id: note.id,
          title: note.title,
          subtitle: note.summary,
          route: `/subjects/${encodeURIComponent(note.subjectCode)}?tab=notes`,
          meta: `Study Note · ${note.subjectCode}`,
        });
      }
    }

    for (const pyq of catalog.pyqs) {
      if (
        pyq.title.toLowerCase().includes(q) ||
        pyq.subjectCode.toLowerCase().includes(q) ||
        String(pyq.examYear).includes(q)
      ) {
        results.push({
          type: 'pyq',
          id: pyq.id,
          title: pyq.title,
          subtitle: `${pyq.examSession} ${pyq.examYear} · ${pyq.paperType}`,
          route: `/subjects/${encodeURIComponent(pyq.subjectCode)}?tab=pyq`,
          meta: `PYQ · ${pyq.subjectCode}`,
        });
      }
    }

    const start = (page - 1) * limit;
    res.json({
      query: q,
      total: results.length,
      page,
      limit,
      results: results.slice(start, start + limit),
    });
  });

  // Upload Original Study Note for a Subject (validated, rate-limited, quota-protected)
  router.post('/subjects/:code/notes', uploadLimiter, async (req: Request, res: Response) => {
    const rawCode = cleanText(req.params.code, 20).toUpperCase();
    const subject = catalogStore
      .getCatalog()
      .subjects.find((s) => s.code.toUpperCase() === rawCode);

    if (!subject) {
      res.status(404).json({ error: `Subject ${rawCode} was not found.` });
      return;
    }

    const title = cleanText(req.body?.title, 160);
    const authorName = cleanText(req.body?.authorName, 80);
    const license = cleanText(req.body?.license, 40) as StudyNote['license'];
    const summary = cleanText(req.body?.summary, 400);
    const contentMarkdown = normalizeCompactText(req.body?.contentMarkdown, 25000);
    const unitNumber =
      req.body?.unitNumber !== undefined &&
      req.body?.unitNumber !== '' &&
      req.body?.unitNumber !== null
        ? Number(req.body.unitNumber)
        : undefined;
    const confirmedOriginal = req.body?.confirmedOriginal === true;
    const urlCheck = validateSafeHttpUrl(req.body?.resourceUrl);

    if (!confirmedOriginal) {
      res.status(400).json({
        error: 'Please confirm that this note is original or openly licensed before uploading.',
      });
      return;
    }
    if (title.length < 4) {
      res.status(400).json({ error: 'Please provide a note title (at least 4 characters).' });
      return;
    }
    if (authorName.length < 2) {
      res.status(400).json({ error: 'Please provide an author or contributor name.' });
      return;
    }
    if (!VALID_NOTE_LICENSES.has(license)) {
      res.status(400).json({ error: 'Please select a valid open license.' });
      return;
    }
    if (
      unitNumber !== undefined &&
      (!Number.isInteger(unitNumber) || unitNumber < 1 || unitNumber > 10)
    ) {
      res.status(400).json({ error: 'Unit number must be a valid integer between 1 and 10.' });
      return;
    }
    if (!urlCheck.valid) {
      res.status(400).json({ error: 'External resource URL must start with http:// or https://.' });
      return;
    }
    if (contentMarkdown.length < 20 && !urlCheck.url) {
      res.status(400).json({
        error: 'Provide original study guide text (at least 20 characters) or a verified http(s) URL.',
      });
      return;
    }

    const note: StudyNote = {
      id: `note-${crypto.randomUUID()}`,
      title,
      subjectCode: subject.code,
      unitNumber,
      authorName,
      license,
      summary: summary || `Original unit study guide for ${subject.code} — ${subject.name}.`,
      contentMarkdown,
      resourceUrl: urlCheck.url,
      featured: false,
      publishedAt: new Date().toISOString().slice(0, 10),
    };

    try {
      const saved = await catalogStore.addNote(note);
      res.status(201).json(saved);
    } catch (err) {
      if (err instanceof StorageQuotaError) {
        res.status(507).json({ error: err.message, code: err.code });
        return;
      }
      res.status(500).json({ error: 'Could not save study note. Existing data is intact.' });
    }
  });

  // Upload Original Practice Blueprint / PYQ Entry for a Subject (validated, rate-limited, quota-protected)
  router.post('/subjects/:code/pyqs', uploadLimiter, async (req: Request, res: Response) => {
    const rawCode = cleanText(req.params.code, 20).toUpperCase();
    const subject = catalogStore
      .getCatalog()
      .subjects.find((s) => s.code.toUpperCase() === rawCode);

    if (!subject) {
      res.status(404).json({ error: `Subject ${rawCode} was not found.` });
      return;
    }

    const title = cleanText(req.body?.title, 160);
    const examYear = Number(req.body?.examYear);
    const examSession = cleanText(req.body?.examSession, 30) as PyqPaper['examSession'];
    const paperType = cleanText(req.body?.paperType, 40) as PyqPaper['paperType'];
    const authorNote = cleanText(req.body?.authorNote, 400);
    const questionsText = normalizeCompactText(req.body?.questionsText, 16000);
    const confirmedOriginal = req.body?.confirmedOriginal === true;
    const urlCheck = validateSafeHttpUrl(req.body?.resourceUrl);

    if (!confirmedOriginal) {
      res.status(400).json({
        error: 'Please confirm that this paper or blueprint is copyright-safe before uploading.',
      });
      return;
    }
    if (title.length < 4) {
      res.status(400).json({ error: 'Please provide a paper title (at least 4 characters).' });
      return;
    }
    if (!Number.isInteger(examYear) || examYear < 2015 || examYear > 2030) {
      res.status(400).json({ error: 'Exam year must be between 2015 and 2030.' });
      return;
    }
    if (!VALID_PYQ_SESSIONS.has(examSession) || !VALID_PYQ_TYPES.has(paperType)) {
      res.status(400).json({ error: 'Please select a valid exam session and paper type.' });
      return;
    }
    if (!urlCheck.valid) {
      res.status(400).json({ error: 'External resource URL must start with http:// or https://.' });
      return;
    }
    if (paperType !== 'Original Practice Blueprint' && questionsText.trim()) {
      res.status(400).json({
        error: 'Official End Semester / Carry Over papers may be linked to their official source, but their question text must not be copied here. Enter questions only for an original practice blueprint.',
      });
      return;
    }
    if (questionsText.length < 15 && !urlCheck.url) {
      res.status(400).json({
        error: 'Enter original practice questions or provide a verified http(s) paper URL.',
      });
      return;
    }

    const parsedQuestions = questionsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 30)
      .map((line, idx) => ({
        number: `Q${idx + 1}`,
        text: line.slice(0, 500),
        marks: 7,
      }));

    const sections: PyqSection[] | undefined =
      parsedQuestions.length > 0
        ? [
            {
              name: 'Uploaded Questions',
              instruction: `Contributed practice / exam questions for ${subject.code}.`,
              questions: parsedQuestions,
            },
          ]
        : undefined;

    const pyq: PyqPaper = {
      id: `pyq-${crypto.randomUUID()}`,
      title,
      subjectCode: subject.code,
      examYear,
      examSession,
      paperType,
      authorNote: authorNote || `Contributed exam paper blueprint for ${subject.code}.`,
      durationMinutes: 180,
      maxMarks: 70,
      sections,
      resourceUrl: urlCheck.url,
      featured: false,
      publishedAt: new Date().toISOString().slice(0, 10),
    };

    try {
      const saved = await catalogStore.addPyq(pyq);
      res.status(201).json(saved);
    } catch (err) {
      if (err instanceof StorageQuotaError) {
        res.status(507).json({ error: err.message, code: err.code });
        return;
      }
      res.status(500).json({ error: 'Could not save PYQ entry. Existing data is intact.' });
    }
  });

  // Public Contact / Contribution / Copyright Notice submission (rate-limited, quota-protected)
  router.post('/contact', contactLimiter, async (req: Request, res: Response) => {
    const name = cleanText(req.body?.name, 100);
    const email = cleanText(req.body?.email, 160);
    const category = cleanText(req.body?.category, 60) as ContactSubmission['category'];
    const subjectContext = cleanText(req.body?.subjectContext, 120);
    const message = normalizeCompactText(req.body?.message, 2000);

    if (name.length < 2) {
      res.status(400).json({ error: 'Please provide your name (at least 2 characters).' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }
    if (!VALID_CONTACT_CATEGORIES.has(category)) {
      res.status(400).json({ error: 'Please select a valid inquiry category.' });
      return;
    }
    if (message.length < 10) {
      res.status(400).json({ error: 'Please enter a message of at least 10 characters.' });
      return;
    }

    const submission: ContactSubmission = {
      id: `msg-${crypto.randomUUID()}`,
      name,
      email,
      category,
      subjectContext: subjectContext || undefined,
      message,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    try {
      await catalogStore.addContactSubmission(submission);
      res.status(201).json({
        ok: true,
        id: submission.id,
        message: 'Your message has been recorded for review by the StudySphere editorial team.',
      });
    } catch (err) {
      if (err instanceof StorageQuotaError) {
        res.status(507).json({ error: err.message, code: err.code });
        return;
      }
      res.status(500).json({ error: 'Could not record submission. Please try again later.' });
    }
  });

  return router;
}
