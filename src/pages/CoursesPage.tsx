import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Calculator, FileText, Layers, Search } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { useCatalog } from '../lib/catalogContext';
import { Link } from '../lib/router';
import type { Course } from '../shared/types';

type LevelFilter = 'ALL' | Course['degreeLevel'];

const LEVELS: Array<{ id: LevelFilter; label: string }> = [
  { id: 'ALL', label: 'All Programmes' },
  { id: 'Undergraduate', label: 'Undergraduate' },
  { id: 'Postgraduate', label: 'Postgraduate' },
  { id: 'Diploma', label: 'Diploma' },
  { id: 'Secondary', label: 'Secondary (Class 12)' },
];

export function CoursesPage() {
  const { catalog } = useCatalog();
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('ALL');
  const [query, setQuery] = useState('');

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.courses.filter((course) => {
      if (levelFilter !== 'ALL' && course.degreeLevel !== levelFilter) return false;
      if (!q) return true;
      const uni = catalog.universities.find((u) => u.id === course.universityId);
      const branches = catalog.branches.filter((b) => b.courseId === course.id);
      return (
        course.name.toLowerCase().includes(q) ||
        course.shortName.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        (uni?.shortName.toLowerCase().includes(q) ?? false) ||
        branches.some(
          (b) => b.name.toLowerCase().includes(q) || b.code.toLowerCase().includes(q)
        )
      );
    });
  }, [catalog.courses, catalog.universities, catalog.branches, levelFilter, query]);

  return (
    <div>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Courses' }]}
        title={`Courses & Programmes (${catalog.courses.length} Active)`}
        description="Every course on StudySphere — from Engineering and Computing to Management, Pharmacy, Commerce, Science, Diploma, and CBSE Class 12 — gets the exact same 4-step free study system."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Level Filter & Search */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {LEVELS.map((lvl) => {
                const active = levelFilter === lvl.id;
                const count =
                  lvl.id === 'ALL'
                    ? catalog.courses.length
                    : catalog.courses.filter((c) => c.degreeLevel === lvl.id).length;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setLevelFilter(lvl.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[#0F172A] dark:bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {lvl.label}{' '}
                    <span className="font-mono text-[11px] opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <Search
                className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search B.Tech, BCA, MBA, B.Pharm..."
                aria-label="Search courses"
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <EmptyState
            title="No courses match your search"
            description="Clear your degree filter or search text to browse all 12 active courses, or request a new degree programme."
            primaryAction={{ label: 'Request New Course', to: '/contact?category=Resource%20Request' }}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredCourses.map((course) => {
              const uni = catalog.universities.find((u) => u.id === course.universityId);
              const branches = catalog.branches.filter((b) => b.courseId === course.id);
              const subjects = catalog.subjects.filter((s) => s.courseId === course.id);
              const subjectCodes = new Set(subjects.map((s) => s.code));
              const noteCount = catalog.notes.filter((n) => subjectCodes.has(n.subjectCode)).length;
              const pyqCount = catalog.pyqs.filter((p) => subjectCodes.has(p.subjectCode)).length;
              const termLabel = course.degreeLevel === 'Secondary' ? 'Terms' : 'Semesters';

              return (
                <article
                  key={course.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-[#1D4ED8] dark:text-blue-400">
                        {uni?.shortName ?? 'Institution'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{course.degreeLevel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {course.durationYears} {course.durationYears === 1 ? 'Year' : 'Years'} /{' '}
                        {course.totalSemesters} {termLabel}
                      </span>
                    </div>
                    <Link
                      to={`/courses/${encodeURIComponent(course.id)}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-xs sm:text-sm font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors whitespace-nowrap"
                    >
                      <span>Open Course Hub</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <h2 className="mt-3 text-2xl font-bold text-[#0F172A] dark:text-slate-50">
                    {course.name} ({course.shortName})
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                    {course.description}
                  </p>

                  {/* Equal Feature Parity Strip */}
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Link
                      to={`/syllabus?course=${encodeURIComponent(course.id)}`}
                      className="p-3.5 rounded-lg bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#1D4ED8]/60 dark:hover:border-blue-500/60 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>01. Syllabus</span>
                        <Layers className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-blue-400" />
                      </div>
                      <p className="mt-1 font-mono text-sm font-semibold text-[#0F172A] dark:text-slate-100 tabular-nums">
                        {subjects.length} Subjects
                      </p>
                    </Link>

                    <Link
                      to={`/notes?course=${encodeURIComponent(course.id)}`}
                      className="p-3.5 rounded-lg bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#1D4ED8]/60 dark:hover:border-blue-500/60 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>02. Study Notes</span>
                        <BookOpen className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-blue-400" />
                      </div>
                      <p className="mt-1 font-mono text-sm font-semibold text-[#0F172A] dark:text-slate-100 tabular-nums">
                        {noteCount} Guides
                      </p>
                    </Link>

                    <Link
                      to={`/pyq?course=${encodeURIComponent(course.id)}`}
                      className="p-3.5 rounded-lg bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#1D4ED8]/60 dark:hover:border-blue-500/60 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>03. PYQ Papers</span>
                        <FileText className="w-3.5 h-3.5 text-[#5B21B6] dark:text-violet-400" />
                      </div>
                      <p className="mt-1 font-mono text-sm font-semibold text-[#0F172A] dark:text-slate-100 tabular-nums">
                        {pyqCount} Blueprints
                      </p>
                    </Link>

                    <Link
                      to={`/tools?course=${encodeURIComponent(course.id)}`}
                      className="p-3.5 rounded-lg bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#1D4ED8]/60 dark:hover:border-blue-500/60 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>04. Study Tools</span>
                        <Calculator className="w-3.5 h-3.5 text-[#5B21B6] dark:text-violet-400" />
                      </div>
                      <p className="mt-1 text-sm font-semibold text-[#0F172A] dark:text-slate-100">
                        SGPA · Focus · Checklist
                      </p>
                    </Link>
                  </div>

                  {/* Branches / Streams */}
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                      {course.degreeLevel === 'Secondary' ? 'Included Streams' : 'Included Branches'}{' '}
                      ({branches.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {branches.map((branch) => (
                        <Link
                          key={branch.id}
                          to={`/subjects?course=${encodeURIComponent(course.id)}&branch=${encodeURIComponent(branch.code)}`}
                          className="px-4 py-3 rounded-lg bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#1D4ED8]/50 dark:hover:border-blue-500/60 transition-colors flex items-center justify-between text-sm"
                        >
                          <span className="font-medium text-[#0F172A] dark:text-slate-100 truncate">
                            <span className="font-mono text-[#1D4ED8] dark:text-blue-400 mr-1.5">
                              {branch.code}
                            </span>
                            {branch.name}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 ml-2" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
