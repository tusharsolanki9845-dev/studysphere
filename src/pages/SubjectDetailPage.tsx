import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BellOff,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  FileText,
  Layers,
  ListChecks,
  Printer,
  Search,
  Upload,
  X,
} from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { PyqPaperViewer } from '../components/PyqPaperViewer';
import { StudyNoteContent, downloadTextFile } from '../components/StudyNoteContent';
import { api } from '../lib/api';
import { useBookmarks } from '../lib/studyStore';
import { useCatalog } from '../lib/catalogContext';
import { useFocusMode } from '../lib/focusContext';
import { useHierarchy } from '../lib/hierarchyContext';
import { Link, useRouter } from '../lib/router';
import type { PyqPaper, StudyNote } from '../shared/types';

type SubjectTab = 'syllabus' | 'notes' | 'pyq' | 'resources';

interface SubjectDetailPageProps {
  subjectCode: string;
}

const INPUT_CLASS =
  'w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none';

export function SubjectDetailPage({ subjectCode }: SubjectDetailPageProps) {
  const { catalog, refresh } = useCatalog();
  const bookmarks = useBookmarks();
  const { updateTrail } = useHierarchy();
  const { dndEnabled, enableDnd } = useFocusMode();
  const { getParam, search } = useRouter();

  const parseTab = (raw: string | null): SubjectTab => {
    if (raw === 'notes' || raw === 'pyq' || raw === 'syllabus' || raw === 'resources') return raw;
    return 'syllabus';
  };

  const [activeTab, setActiveTab] = useState<SubjectTab>(() => parseTab(getParam('tab')));

  // Syllabus tab state
  const [selectedUnitNum, setSelectedUnitNum] = useState<number | 'ALL'>('ALL');
  const [syllabusQuery, setSyllabusQuery] = useState<string>('');

  // Notes tab state
  const [notesUnitFilter, setNotesUnitFilter] = useState<string>('ALL');
  const [notesQuery, setNotesQuery] = useState<string>('');
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [showNoteUpload, setShowNoteUpload] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteUnit, setNoteUnit] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('');
  const [noteLicense, setNoteLicense] = useState<StudyNote['license']>('CC BY-SA 4.0');
  const [noteSummary, setNoteSummary] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteUrl, setNoteUrl] = useState('');
  const [noteOriginalCheck, setNoteOriginalCheck] = useState(false);
  const [noteSubmitting, setNoteSubmitting] = useState(false);
  const [noteFeedback, setNoteFeedback] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null
  );

  // PYQ tab state
  const [pyqSessionFilter, setPyqSessionFilter] = useState<string>('ALL');
  const [showPyqUpload, setShowPyqUpload] = useState<boolean>(false);
  const [pyqTitle, setPyqTitle] = useState('');
  const [pyqYear, setPyqYear] = useState<number>(2025);
  const [pyqSession, setPyqSession] = useState<PyqPaper['examSession']>('Odd Semester');
  const [pyqType, setPyqType] = useState<PyqPaper['paperType']>('Original Practice Blueprint');
  const [pyqAuthorNote, setPyqAuthorNote] = useState('');
  const [pyqQuestionsText, setPyqQuestionsText] = useState('');
  const [pyqUrl, setPyqUrl] = useState('');
  const [pyqOriginalCheck, setPyqOriginalCheck] = useState(false);
  const [pyqSubmitting, setPyqSubmitting] = useState(false);
  const [pyqFeedback, setPyqFeedback] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const decodedCode = decodeURIComponent(subjectCode).toUpperCase();
  const subject = catalog.subjects.find((s) => s.code.toUpperCase() === decodedCode);

  useEffect(() => {
    const paramTab = getParam('tab');
    if (paramTab) {
      setActiveTab(parseTab(paramTab));
    }
  }, [search, getParam]);

  useEffect(() => {
    setSelectedUnitNum('ALL');
    setSyllabusQuery('');
    setNotesUnitFilter('ALL');
    setNotesQuery('');
    setExpandedNoteId(null);
    setNoteFeedback(null);
    setPyqFeedback(null);
  }, [decodedCode]);

  useEffect(() => {
    if (subject) {
      updateTrail({
        universityId: subject.universityId,
        courseId: subject.courseId,
        semester: subject.semester,
        subjectCode: subject.code,
      });
    }
  }, [subject, updateTrail]);

  const subjectNotes = useMemo(
    () =>
      subject
        ? catalog.notes.filter(
            (n) => n.subjectCode.toUpperCase() === subject.code.toUpperCase()
          )
        : [],
    [catalog.notes, subject]
  );

  const subjectPyqs = useMemo(
    () =>
      subject
        ? catalog.pyqs.filter(
            (p) => p.subjectCode.toUpperCase() === subject.code.toUpperCase()
          )
        : [],
    [catalog.pyqs, subject]
  );

  const filteredUnits = useMemo(() => {
    if (!subject) return [];
    const q = syllabusQuery.trim().toLowerCase();
    return subject.units.filter((u) => {
      if (selectedUnitNum !== 'ALL' && u.unitNumber !== selectedUnitNum) return false;
      if (!q) return true;
      return (
        u.title.toLowerCase().includes(q) ||
        u.topics.some((t) => t.title.toLowerCase().includes(q))
      );
    });
  }, [subject, selectedUnitNum, syllabusQuery]);

  const filteredNotes = useMemo(() => {
    const q = notesQuery.trim().toLowerCase();
    return subjectNotes.filter((n) => {
      if (notesUnitFilter !== 'ALL' && String(n.unitNumber ?? '') !== notesUnitFilter) {
        return false;
      }
      if (!q) return true;
      return (
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.contentMarkdown.toLowerCase().includes(q)
      );
    });
  }, [subjectNotes, notesUnitFilter, notesQuery]);

  const filteredPyqs = useMemo(() => {
    return subjectPyqs.filter((p) => {
      if (pyqSessionFilter !== 'ALL' && p.examSession !== pyqSessionFilter) return false;
      return true;
    });
  }, [subjectPyqs, pyqSessionFilter]);

  if (!subject) {
    return (
      <div>
        <PageHeader
          hierarchy={{
            universityId: 'uni-aktu',
            courseId: 'course-aktu-btech',
            subjectCode: decodedCode,
          }}
          title={`Subject ${decodedCode} Not Found`}
          description="This subject code is not currently indexed in StudySphere."
        />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <EmptyState
            title="Subject not yet indexed"
            description="Check the full Subjects Directory or request this subject structure through our editorial contact form."
            primaryAction={{ label: 'Browse All Subjects', to: '/subjects' }}
            secondaryAction={{
              label: 'Request Subject',
              to: `/contact?category=Resource%20Request&subject=${encodeURIComponent(decodedCode)}`,
            }}
          />
        </div>
      </div>
    );
  }

  const branchObjects = catalog.branches.filter((b) => subject.branchIds.includes(b.id));
  const totalTopics = subject.units.reduce((sum, u) => sum + u.topics.length, 0);

  const handleImportTextFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'note' | 'pyq'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 200 * 1024) {
      const errMsg = 'Text/Markdown files must be 200 KB or smaller.';
      if (target === 'note') setNoteFeedback({ type: 'err', text: errMsg });
      else setPyqFeedback({ type: 'err', text: errMsg });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : '';
      if (target === 'note') {
        setNoteContent(text.slice(0, 25000));
        if (!noteTitle) {
          setNoteTitle(file.name.replace(/\.(md|txt)$/i, '').replace(/[-_]+/g, ' '));
        }
      } else {
        setPyqQuestionsText(text.slice(0, 16000));
        if (!pyqTitle) {
          setPyqTitle(file.name.replace(/\.(md|txt)$/i, '').replace(/[-_]+/g, ' '));
        }
      }
    };
    reader.readAsText(file);
  };

  const handleNoteUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNoteFeedback(null);
    setNoteSubmitting(true);
    try {
      const created = await api.uploadSubjectNote(subject.code, {
        title: noteTitle,
        unitNumber: noteUnit ? Number(noteUnit) : undefined,
        authorName: noteAuthor,
        license: noteLicense,
        summary: noteSummary,
        contentMarkdown: noteContent,
        resourceUrl: noteUrl.trim() || undefined,
        confirmedOriginal: noteOriginalCheck,
      });
      await refresh();
      setExpandedNoteId(created.id);
      setNoteTitle('');
      setNoteUnit('');
      setNoteAuthor('');
      setNoteSummary('');
      setNoteContent('');
      setNoteUrl('');
      setNoteOriginalCheck(false);
      setShowNoteUpload(false);
      setNoteFeedback({
        type: 'ok',
        text: `Uploaded "${created.title}" to ${subject.code} Notes.`,
      });
    } catch (err) {
      setNoteFeedback({
        type: 'err',
        text: err instanceof Error ? err.message : 'Unable to upload note.',
      });
    } finally {
      setNoteSubmitting(false);
    }
  };

  const handlePyqUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPyqFeedback(null);
    setPyqSubmitting(true);
    try {
      const created = await api.uploadSubjectPyq(subject.code, {
        title: pyqTitle,
        examYear: Number(pyqYear),
        examSession: pyqSession,
        paperType: pyqType,
        authorNote: pyqAuthorNote,
        questionsText: pyqQuestionsText,
        resourceUrl: pyqUrl.trim() || undefined,
        confirmedOriginal: pyqOriginalCheck,
      });
      await refresh();
      setPyqTitle('');
      setPyqAuthorNote('');
      setPyqQuestionsText('');
      setPyqUrl('');
      setPyqOriginalCheck(false);
      setShowPyqUpload(false);
      setPyqFeedback({
        type: 'ok',
        text: `Uploaded "${created.title}" to ${subject.code} PYQs.`,
      });
    } catch (err) {
      setPyqFeedback({
        type: 'err',
        text: err instanceof Error ? err.message : 'Unable to upload paper.',
      });
    } finally {
      setPyqSubmitting(false);
    }
  };

  const tabSectionName: Record<SubjectTab, string> = {
    syllabus: 'Syllabus',
    notes: 'Notes',
    pyq: 'PYQs',
    resources: 'Quick Revision & Open Links',
  };

  const handleDownloadSubjectPack = () => {
    const lines: string[] = [
      `# ${subject.code} — ${subject.name}`,
      '',
      `> ${subject.summary}`,
      `> Credits: ${subject.credits} · Category: ${subject.category} · Exported from StudySphere`,
      '',
      '## Complete Unit-Wise Syllabus',
      '',
      ...subject.units.flatMap((u) => [
        `### Unit ${u.unitNumber}: ${u.title}`,
        ...u.topics.map((t) => `- ${t.title}`),
        '',
      ]),
    ];

    if (subjectNotes.length > 0) {
      lines.push('---', '', '## Study Notes', '');
      for (const note of subjectNotes) {
        lines.push(`### ${note.title}`, `*Author: ${note.authorName} · License: ${note.license}*`, '', note.contentMarkdown || note.summary, '');
      }
    }

    if (subjectPyqs.length > 0) {
      lines.push('---', '', '## Previous-Year / Practice Exam Blueprints', '');
      for (const paper of subjectPyqs) {
        lines.push(`### ${paper.title} (${paper.examSession} ${paper.examYear})`, '');
        if (paper.sections) {
          for (const sec of paper.sections) {
            lines.push(`#### ${sec.name}`, `_${sec.instruction}_`, '');
            for (const q of sec.questions) {
              lines.push(`- **${q.number}** (${q.marks} marks): ${q.text}`);
            }
            lines.push('');
          }
        }
      }
    }

    downloadTextFile(`${subject.code}-StudySphere-Complete-Pack.md`, lines.join('\n'));
  };

  return (
    <div>
      <PageHeader
        hierarchy={{
          universityId: subject.universityId,
          courseId: subject.courseId,
          semester: subject.semester,
          subjectCode: subject.code,
          sectionLabel: tabSectionName[activeTab],
        }}
        title={`${subject.code} — ${subject.name}`}
        description={subject.summary}
        actions={
          <div className="no-print flex flex-wrap items-center gap-2.5">
            {!dndEnabled && (
              <button
                type="button"
                onClick={() => enableDnd(`${subject.code} — ${subject.name}`)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-[#0F172A] dark:text-slate-100 hover:border-[#1D4ED8] dark:hover:border-blue-400 transition-colors whitespace-nowrap"
              >
                <BellOff className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400" />
                <span>Focus Mode</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => bookmarks.toggle(subject.code)}
              aria-pressed={bookmarks.has(subject.code)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-[#0F172A] dark:text-slate-100 hover:border-[#1D4ED8] dark:hover:border-blue-400 transition-colors whitespace-nowrap"
            >
              {bookmarks.has(subject.code) ? (
                <BookmarkCheck className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400" />
              ) : (
                <Bookmark className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400" />
              )}
              <span>{bookmarks.has(subject.code) ? 'Saved' : 'Save'}</span>
            </button>
            <Link
              to={`/tools?tab=checklist&subject=${encodeURIComponent(subject.code)}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-sm font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors whitespace-nowrap"
            >
              <ListChecks className="w-4 h-4" />
              <span>Track Revision</span>
            </Link>
            <button
              type="button"
              onClick={handleDownloadSubjectPack}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-[#1D4ED8]/35 dark:border-blue-500/40 bg-[#EFF6FF] dark:bg-blue-950/50 text-sm font-medium text-[#1D4ED8] dark:text-blue-300 hover:bg-blue-100/80 dark:hover:bg-blue-900/60 transition-colors whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Download Pack</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        }
      />

      <div
        className={`${
          dndEnabled ? 'max-w-[960px]' : 'max-w-[1200px]'
        } mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8`}
      >
        {/* Clean Unboxed Academic Specification Strip */}
        {!dndEnabled && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-5 sm:px-6 py-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-xs">
            <div>
              <p className="text-slate-500 dark:text-slate-400">Semester</p>
              <p className="mt-0.5 text-sm font-semibold font-mono tabular-nums text-[#0F172A] dark:text-slate-100">
                Semester {subject.semester}
              </p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">Credits</p>
              <p className="mt-0.5 text-sm font-semibold font-mono tabular-nums text-[#0F172A] dark:text-slate-100">
                {subject.credits} CBCS
              </p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">Category</p>
              <p className="mt-0.5 text-sm font-semibold text-[#0F172A] dark:text-slate-100">
                {subject.category}
              </p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">Syllabus Scope</p>
              <p className="mt-0.5 text-sm font-semibold font-mono tabular-nums text-[#0F172A] dark:text-slate-100">
                {subject.units.length} Units · {totalTopics} Topics
              </p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">Resources</p>
              <p className="mt-0.5 text-sm font-semibold font-mono tabular-nums text-[#1D4ED8] dark:text-blue-400">
                {subjectNotes.length} Notes · {subjectPyqs.length} Papers
              </p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">Applicable Branches</p>
              <p className="mt-0.5 text-sm font-semibold font-mono text-[#0F172A] dark:text-slate-100 truncate">
                {branchObjects.map((b) => b.code).join(', ')}
              </p>
            </div>
          </div>
        )}

        {/* Distinct Tab Bar: Syllabus | Notes | PYQs */}
        <div className="no-print border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Subject resource sections"
            className="flex items-center gap-6 overflow-x-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'syllabus'}
              onClick={() => setActiveTab('syllabus')}
              className={`pb-3.5 inline-flex items-center gap-2 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'syllabus'
                  ? 'border-[#1D4ED8] dark:border-blue-400 text-[#0F172A] dark:text-white'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>Syllabus</span>
              <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                ({subject.units.length})
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'notes'}
              onClick={() => setActiveTab('notes')}
              className={`pb-3.5 inline-flex items-center gap-2 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'notes'
                  ? 'border-[#1D4ED8] dark:border-blue-400 text-[#0F172A] dark:text-white'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Original Notes</span>
              <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                ({subjectNotes.length})
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'pyq'}
              onClick={() => setActiveTab('pyq')}
              className={`pb-3.5 inline-flex items-center gap-2 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'pyq'
                  ? 'border-[#1D4ED8] dark:border-blue-400 text-[#0F172A] dark:text-white'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>PYQs & Practice Papers</span>
              <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                ({subjectPyqs.length})
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'resources'}
              onClick={() => setActiveTab('resources')}
              className={`pb-3.5 inline-flex items-center gap-2 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'resources'
                  ? 'border-[#1D4ED8] dark:border-blue-400 text-[#0F172A] dark:text-white'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-100'
              }`}
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span>Quick Revision & Open Links</span>
            </button>
          </div>
        </div>

        {/* ==================== TAB 1: SYLLABUS ==================== */}
        {activeTab === 'syllabus' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <aside className="no-print lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
              <div>
                <label
                  htmlFor="sub-syl-search"
                  className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5"
                >
                  Search Topics in {subject.code}
                </label>
                <div className="relative">
                  <Search
                    className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="sub-syl-search"
                    type="search"
                    value={syllabusQuery}
                    onChange={(e) => setSyllabusQuery(e.target.value)}
                    placeholder="Filter unit or topic..."
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedUnitNum('ALL')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedUnitNum === 'ALL'
                      ? 'bg-[#0F172A] dark:bg-blue-600 text-white'
                      : 'bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>All Syllabus Units</span>
                  <span className="font-mono tabular-nums">{subject.units.length}</span>
                </button>

                {subject.units.map((unit) => {
                  const active = selectedUnitNum === unit.unitNumber;
                  const unitNoteCount = subjectNotes.filter(
                    (n) => n.unitNumber === unit.unitNumber
                  ).length;
                  return (
                    <button
                      key={unit.id}
                      type="button"
                      onClick={() => setSelectedUnitNum(unit.unitNumber)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs transition-colors ${
                        active
                          ? 'bg-[#EFF6FF] dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-300 font-semibold'
                          : 'bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono">Unit {unit.unitNumber}</span>
                        {unitNoteCount > 0 && (
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            {unitNoteCount} note{unitNoteCount === 1 ? '' : 's'}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate">{unit.title}</p>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="lg:col-span-8 space-y-4">
              {filteredUnits.length === 0 ? (
                <EmptyState
                  title="No matching syllabus topics"
                  description={`No unit or topic in ${subject.code} matched "${syllabusQuery}".`}
                />
              ) : (
                filteredUnits.map((unit) => {
                  const unitNotes = subjectNotes.filter((n) => n.unitNumber === unit.unitNumber);
                  return (
                    <section
                      key={unit.id}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-blue-400">
                            Unit {unit.unitNumber} · {unit.topics.length} Topics
                          </p>
                          <h2 className="mt-1 text-lg font-bold text-[#0F172A] dark:text-slate-50">
                            {unit.title}
                          </h2>
                        </div>
                        {unitNotes.length > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setNotesUnitFilter(String(unit.unitNumber));
                              setExpandedNoteId(unitNotes[0].id);
                              setActiveTab('notes');
                            }}
                            className="no-print inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:text-[#1E40AF] dark:hover:text-blue-300"
                          >
                            <span>Read Unit {unit.unitNumber} Notes</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <ul className="divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800 pt-2">
                        {unit.topics.map((topic, idx) => (
                          <li
                            key={topic.id}
                            className="py-2.5 flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200"
                          >
                            <span className="font-mono text-xs text-slate-400 dark:text-slate-500 mt-0.5 tabular-nums shrink-0">
                              {unit.unitNumber}.{idx + 1}
                            </span>
                            <span className="leading-relaxed">{topic.title}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })
              )}

              {!dndEnabled && (
                <div className="no-print pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    Cross-check revisions in the{' '}
                    <Link
                      to={`/tools?tab=checklist&subject=${encodeURIComponent(subject.code)}`}
                      className="text-[#1D4ED8] dark:text-blue-400 font-medium hover:underline"
                    >
                      Unit Revision Checklist
                    </Link>
                  </span>
                  <Link
                    to={`/contact?category=Syllabus%20Correction&subject=${encodeURIComponent(subject.code)}`}
                    className="hover:text-[#0F172A] dark:hover:text-white"
                  >
                    Report a syllabus correction
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 2: NOTES ==================== */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="no-print bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search
                    className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={notesQuery}
                    onChange={(e) => setNotesQuery(e.target.value)}
                    placeholder={`Search notes in ${subject.code}...`}
                    aria-label="Search subject notes"
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
                  />
                </div>

                <select
                  value={notesUnitFilter}
                  onChange={(e) => setNotesUnitFilter(e.target.value)}
                  aria-label="Filter notes by unit"
                  className="h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
                >
                  <option value="ALL">All Units ({subjectNotes.length})</option>
                  {subject.units.map((u) => (
                    <option key={u.id} value={String(u.unitNumber)}>
                      Unit {u.unitNumber}: {u.title}
                    </option>
                  ))}
                </select>
              </div>

              {!dndEnabled && (
                <button
                  type="button"
                  onClick={() => {
                    setShowNoteUpload((prev) => !prev);
                    setNoteFeedback(null);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#1D4ED8] dark:bg-blue-600 text-white text-xs sm:text-sm font-medium hover:bg-[#1E40AF] dark:hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
                >
                  {showNoteUpload ? <X className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                  <span>{showNoteUpload ? 'Close Upload Form' : 'Upload Original Note'}</span>
                </button>
              )}
            </div>

            {noteFeedback && (
              <div
                role={noteFeedback.type === 'err' ? 'alert' : 'status'}
                className={`px-4 py-3 rounded-lg border text-sm ${
                  noteFeedback.type === 'ok'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                }`}
              >
                {noteFeedback.text}
              </div>
            )}

            {showNoteUpload && !dndEnabled && (
              <form
                onSubmit={handleNoteUploadSubmit}
                className="no-print bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100">
                      Upload Original Study Note for {subject.code}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Write structured study notes directly or import a `.md` / `.txt` file. Only
                      original or openly licensed educational material is permitted.
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer whitespace-nowrap">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import .md / .txt</span>
                    <input
                      type="file"
                      accept=".md,.txt,text/plain,text/markdown"
                      onChange={(e) => handleImportTextFile(e, 'note')}
                      className="sr-only"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6">
                    <label
                      htmlFor="up-note-title"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Note Title
                    </label>
                    <input
                      id="up-note-title"
                      type="text"
                      required
                      minLength={4}
                      maxLength={160}
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                      placeholder="e.g. Unit 2 Quick Formula & Concept Sheet"
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label
                      htmlFor="up-note-unit"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Unit (Optional)
                    </label>
                    <select
                      id="up-note-unit"
                      value={noteUnit}
                      onChange={(e) => setNoteUnit(e.target.value)}
                      className={INPUT_CLASS}
                    >
                      <option value="">General / Full Subject</option>
                      {subject.units.map((u) => (
                        <option key={u.id} value={String(u.unitNumber)}>
                          Unit {u.unitNumber}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label
                      htmlFor="up-note-lic"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      License
                    </label>
                    <select
                      id="up-note-lic"
                      value={noteLicense}
                      onChange={(e) => setNoteLicense(e.target.value as StudyNote['license'])}
                      className={INPUT_CLASS}
                    >
                      <option value="CC BY-SA 4.0">Creative Commons Attribution-ShareAlike 4.0</option>
                      <option value="CC BY 4.0">Creative Commons Attribution 4.0</option>
                    </select>
                  </div>
                  <p className="md:col-span-3 text-xs text-slate-600 dark:text-slate-400">
                    Choose a recognised public licence only if you own the material or have permission to license it.{' '}
                    <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline">CC BY-SA 4.0</a>{' '}or{' '}
                    <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="underline">CC BY 4.0</a> allows reuse under its terms.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="up-note-author"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Contributor Name
                    </label>
                    <input
                      id="up-note-author"
                      type="text"
                      required
                      minLength={2}
                      maxLength={80}
                      value={noteAuthor}
                      onChange={(e) => setNoteAuthor(e.target.value)}
                      placeholder="Your name or faculty/department credit"
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="up-note-url"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Open Resource Link (Optional https://)
                    </label>
                    <input
                      id="up-note-url"
                      type="url"
                      value={noteUrl}
                      onChange={(e) => setNoteUrl(e.target.value)}
                      placeholder="https://..."
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="up-note-summary"
                    className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Brief Summary
                  </label>
                  <input
                    id="up-note-summary"
                    type="text"
                    maxLength={400}
                    value={noteSummary}
                    onChange={(e) => setNoteSummary(e.target.value)}
                    placeholder="Key definitions, theorems, or algorithms covered in this guide..."
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label
                    htmlFor="up-note-body"
                    className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Study Note Content (Supports ## Headings, - Bullets, 1. Numbered Steps)
                  </label>
                  <textarea
                    id="up-note-body"
                    rows={6}
                    maxLength={25000}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="## 1. Core Concept&#10;- Key formula or rule..."
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm font-mono text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
                  />
                </div>

                <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={noteOriginalCheck}
                    onChange={(e) => setNoteOriginalCheck(e.target.checked)}
                    className="mt-0.5 accent-[#1D4ED8]"
                  />
                  <span>
                    I confirm that I created this material or have documented permission to share it, that it contains no unauthorised textbook or exam-paper extracts, and that I have authority to publish it under the selected Creative Commons licence.
                  </span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={noteSubmitting}
                    className="px-4 py-2.5 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-sm font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 disabled:opacity-50"
                  >
                    {noteSubmitting ? 'Uploading...' : 'Publish Note to Subject'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNoteUpload(false)}
                    className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {filteredNotes.length === 0 ? (
              <EmptyState
                contextLabel={`${subject.code} · Original Notes`}
                title={
                  subjectNotes.length === 0
                    ? `No original notes uploaded for ${subject.code} yet`
                    : 'No notes match your current unit or keyword filter'
                }
                description="Use the Upload Original Note button above to add an original Markdown or text study guide for this subject, or switch units."
                primaryAction={{
                  label: 'Open Unit Revision Checklist',
                  to: `/tools?tab=checklist&subject=${encodeURIComponent(subject.code)}`,
                }}
              />
            ) : (
              <div className="space-y-4">
                {filteredNotes.map((note, idx) => {
                  const isOpen = expandedNoteId === note.id || (expandedNoteId === null && idx === 0);
                  return (
                    <article
                      key={note.id}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-medium text-[#1D4ED8] dark:text-blue-400">
                              {note.license}
                            </span>
                            {note.unitNumber && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">
                                  Unit {note.unitNumber}
                                </span>
                              </>
                            )}
                            <span aria-hidden="true">·</span>
                            <span>By {note.authorName}</span>
                            <span aria-hidden="true">·</span>
                            <time dateTime={note.publishedAt} className="font-mono">
                              {note.publishedAt}
                            </time>
                          </div>
                          <h3 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
                            {note.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {note.summary}
                          </p>
                        </div>

                        <div className="no-print flex flex-wrap items-center gap-2 shrink-0">
                          {note.contentMarkdown && (
                            <button
                              type="button"
                              onClick={() => setExpandedNoteId(isOpen ? '__none__' : note.id)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-xs font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors whitespace-nowrap"
                            >
                              <span>{isOpen ? 'Collapse Guide' : 'Read Study Guide'}</span>
                              {isOpen ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}
                          {note.contentMarkdown && (
                            <button
                              type="button"
                              onClick={() =>
                                downloadTextFile(
                                  `${note.subjectCode.toLowerCase()}-unit-${note.unitNumber ?? 'guide'}.md`,
                                  `# ${note.title}\n\n${note.subjectCode} · ${note.license} · By ${note.authorName}\n\n${note.contentMarkdown}\n`,
                                  'text/markdown;charset=utf-8'
                                )
                              }
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download .md</span>
                            </button>
                          )}
                          {note.resourceUrl && (
                            <a
                              href={note.resourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-[#1D4ED8] dark:text-blue-400 hover:border-[#1D4ED8] dark:hover:border-blue-400 whitespace-nowrap"
                            >
                              <span>External Link</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {isOpen && note.contentMarkdown && (
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-950/70 -mx-6 -mb-6 px-6 py-5 rounded-b-xl">
                          <StudyNoteContent markdown={note.contentMarkdown} />
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 3: PYQs & PRACTICE PAPERS ==================== */}
        {activeTab === 'pyq' && (
          <div className="space-y-6">
            <div className="no-print bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {(['ALL', 'Odd Semester', 'Even Semester'] as const).map((session) => {
                  const active = pyqSessionFilter === session;
                  return (
                    <button
                      key={session}
                      type="button"
                      onClick={() => setPyqSessionFilter(session)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                        active
                          ? 'bg-[#0F172A] dark:bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                      }`}
                    >
                      {session === 'ALL' ? `All Sessions (${subjectPyqs.length})` : session}
                    </button>
                  );
                })}
              </div>

              {!dndEnabled && (
                <button
                  type="button"
                  onClick={() => {
                    setShowPyqUpload((prev) => !prev);
                    setPyqFeedback(null);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#1D4ED8] dark:bg-blue-600 text-white text-xs sm:text-sm font-medium hover:bg-[#1E40AF] dark:hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
                >
                  {showPyqUpload ? <X className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                  <span>{showPyqUpload ? 'Close Upload Form' : 'Upload Practice Paper / PYQ'}</span>
                </button>
              )}
            </div>

            {pyqFeedback && (
              <div
                role={pyqFeedback.type === 'err' ? 'alert' : 'status'}
                className={`px-4 py-3 rounded-lg border text-sm ${
                  pyqFeedback.type === 'ok'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                }`}
              >
                {pyqFeedback.text}
              </div>
            )}

            {showPyqUpload && !dndEnabled && (
              <form
                onSubmit={handlePyqUploadSubmit}
                className="no-print bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100">
                      Upload Practice Blueprint or Exam Paper for {subject.code}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Enter original practice questions only; for official End Semester / Carry Over papers, add an official link instead of copying the questions.
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer whitespace-nowrap">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import .txt / .md</span>
                    <input
                      type="file"
                      accept=".md,.txt,text/plain,text/markdown"
                      onChange={(e) => handleImportTextFile(e, 'pyq')}
                      className="sr-only"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6">
                    <label
                      htmlFor="up-pyq-title"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Paper Title
                    </label>
                    <input
                      id="up-pyq-title"
                      type="text"
                      required
                      minLength={4}
                      maxLength={160}
                      value={pyqTitle}
                      onChange={(e) => setPyqTitle(e.target.value)}
                      placeholder={`e.g. ${subject.code} Practice Question Set 2025`}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="up-pyq-year"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Exam Year
                    </label>
                    <input
                      id="up-pyq-year"
                      type="number"
                      min={2015}
                      max={2030}
                      value={pyqYear}
                      onChange={(e) => setPyqYear(Number(e.target.value))}
                      className={`${INPUT_CLASS} font-mono tabular-nums`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="up-pyq-sess"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Session
                    </label>
                    <select
                      id="up-pyq-sess"
                      value={pyqSession}
                      onChange={(e) => setPyqSession(e.target.value as PyqPaper['examSession'])}
                      className={INPUT_CLASS}
                    >
                      <option value="Odd Semester">Odd Semester</option>
                      <option value="Even Semester">Even Semester</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="up-pyq-type"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Type
                    </label>
                    <select
                      id="up-pyq-type"
                      value={pyqType}
                      onChange={(e) => setPyqType(e.target.value as PyqPaper['paperType'])}
                      className={INPUT_CLASS}
                    >
                      <option value="Original Practice Blueprint">Practice Blueprint</option>
                      <option value="End Semester">End Semester</option>
                      <option value="Carry Over">Carry Over</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="up-pyq-note"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Editorial / Syllabus Note
                    </label>
                    <input
                      id="up-pyq-note"
                      type="text"
                      maxLength={400}
                      value={pyqAuthorNote}
                      onChange={(e) => setPyqAuthorNote(e.target.value)}
                      placeholder="e.g. Covers Units 1–5 with focus on numerical problems"
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="up-pyq-url"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Verified Resource Link (Optional https://)
                    </label>
                    <input
                      id="up-pyq-url"
                      type="url"
                      value={pyqUrl}
                      onChange={(e) => setPyqUrl(e.target.value)}
                      placeholder="https://..."
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="up-pyq-qs"
                    className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Questions (One question per line)
                  </label>
                  <textarea
                    id="up-pyq-qs"
                    rows={5}
                    maxLength={16000}
                    value={pyqQuestionsText}
                    onChange={(e) => setPyqQuestionsText(e.target.value)}
                    placeholder="Compare time complexities of Merge Sort and Quick Sort.&#10;Derive the row-major address formula for a 2D array..."
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
                  />
                </div>

                <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={pyqOriginalCheck}
                    onChange={(e) => setPyqOriginalCheck(e.target.checked)}
                    className="mt-0.5 accent-[#1D4ED8]"
                  />
                  <span>
                    I confirm that any question text entered is my own original practice material or explicitly licensed for redistribution. For official End Semester / Carry Over papers I am providing a source link only, not copying the paper or its questions.
                  </span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={pyqSubmitting}
                    className="px-4 py-2.5 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-sm font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 disabled:opacity-50"
                  >
                    {pyqSubmitting ? 'Uploading...' : 'Publish Paper to Subject'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPyqUpload(false)}
                    className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {filteredPyqs.length === 0 ? (
              <EmptyState
                contextLabel={`${subject.code} · PYQs & Practice Blueprints`}
                title={
                  subjectPyqs.length === 0
                    ? `No exam papers uploaded for ${subject.code} yet`
                    : 'No papers match the selected exam session'
                }
                description="Use the Upload Practice Paper / PYQ button above to contribute a copyright-safe question set for this subject, or view the standard AKTU 70-mark exam structure."
                primaryAction={{ label: 'View All PYQ Archives', to: '/pyq' }}
              />
            ) : (
              <div className="space-y-4">
                {filteredPyqs.map((pyq, idx) => (
                  <PyqPaperViewer key={pyq.id} paper={pyq} defaultExpanded={idx === 0} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 4: QUICK REVISION & OPEN LINKS ==================== */}
        {activeTab === 'resources' && (() => {
          const uniObj = catalog.universities.find((u) => u.id === subject.universityId);
          const encodedSubjectName = encodeURIComponent(subject.name);
          const openLinks = [
            {
              title: 'NPTEL Free Video Lectures',
              org: 'IIT / IISc Open Courseware',
              desc: `Search free peer-reviewed engineering & science lectures for ${subject.name}.`,
              url: `https://nptel.ac.in/courses?search=${encodedSubjectName}`,
            },
            {
              title: 'SWAYAM National MOOCs',
              org: 'Ministry of Education, India',
              desc: `Browse official free credit-aligned online courses covering ${subject.name}.`,
              url: `https://swayam.gov.in/explorer?searchText=${encodedSubjectName}`,
            },
            {
              title: 'NCERT Official Digital Textbooks',
              org: 'NCERT National Curriculum',
              desc: 'Official free school & foundational STEM textbooks directly on ncert.nic.in.',
              url: 'https://ncert.nic.in/textbook.php',
            },
            {
              title: 'MIT OpenCourseWare',
              org: 'CC BY-NC-SA Open Courses',
              desc: `Open lecture notes, assignments, and problem sets related to ${subject.name}.`,
              url: `https://ocw.mit.edu/search/?q=${encodedSubjectName}`,
            },
            ...(uniObj?.officialDomain
              ? [
                  {
                    title: `${uniObj.shortName} Official Portal`,
                    org: uniObj.name,
                    desc: 'Official syllabus circulars, examination datesheets, and academic notifications.',
                    url: `https://${uniObj.officialDomain}`,
                  },
                ]
              : []),
          ];

          const handleDownloadRevisionSheet = () => {
            const lines = [
              `# ${subject.code} — ${subject.name} (Quick Exam Revision Sheet)`,
              '',
              `Institution: ${uniObj?.name ?? 'StudySphere'} · Semester ${subject.semester} · ${subject.credits} Credits`,
              '',
              '## Unit-by-Unit Topic Checklist',
              ...subject.units.flatMap((u) => [
                '',
                `### Unit ${u.unitNumber}: ${u.title}`,
                ...u.topics.map((t) => `- [ ] ${t.title}`),
              ]),
              '',
              '## Verified Free Reference Portals',
              ...openLinks.map((l) => `- ${l.title}: ${l.url}`),
              '',
            ];
            downloadTextFile(
              `${subject.code.toLowerCase()}-quick-revision.md`,
              lines.join('\n'),
              'text/markdown;charset=utf-8'
            );
          };

          return (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-mono text-[#1D4ED8] dark:text-blue-400">
                    One-Page Unit Summary · {subject.units.length} Units · {totalTopics} Topics
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-[#0F172A] dark:text-slate-50">
                    Downloadable Quick Revision Sheet ({subject.code})
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    Export all units, topics, and official free reference links as a single clean
                    Markdown checklist for offline exam prep.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadRevisionSheet}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-xs sm:text-sm font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Quick Sheet (.md)</span>
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
                <div>
                  <p className="text-xs font-medium text-[#5B21B6] dark:text-violet-400">
                    Copyright-Safe Official & Open Courseware Links
                  </p>
                  <h3 className="mt-1 text-base font-bold text-[#0F172A] dark:text-slate-100">
                    Free learning resources for {subject.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    StudySphere links directly to authorized free platforms instead of scraping or
                    mirroring copyrighted third-party websites.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {openLinks.map((item) => (
                    <a
                      key={item.title}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#1D4ED8]/60 dark:hover:border-blue-500/60 transition-colors flex flex-col justify-between gap-3"
                    >
                      <div>
                        <p className="text-[11px] font-mono text-[#1D4ED8] dark:text-blue-400">
                          {item.org}
                        </p>
                        <h4 className="mt-1 text-sm font-bold text-[#0F172A] dark:text-slate-100 group-hover:text-[#1D4ED8] dark:group-hover:text-blue-400">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] dark:text-blue-400">
                        <span>Open external resource</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
