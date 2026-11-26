import { useEffect, useMemo } from 'react';
import {
  ArrowRight,
  BellOff,
  BookOpen,
  Calculator,
  CalendarCheck,
  FileText,
  Layers,
  ListChecks,
} from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { SafeImage } from '../components/SafeImage';
import { useCatalog } from '../lib/catalogContext';
import { useFocusMode } from '../lib/focusContext';
import { useHierarchy } from '../lib/hierarchyContext';
import { Link } from '../lib/router';

const CAMPUS_IMG = '/src/assets/images/aktu_engineering_campus_1795405331900.jpg';

interface CourseMeta {
  evaluation: string;
  evaluationNote: string;
  grading: string;
  gradingNote: string;
  attendance: string;
  attendanceNote: string;
  termLabel: string;
}

const COURSE_METADATA: Record<string, CourseMeta> = {
  'course-aktu-btech': {
    evaluation: '70 + 30 Marks',
    evaluationNote: 'End-Sem + Internal',
    grading: '10-Point SGPA',
    gradingNote: 'A+ (10) to F (0)',
    attendance: '75% Minimum',
    attendanceNote: 'Per academic semester',
    termLabel: 'Semester',
  },
  'course-mu-be': {
    evaluation: '80 + 20 Marks',
    evaluationNote: 'End-Sem + IA (Rev-2019)',
    grading: '10-Point CGPI',
    gradingNote: 'O (10) to F (0)',
    attendance: '75% Minimum',
    attendanceNote: 'Per university term',
    termLabel: 'Semester',
  },
  'course-anna-be': {
    evaluation: '60 + 40 Marks',
    evaluationNote: 'End-Sem + Internal (R2021)',
    grading: '10-Point GPA',
    gradingNote: 'O (10) to U (0)',
    attendance: '75% Minimum',
    attendanceNote: 'Mandatory exam eligibility',
    termLabel: 'Semester',
  },
  'course-cbse-12': {
    evaluation: '70 / 80 Theory',
    evaluationNote: 'Board Exam + Practicals',
    grading: '10-Point / %',
    gradingNote: 'A1 (10) to E (0)',
    attendance: '75% Minimum',
    attendanceNote: 'CBSE Board requirement',
    termLabel: 'Term',
  },
  'course-bca': {
    evaluation: '70 + 30 Marks',
    evaluationNote: 'End-Sem + Internal Labs',
    grading: '10-Point SGPA',
    gradingNote: 'Credit-based CBCS scale',
    attendance: '75% Minimum',
    attendanceNote: 'Per academic semester',
    termLabel: 'Semester',
  },
  'course-mca': {
    evaluation: '70 + 30 Marks',
    evaluationNote: 'Postgrad Theory + Sessional',
    grading: '10-Point SGPA',
    gradingNote: 'A+ (10) to F (0)',
    attendance: '75% Minimum',
    attendanceNote: 'Per PG semester',
    termLabel: 'Semester',
  },
  'course-mba': {
    evaluation: '70 + 30 Marks',
    evaluationNote: 'Case-Based Theory + IA',
    grading: '10-Point SGPA',
    gradingNote: 'Credit-weighted PG scale',
    attendance: '75% Minimum',
    attendanceNote: 'Per MBA semester',
    termLabel: 'Semester',
  },
  'course-bpharm': {
    evaluation: '75 + 25 Marks',
    evaluationNote: 'PCI End-Sem + Sessional',
    grading: '10-Point SGPA',
    gradingNote: 'PCI Uniform Regulations',
    attendance: '80% Minimum',
    attendanceNote: 'PCI mandatory attendance',
    termLabel: 'Semester',
  },
  'course-bba': {
    evaluation: '75 + 25 Marks',
    evaluationNote: 'NEP End-Sem + Continuous IA',
    grading: '10-Point SGPA',
    gradingNote: 'NEP-2020 CBCS scale',
    attendance: '75% Minimum',
    attendanceNote: 'Per undergraduate term',
    termLabel: 'Semester',
  },
  'course-bsc': {
    evaluation: '75 + 25 Marks',
    evaluationNote: 'NEP Theory + Practicals',
    grading: '10-Point SGPA',
    gradingNote: 'NEP-2020 Honours scale',
    attendance: '75% Minimum',
    attendanceNote: 'Per undergraduate term',
    termLabel: 'Semester',
  },
  'course-bcom': {
    evaluation: '75 + 25 Marks',
    evaluationNote: 'NEP Theory + Internal',
    grading: '10-Point SGPA',
    gradingNote: 'NEP-2020 Honours scale',
    attendance: '75% Minimum',
    attendanceNote: 'Per undergraduate term',
    termLabel: 'Semester',
  },
  'course-diploma': {
    evaluation: '50 + 50 Marks',
    evaluationNote: 'Board Theory + Practicals',
    grading: 'Percentage / GPA',
    gradingNote: 'State Polytechnic Scheme',
    attendance: '75% Minimum',
    attendanceNote: 'Board exam eligibility',
    termLabel: 'Semester',
  },
};

