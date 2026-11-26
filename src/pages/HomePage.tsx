import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BellOff,
  BookOpen,
  Calculator,
  CalendarCheck,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Layers,
  ListChecks,
} from 'lucide-react';
import { motion } from 'motion/react';
import { AdSlot } from '../components/AdSlot';
import { EmptyState } from '../components/EmptyState';
import { SafeImage } from '../components/SafeImage';
import { SearchBar } from '../components/SearchBar';
import { useCatalog } from '../lib/catalogContext';
import { useFocusMode } from '../lib/focusContext';
import { Link } from '../lib/router';
import { OFFICIAL_FREE_SOURCES } from '../shared/officialSources';

const HERO_IMG = '/src/assets/images/hero_academic_architecture_1795405333901.jpg';
const TOOLS_IMG = '/src/assets/images/study_tools_workspace_1795405331703.jpg';

const HIERARCHY_STEPS = [
  'University',
  'Course',
  'Branch',
  'Semester',
  'Subject',
  'Unit',
  'Topic',
];

export function HomePage() {
  const { catalog } = useCatalog();
  const { dndEnabled, enableDnd } = useFocusMode();

  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-aktu-btech');
  const [selectedSem, setSelectedSem] = useState<number>(3);
  const [expandedSubjectId, setExpandedSubjectId] = useState<string>('sub-bcs301');
  const [homeCourseLevel, setHomeCourseLevel] = useState<string>('ALL');

  const visibleHomeCourses = useMemo(
    () =>
      homeCourseLevel === 'ALL'
        ? catalog.courses
        : catalog.courses.filter((c) => c.degreeLevel === homeCourseLevel),
    [catalog.courses, homeCourseLevel]
  );

  const activeCourse = useMemo(
    () => catalog.courses.find((c) => c.id === selectedCourseId) ?? catalog.courses[0],
    [catalog.courses, selectedCourseId]
  );

  const activeUni = useMemo(
    () => catalog.universities.find((u) => u.id === activeCourse?.universityId),
    [catalog.universities, activeCourse]
  );

  const availableTermNumbers = useMemo(() => {
    if (!activeCourse) return [1, 2, 3, 4, 5, 6, 7, 8];
    return Array.from({ length: activeCourse.totalSemesters }, (_, i) => i + 1);
  }, [activeCourse]);

  const termLabel = activeCourse?.degreeLevel === 'Secondary' ? 'Term' : 'Semester';

  const semesterSubjects = useMemo(
    () =>
      catalog.subjects.filter(
        (s) => s.courseId === activeCourse?.id && s.semester === selectedSem
      ),
    [catalog.subjects, activeCourse, selectedSem]
  );

  const activeSubject = useMemo(() => {
    const found = semesterSubjects.find((s) => s.id === expandedSubjectId);
    return found ?? semesterSubjects[0] ?? null;
  }, [semesterSubjects, expandedSubjectId]);

  const totalTopics = useMemo(
    () =>
      catalog.subjects.reduce(
        (sum, s) => sum + s.units.reduce((uSum, u) => uSum + u.topics.length, 0),
        0
      ),
    [catalog.subjects]
  );

  const handleSelectPreviewCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    const courseSubjects = catalog.subjects.filter((s) => s.courseId === courseId);
    const preferred =
      courseSubjects.find((s) => s.semester === 3) ?? courseSubjects[0];
    if (preferred) {
      setSelectedSem(preferred.semester);
      setExpandedSubjectId(preferred.id);
    } else {
      setSelectedSem(1);
    }
  };

  return (
    <div>
      {/* Hero Section + Live Search Bar */}
      <section className="bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800">
        <div
          className={`max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 ${
            dndEnabled ? 'py-8 sm:py-10' : 'py-12 sm:py-16 lg:py-20'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`${
                dndEnabled ? 'lg:col-span-12 max-w-3xl' : 'lg:col-span-7'
              } flex flex-col justify-center`}
            >
              <p className="text-sm font-medium text-[#1D4ED8] dark:text-blue-400 mb-3">
                Learn Without Limits · 100% Free for Students (₹0 Access)
              </p>

              <h1
                className="font-bold tracking-tight text-[#0F172A] dark:text-white leading-[1.08]"
                style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.65rem)' }}
              >
                Your studies, all in one sphere.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Equal, distraction-free syllabus outlines, original downloadable study notes,
                70-mark PYQ blueprints, and study tools across {catalog.courses.length} Indian
                programmes — B.Tech, B.E., BCA, MCA, MBA, B.Pharm, BBA, B.Sc, B.Com, Diploma &
                CBSE Class 12.
              </p>

              {/* Search Bar */}
              <div className="mt-7 max-w-2xl">
                <SearchBar />
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <span>Quick lookup:</span>
                  <Link
                    to="/subjects/BCS301"
                    className="font-mono text-slate-700 dark:text-slate-200 hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                  >
                    BCS301 (B.Tech)
                  </Link>
                  <span aria-hidden="true">·</span>
                  <Link
                    to="/subjects/BCA301"
                    className="font-mono text-slate-700 dark:text-slate-200 hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                  >
                    BCA301 (BCA)
                  </Link>
                  <span aria-hidden="true">·</span>
                  <Link
                    to="/subjects/KMBN201"
                    className="font-mono text-slate-700 dark:text-slate-200 hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                  >
                    KMBN201 (MBA)
                  </Link>
                  <span aria-hidden="true">·</span>
                  <Link
                    to="/subjects/BP101T"
                    className="font-mono text-slate-700 dark:text-slate-200 hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                  >
                    BP101T (B.Pharm)
                  </Link>
                </div>
              </div>

              {/* Single Primary CTA + Quiet Focus Link */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-sm font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors whitespace-nowrap"
                >
                  <span>Browse All {catalog.courses.length} Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {!dndEnabled && (
                  <button
                    type="button"
                    onClick={() => enableDnd('Focused Revision Session')}
                    className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-[#1D4ED8] dark:text-blue-400 hover:text-[#1E40AF] dark:hover:text-blue-300 transition-colors whitespace-nowrap"
                  >
                    <BellOff className="w-4 h-4" aria-hidden="true" />
                    <span>Start Do Not Disturb Study</span>
                  </button>
                )}
              </div>
            </motion.div>

            {/* Editorial Focal Image (hidden in Do Not Disturb mode) */}
            {!dndEnabled && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.34, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5"
              >
                <div className="h-full min-h-[260px] lg:min-h-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                  <SafeImage
                    src={HERO_IMG}
                    alt="Sunlit university desk with open engineering notebook and textbook"
                    fallbackTitle="StudySphere Academic Architecture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Honest Real Catalog Summary Strip */}
          {!dndEnabled && (
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-2xl font-bold text-[#0F172A] dark:text-white font-mono tabular-nums">
                  {catalog.courses.length}
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Equal-Access Courses ({catalog.branches.length} Branches)
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A] dark:text-white font-mono tabular-nums">
                  {catalog.subjects.length}
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Indexed Subjects ({totalTopics} Topics)
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A] dark:text-white font-mono tabular-nums">
                  {catalog.notes.length}
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Original Downloadable Study Guides
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A] dark:text-white font-mono tabular-nums">
                  {catalog.pyqs.length}
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  70-Mark Section A/B/C Blueprints
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot slotId="home-below-hero" className="mt-8" />
      </div>

      {/* Equal Access 4-Course Directory */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#5B21B6] dark:text-violet-400">
              Equal Features for Every Course
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-slate-50">
              Choose your course and follow the 4-step study system
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Every course below gets the exact same workspace: Course Hub, Syllabus Explorer,
              original Markdown Notes, 70-mark PYQ Blueprints, SGPA/CGPA Calculator, and Do Not
              Disturb Focus Mode.
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] dark:text-blue-400 hover:text-[#1E40AF] dark:hover:text-blue-300 whitespace-nowrap"
          >
            <span>Open 7-Level Hierarchy Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          {[
            { id: 'ALL', label: `All (${catalog.courses.length})` },
            { id: 'Undergraduate', label: 'Undergraduate' },
            { id: 'Postgraduate', label: 'Postgraduate' },
            { id: 'Diploma', label: 'Diploma' },
            { id: 'Secondary', label: 'Secondary' },
          ].map((lvl) => {
            const active = homeCourseLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setHomeCourseLevel(lvl.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-[#0F172A] dark:bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#1D4ED8]/50'
                }`}
              >
                {lvl.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleHomeCourses.map((course) => {
            const uni = catalog.universities.find((u) => u.id === course.universityId);
            const courseBranches = catalog.branches.filter((b) => b.courseId === course.id);
            const courseSubjects = catalog.subjects.filter((s) => s.courseId === course.id);
            const codes = new Set(courseSubjects.map((s) => s.code));
            const noteCount = catalog.notes.filter((n) => codes.has(n.subjectCode)).length;
            const pyqCount = catalog.pyqs.filter((p) => codes.has(p.subjectCode)).length;

            return (
              <article
                key={course.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-[#1D4ED8]/50 dark:hover:border-blue-500/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono font-semibold text-[#1D4ED8] dark:text-blue-400">
                      {uni?.shortName} · {course.degreeLevel}
                    </span>
                    <span className="font-mono tabular-nums">
                      {courseBranches.length}{' '}
                      {course.degreeLevel === 'Secondary' ? 'Streams' : 'Branches'} ·{' '}
                      {courseSubjects.length} Subjects
                    </span>
                  </div>

                  <h3 className="mt-2 text-lg font-bold text-[#0F172A] dark:text-slate-100">
                    {course.name}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium">
                    <Link
                      to={`/syllabus?course=${encodeURIComponent(course.id)}`}
                      className="text-slate-700 dark:text-slate-300 hover:text-[#1D4ED8] dark:hover:text-blue-400"
                    >
                      Syllabus
                    </Link>
                    <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                      ·
                    </span>
                    <Link
                      to={`/notes?course=${encodeURIComponent(course.id)}`}
                      className="text-slate-700 dark:text-slate-300 hover:text-[#1D4ED8] dark:hover:text-blue-400"
                    >
                      Notes ({noteCount})
                    </Link>
                    <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                      ·
                    </span>
                    <Link
                      to={`/pyq?course=${encodeURIComponent(course.id)}`}
                      className="text-slate-700 dark:text-slate-300 hover:text-[#1D4ED8] dark:hover:text-blue-400"
                    >
                      PYQs ({pyqCount})
                    </Link>
                    <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                      ·
                    </span>
                    <Link
                      to={`/tools?course=${encodeURIComponent(course.id)}`}
                      className="text-slate-700 dark:text-slate-300 hover:text-[#1D4ED8] dark:hover:text-blue-400"
                    >
                      Study Tools
                    </Link>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    100% Free · ₹0 Student Access
                  </span>
                  <Link
                    to={`/courses/${encodeURIComponent(course.id)}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] dark:text-blue-400 hover:text-[#1E40AF] dark:hover:text-blue-300"
                  >
                    <span>Open Course Hub</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Clean 7-Level Academic Hierarchy Bar */}
        {!dndEnabled && (
          <div className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 flex flex-wrap items-center justify-between gap-3">
            <ol className="flex flex-wrap items-center gap-y-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
              {HIERARCHY_STEPS.map((step, index) => (
                <li key={step} className="inline-flex items-center">
                  <span className="font-mono text-[#1D4ED8] dark:text-blue-400 mr-1">
                    0{index + 1}.
                  </span>
                  <span>{step}</span>
                  {index < HIERARCHY_STEPS.length - 1 && (
                    <ChevronRight
                      className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 mx-1.5"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
            <Link
              to="/universities"
              className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline whitespace-nowrap"
            >
              View Institution Registry
            </Link>
          </div>
        )}
      </section>

      {/* Interactive Syllabus Explorer Preview (All 4 Courses Supported) */}
      <section className="bg-white dark:bg-[#0F172A] border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-medium text-[#1D4ED8] dark:text-blue-400">
                Interactive Syllabus Explorer
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-slate-50">
                Inspect units and topics for any course
              </h2>
            </div>
            <Link
              to={`/syllabus?course=${encodeURIComponent(activeCourse?.id ?? 'course-aktu-btech')}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] dark:text-blue-400 hover:text-[#1E40AF] dark:hover:text-blue-300 whitespace-nowrap"
            >
              <span>Open Full Syllabus Explorer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Step 1: Course Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            {catalog.courses.map((course) => {
              const active = course.id === activeCourse?.id;
              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => handleSelectPreviewCourse(course.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-[#1D4ED8] dark:bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                  }`}
                >
                  {course.shortName}
                </button>
              );
            })}
          </div>

          {/* Step 2: Semester / Term Tabs */}
          <div
            role="tablist"
            aria-label="Filter syllabus preview by semester or term"
            className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6"
          >
            {availableTermNumbers.map((sem) => {
              const active = selectedSem === sem;
              return (
                <button
                  key={sem}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setSelectedSem(sem);
                    const first = catalog.subjects.find(
                      (s) => s.courseId === activeCourse?.id && s.semester === sem
                    );
                    if (first) setExpandedSubjectId(first.id);
                  }}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-[#0F172A] dark:bg-slate-100 text-white dark:text-[#0F172A]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                  }`}
                >
                  {termLabel} {sem}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-2.5">
              {semesterSubjects.length === 0 ? (
                <EmptyState
                  title={`No subjects indexed for ${activeCourse?.shortName} ${termLabel} ${selectedSem} yet`}
                  description="Select another term tab or open the Course Hub to browse all indexed subjects for this programme."
                  primaryAction={{
                    label: `Open ${activeCourse?.shortName ?? 'Course'} Hub`,
                    to: `/courses/${encodeURIComponent(activeCourse?.id ?? 'course-aktu-btech')}`,
                  }}
                />
              ) : (
                semesterSubjects.map((sub) => {
                  const selected = activeSubject?.id === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setExpandedSubjectId(sub.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-colors ${
                        selected
                          ? 'bg-[#EFF6FF]/60 dark:bg-blue-950/50 border-[#1D4ED8] dark:border-blue-500 text-[#0F172A] dark:text-white'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-mono font-semibold text-[#1D4ED8] dark:text-blue-400">
                          {sub.code}
                        </span>
                        <span className="font-mono tabular-nums">
                          {sub.credits} Credits · {sub.units.length} Units
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-[#0F172A] dark:text-slate-100">
                        {sub.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                        {sub.summary}
                      </p>
                    </button>
                  );
                })
              )}
            </div>

            <div className="lg:col-span-7 bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              {activeSubject ? (
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {activeUni?.shortName} · {activeCourse?.shortName} · {termLabel}{' '}
                        {activeSubject.semester} · {activeSubject.code}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-[#0F172A] dark:text-slate-50">
                        {activeSubject.name}
                      </h3>
                    </div>
                    <Link
                      to={`/subjects/${encodeURIComponent(activeSubject.code)}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:border-[#1D4ED8] dark:hover:border-blue-400 hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                    >
                      <span>Open Subject Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="mt-5 divide-y divide-slate-200/80 dark:divide-slate-800">
                    {activeSubject.units.map((unit) => (
                      <div key={unit.id} className="py-3.5 first:pt-0 last:pb-0">
                        <p className="text-sm font-semibold text-[#0F172A] dark:text-slate-100">
                          <span className="font-mono text-[#1D4ED8] dark:text-blue-400 mr-2">
                            Unit {unit.unitNumber}.
                          </span>
                          {unit.title}
                        </p>
                        <ul className="mt-1.5 space-y-1 text-xs text-slate-600 dark:text-slate-300 pl-6 list-disc">
                          {unit.topics.map((topic) => (
                            <li key={topic.id}>{topic.title}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Select a subject to inspect its units.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Notes & Study Guides + Previous-Year Papers */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[#1D4ED8] dark:text-blue-400">
                  Notes & Study Guides
                </p>
                <BookOpen className="w-5 h-5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
              </div>
              <h2 className="mt-2 text-2xl font-bold text-[#0F172A] dark:text-slate-50">
                Original, copyright-safe study notes
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Every indexed subject across all 4 courses includes readable, downloadable Markdown
                guides with key formulas and exam takeaways.
              </p>

              <div className="mt-6">
                <ul className="divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800">
                  {catalog.notes.slice(0, 4).map((note) => (
                    <li key={note.id} className="py-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {note.subjectCode} · {note.license} · {note.publishedAt}
                      </p>
                      <Link
                        to={`/subjects/${encodeURIComponent(note.subjectCode)}?tab=notes`}
                        className="mt-0.5 block text-sm font-semibold text-[#0F172A] dark:text-slate-100 hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                      >
                        {note.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <Link
                to="/notes"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] dark:text-blue-400 hover:text-[#1E40AF] dark:hover:text-blue-300"
              >
                <span>Open All {catalog.notes.length} Notes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact?category=Original%20Contribution"
                className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white"
              >
                Contribute Original Notes
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[#5B21B6] dark:text-violet-400">
                  Previous-Year Papers & Blueprints
                </p>
                <FileText className="w-5 h-5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
              </div>
              <h2 className="mt-2 text-2xl font-bold text-[#0F172A] dark:text-slate-50">
                Complete 70-mark exam blueprints
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Structured Section A, B, and C exam blueprints mapped across Units 1–5 for every
                course and subject, with direct `.txt` downloads.
              </p>

              <div className="mt-6">
                <ul className="divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800">
                  {catalog.pyqs.slice(0, 4).map((paper) => (
                    <li key={paper.id} className="py-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {paper.subjectCode} · {paper.examSession} {paper.examYear}
                      </p>
                      <Link
                        to={`/subjects/${encodeURIComponent(paper.subjectCode)}?tab=pyq`}
                        className="mt-0.5 block text-sm font-semibold text-[#0F172A] dark:text-slate-100 hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                      >
                        {paper.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <Link
                to="/pyq"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] dark:text-blue-400 hover:text-[#1E40AF] dark:hover:text-blue-300"
              >
                <span>Open All {catalog.pyqs.length} Exam Papers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact?category=Resource%20Request"
                className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white"
              >
                Request Subject Papers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Study Tools Section */}
      <section className="bg-white dark:bg-[#0F172A] border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-medium text-[#1D4ED8] dark:text-blue-400">
                  Study Tools & Focus
                </p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-slate-50">
                  Practical academic tools for every course
                </h2>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Zero-signup, browser-local utilities tuned for AKTU, Mumbai University, Anna
                  University, and CBSE Class 12 — zero cloud account or paid tier required.
                </p>
              </div>
              {!dndEnabled && (
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-[4/3]">
                  <SafeImage
                    src={TOOLS_IMG}
                    alt="Overhead flatlay of engineering grid notebook, metal ruler, and navy pen"
                    fallbackTitle="StudySphere Academic Utilities"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/tools?tab=sgpa"
                className="group bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:bg-white dark:hover:bg-slate-800/90 hover:border-[#1D4ED8]/50 dark:hover:border-blue-500/60 transition-colors flex flex-col justify-between"
              >
                <div>
                  <Calculator className="w-5 h-5 text-[#1D4ED8] dark:text-blue-400" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold text-[#0F172A] dark:text-slate-100 group-hover:text-[#1D4ED8] dark:group-hover:text-blue-400">
                    SGPA & CGPA Calculator
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Load real semester or term subjects for any course and calculate SGPA,
                    cumulative CGPA, and percentage equivalent instantly.
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] dark:text-blue-400">
                  Launch calculator <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                to="/tools?tab=attendance"
                className="group bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:bg-white dark:hover:bg-slate-800/90 hover:border-[#1D4ED8]/50 dark:hover:border-blue-500/60 transition-colors flex flex-col justify-between"
              >
                <div>
                  <CalendarCheck
                    className="w-5 h-5 text-[#1D4ED8] dark:text-blue-400"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 text-base font-semibold text-[#0F172A] dark:text-slate-100 group-hover:text-[#1D4ED8] dark:group-hover:text-blue-400">
                    75% Attendance Planner
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Calculate your current attendance standing and exact consecutive classes needed
                    for exam eligibility.
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] dark:text-blue-400">
                  Check eligibility <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                to="/tools?tab=timer"
                className="group bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:bg-white dark:hover:bg-slate-800/90 hover:border-[#1D4ED8]/50 dark:hover:border-blue-500/60 transition-colors flex flex-col justify-between"
              >
                <div>
                  <Clock className="w-5 h-5 text-[#5B21B6] dark:text-violet-400" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold text-[#0F172A] dark:text-slate-100 group-hover:text-[#1D4ED8] dark:group-hover:text-blue-400">
                    Exam Focus Timer & Do Not Disturb
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Run synced 25-minute or 50-minute deep study sprints with Do Not Disturb mode
                    to hide chrome across every page.
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] dark:text-blue-400">
                  Start focus session <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                to="/tools?tab=checklist"
                className="group bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:bg-white dark:hover:bg-slate-800/90 hover:border-[#1D4ED8]/50 dark:hover:border-blue-500/60 transition-colors flex flex-col justify-between"
              >
                <div>
                  <ListChecks
                    className="w-5 h-5 text-[#5B21B6] dark:text-violet-400"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 text-base font-semibold text-[#0F172A] dark:text-slate-100 group-hover:text-[#1D4ED8] dark:group-hover:text-blue-400">
                    Unit Revision Checklist
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Filter by any course, pick any indexed subject, and save Unit 1–5 revision
                    progress locally in your browser.
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] dark:text-blue-400">
                  Track progress <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Official Free Sources + Announcements (suppressed during Do Not Disturb) */}
      {!dndEnabled && (
        <>
          <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-medium text-[#1D4ED8] dark:text-blue-400">
                  Free Official Academic Data Sources
                </p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-slate-50">
                  Official portals linked directly — never mirrored illegally
                </h2>
              </div>
              <Link
                to="/about"
                className="text-sm font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline inline-flex items-center gap-1 whitespace-nowrap"
              >
                <span>Zero-Cost & Open Policy</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {OFFICIAL_FREE_SOURCES.map((src) => (
                <a
                  key={src.id}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-[#1D4ED8]/50 dark:hover:border-blue-500/60 transition-colors flex flex-col justify-between gap-3"
                >
                  <div>
                    <p className="text-[11px] font-mono text-[#5B21B6] dark:text-violet-400">
                      {src.category}
                    </p>
                    <h3 className="mt-1 text-base font-bold text-[#0F172A] dark:text-slate-100 group-hover:text-[#1D4ED8] dark:group-hover:text-blue-400 transition-colors">
                      {src.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {src.coverage}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] dark:text-blue-400">
                    <span>Open official site</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* Recent Announcements */}
          <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-xs font-medium text-[#1D4ED8] dark:text-blue-400">
                    Recent Announcements
                  </p>
                  <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-slate-50">
                    Platform & curriculum updates
                  </h2>
                </div>
                <Link
                  to="/subjects"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Browse all {catalog.subjects.length} subjects</span>
                </Link>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {catalog.announcements.slice(0, 4).map((ann) => (
                  <article key={ann.id} className="py-5 first:pt-5 last:pb-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-medium text-[#1D4ED8] dark:text-blue-400">
                        {ann.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={ann.publishedAt} className="font-mono">
                        {ann.publishedAt}
                      </time>
                      {ann.pinned && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#5B21B6] dark:text-violet-400 font-medium">
                            Pinned
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="mt-1.5 text-base font-semibold text-[#0F172A] dark:text-slate-100">
                      {ann.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                      {ann.summary}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