const DEFAULT_META: CourseMeta = {
  evaluation: '70 + 30 Marks',
  evaluationNote: 'Theory + Internal',
  grading: '10-Point GPA',
  gradingNote: 'Credit-weighted scale',
  attendance: '75% Minimum',
  attendanceNote: 'Standard eligibility',
  termLabel: 'Semester',
};

export function CourseHubPage({ courseId }: { courseId: string }) {
  const { catalog } = useCatalog();
  const { dndEnabled, enableDnd } = useFocusMode();
  const { updateTrail } = useHierarchy();

  const course = useMemo(
    () =>
      catalog.courses.find(
        (c) => c.id === courseId || c.slug.toLowerCase() === courseId.toLowerCase()
      ),
    [catalog.courses, courseId]
  );

  const university = useMemo(
    () => (course ? catalog.universities.find((u) => u.id === course.universityId) : undefined),
    [catalog.universities, course]
  );

  const branches = useMemo(
    () => (course ? catalog.branches.filter((b) => b.courseId === course.id) : []),
    [catalog.branches, course]
  );

  const subjects = useMemo(
    () => (course ? catalog.subjects.filter((s) => s.courseId === course.id) : []),
    [catalog.subjects, course]
  );

  const subjectCodes = useMemo(() => new Set(subjects.map((s) => s.code)), [subjects]);

  const notesCount = useMemo(
    () => catalog.notes.filter((n) => subjectCodes.has(n.subjectCode)).length,
    [catalog.notes, subjectCodes]
  );

  const pyqCount = useMemo(
    () => catalog.pyqs.filter((p) => subjectCodes.has(p.subjectCode)).length,
    [catalog.pyqs, subjectCodes]
  );

  useEffect(() => {
    if (!course) return;
    updateTrail({
      universityId: course.universityId,
      courseId: course.id,
      branchCode: null,
      semester: null,
      subjectCode: null,
    });
  }, [course, updateTrail]);

  if (!course) {
    return (
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <EmptyState
          contextLabel="Course Not Found"
          title="This course hub could not be found"
          description="Browse all active StudySphere courses to access equal syllabus, notes, PYQs, and study tools for every programme."
          primaryAction={{ label: 'View All Courses', to: '/courses' }}
          secondaryAction={{ label: 'Explore Hierarchy', to: '/explore' }}
        />
      </div>
    );
  }

  const meta = COURSE_METADATA[course.id] ?? DEFAULT_META;
  const termNumbers = Array.from({ length: course.totalSemesters }, (_, i) => i + 1);
  const courseParam = encodeURIComponent(course.id);

  return (
    <div>
      <PageHeader
        hierarchy={{
          universityId: course.universityId,
          courseId: course.id,
        }}
        title={`${university?.shortName ?? 'Institution'} ${course.shortName} Academic Hub`}
        description={`${course.description} StudySphere is independent and not officially affiliated with ${university?.shortName ?? 'this institution'}.`}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            {!dndEnabled && (
              <button
                type="button"
                onClick={() => enableDnd(`${university?.shortName ?? ''} ${course.shortName} Study Session`)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-[#0F172A] dark:text-slate-100 hover:border-[#1D4ED8] dark:hover:border-blue-400 transition-colors whitespace-nowrap"
              >
                <BellOff className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400" />
                <span>Focus Mode</span>
              </button>
            )}
            <Link
              to={`/syllabus?course=${courseParam}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-sm font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors whitespace-nowrap"
            >
              <span>Open Syllabus</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        }
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Step-by-Step Systematic Study Roadmap (Equal for Every Course) */}
        <section aria-labelledby="course-roadmap-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
            <div>
              <p className="text-xs font-medium text-[#1D4ED8] dark:text-blue-400">
                Systematic Study Workflow
              </p>
              <h2
                id="course-roadmap-heading"
                className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-slate-50"
              >
                Every feature for {university?.shortName} {course.shortName} in 4 clear steps
              </h2>
            </div>
            <Link
              to="/courses"
              className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline whitespace-nowrap"
            >
              Switch Course →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to={`/syllabus?course=${courseParam}`}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-[#1D4ED8]/60 dark:hover:border-blue-500/60 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#1D4ED8] dark:text-blue-400">
                <span>STEP 01</span>
                <Layers className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="mt-2.5 text-base font-bold text-[#0F172A] dark:text-slate-100 group-hover:text-[#1D4ED8] dark:group-hover:text-blue-400">
                Inspect Syllabus
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Unit-by-unit outlines across {branches.length} branch
                {branches.length === 1 ? '' : 'es'} & {subjects.length} subjects.
              </p>
            </Link>

            <Link
              to={`/notes?course=${courseParam}`}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-[#1D4ED8]/60 dark:hover:border-blue-500/60 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#1D4ED8] dark:text-blue-400">
                <span>STEP 02</span>
                <BookOpen className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="mt-2.5 text-base font-bold text-[#0F172A] dark:text-slate-100 group-hover:text-[#1D4ED8] dark:group-hover:text-blue-400">
                Read Study Notes
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {notesCount} original downloadable Markdown study guides covering every subject.
              </p>
            </Link>

            <Link
              to={`/pyq?course=${courseParam}`}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-[#1D4ED8]/60 dark:hover:border-blue-500/60 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#5B21B6] dark:text-violet-400">
                <span>STEP 03</span>
                <FileText className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="mt-2.5 text-base font-bold text-[#0F172A] dark:text-slate-100 group-hover:text-[#1D4ED8] dark:group-hover:text-blue-400">
                Solve PYQ Papers
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {pyqCount} Section A/B/C exam blueprints with instant `.txt` downloads.
              </p>
            </Link>

            <Link
              to={`/tools?course=${courseParam}`}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-[#1D4ED8]/60 dark:hover:border-blue-500/60 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#5B21B6] dark:text-violet-400">
                <span>STEP 04</span>
                <Calculator className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="mt-2.5 text-base font-bold text-[#0F172A] dark:text-slate-100 group-hover:text-[#1D4ED8] dark:group-hover:text-blue-400">
                Use Study Tools
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                GPA calculator presets, 75% attendance planner, focus timer, and unit checklist.
              </p>
            </Link>
          </div>
        </section>

        {/* Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-[#1D4ED8] dark:text-blue-400">
                Programme Structure · {university?.name}
              </p>
              <h2 className="mt-1.5 text-2xl font-bold text-[#0F172A] dark:text-slate-50">
                {course.name} ({course.durationYears} Years · {course.totalSemesters}{' '}
                {meta.termLabel}s)
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {course.description} All subjects under this programme include complete syllabus
                outlines, downloadable original study notes, practice exam blueprints, and
                browser-local revision checklists.
              </p>

              <dl className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-5">
                <div>
                  <dt className="text-xs text-slate-500 dark:text-slate-400">Evaluation Pattern</dt>
                  <dd className="mt-1 text-base font-bold text-[#0F172A] dark:text-white font-mono tabular-nums">
                    {meta.evaluation}
                  </dd>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {meta.evaluationNote}
                  </p>
                </div>
                <div>
                  <dt className="text-xs text-slate-500 dark:text-slate-400">Grading Scale</dt>
                  <dd className="mt-1 text-base font-bold text-[#0F172A] dark:text-white font-mono tabular-nums">
                    {meta.grading}
                  </dd>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {meta.gradingNote}
                  </p>
                </div>
                <div>
                  <dt className="text-xs text-slate-500 dark:text-slate-400">Attendance Policy</dt>
                  <dd className="mt-1 text-base font-bold text-[#0F172A] dark:text-white font-mono tabular-nums">
                    {meta.attendance}
                  </dd>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {meta.attendanceNote}
                  </p>
                </div>
              </dl>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4">
              <Link
                to={`/tools?tab=sgpa&course=${courseParam}`}
                className="text-sm font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                <Calculator className="w-4 h-4" />
                <span>GPA / Grade Calculator</span>
              </Link>
              <Link
                to={`/tools?tab=attendance&course=${courseParam}`}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white inline-flex items-center gap-1"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Attendance Planner</span>
              </Link>
              <Link
                to={`/tools?tab=checklist&course=${courseParam}`}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white inline-flex items-center gap-1"
              >
                <ListChecks className="w-4 h-4" />
                <span>Revision Checklist</span>
              </Link>
            </div>
          </div>

          {!dndEnabled && (
            <div className="lg:col-span-5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 min-h-[240px]">
              <SafeImage
                src={CAMPUS_IMG}
                alt={`${university?.shortName ?? 'University'} academic campus library`}
                fallbackTitle={`${university?.shortName ?? ''} ${course.shortName} Hub`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Branches / Streams Directory */}
        <section>
          <div className="flex flex-wrap items-end justify-between gap-2 mb-5">
            <div>
              <p className="text-xs font-mono text-[#1D4ED8] dark:text-blue-400">
                01. Branches & Streams
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-slate-50">
                Explore {course.shortName} by Branch
              </h2>
            </div>
            <Link
              to={`/explore?university=${encodeURIComponent(course.universityId)}&course=${courseParam}`}
              className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline"
            >
              Open 7-Level Hierarchy →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((branch) => {
              const count = subjects.filter((s) => s.branchIds.includes(branch.id)).length;
              return (
                <Link
                  key={branch.id}
                  to={`/subjects?course=${courseParam}&branch=${encodeURIComponent(branch.code)}`}
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-[#1D4ED8]/60 dark:hover:border-blue-500/60 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span className="font-semibold text-[#1D4ED8] dark:text-blue-400">
                      {branch.code}
                    </span>
                    <span className="tabular-nums">
                      {count} subject{count === 1 ? '' : 's'}
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-[#0F172A] dark:text-slate-100 group-hover:text-[#1D4ED8] dark:group-hover:text-blue-400">
                    {branch.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {branch.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Semesters / Terms Grid */}
        <section>
          <div className="mb-5">
            <p className="text-xs font-mono text-[#5B21B6] dark:text-violet-400">
              02. {meta.termLabel}s (1–{course.totalSemesters})
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-slate-50">
              Browse {course.shortName} by {meta.termLabel}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {termNumbers.map((sem) => {
              const termSubjects = subjects.filter((s) => s.semester === sem);
              const year = Math.ceil(sem / 2);
              return (
                <Link
                  key={sem}
                  to={`/subjects?course=${courseParam}&semester=${sem}`}
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-[#1D4ED8]/60 dark:hover:border-blue-500/60 transition-colors"
                >
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {course.totalSemesters > 2
                      ? `Year ${year} · ${sem % 2 === 1 ? 'Odd Sem' : 'Even Sem'}`
                      : `Board Part ${sem}`}
                  </p>
                  <p className="mt-1 text-lg font-bold text-[#0F172A] dark:text-slate-100 group-hover:text-[#1D4ED8] dark:group-hover:text-blue-400">
                    {meta.termLabel} {sem}
                  </p>
                  <p className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                    {termSubjects.length} indexed subject{termSubjects.length === 1 ? '' : 's'}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
