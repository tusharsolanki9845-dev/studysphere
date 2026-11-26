import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { useCatalog } from '../lib/catalogContext';
import { useHierarchy } from '../lib/hierarchyContext';
import { Link, useRouter } from '../lib/router';

const PAGE_SIZE = 12;

export function SubjectsPage() {
  const { catalog } = useCatalog();
  const { updateTrail } = useHierarchy();
  const { getParam, search } = useRouter();

  const [courseFilter, setCourseFilter] = useState<string>(getParam('course') ?? 'ALL');
  const [branchCode, setBranchCode] = useState<string>(getParam('branch') ?? 'ALL');
  const [semester, setSemester] = useState<string>(getParam('semester') ?? 'ALL');
  const [query, setQuery] = useState<string>(getParam('q') ?? '');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const paramCourse = getParam('course');
    const paramUni = getParam('university');
    const resolvedCourse =
      paramCourse ??
      (paramUni ? catalog.courses.find((c) => c.universityId === paramUni)?.id ?? 'ALL' : 'ALL');
    setCourseFilter(resolvedCourse);
    setBranchCode(getParam('branch') ?? 'ALL');
    setSemester(getParam('semester') ?? 'ALL');
    setQuery(getParam('q') ?? '');
    setPage(1);
  }, [search, getParam, catalog.courses]);

  const selectedCourseObj = useMemo(
    () => (courseFilter !== 'ALL' ? catalog.courses.find((c) => c.id === courseFilter) : undefined),
    [catalog.courses, courseFilter]
  );

  const visibleBranches = useMemo(
    () =>
      selectedCourseObj
        ? catalog.branches.filter((b) => b.courseId === selectedCourseObj.id)
        : catalog.branches,
    [catalog.branches, selectedCourseObj]
  );

  const selectedBranchObj = useMemo(
    () => visibleBranches.find((b) => b.code.toLowerCase() === branchCode.toLowerCase()),
    [visibleBranches, branchCode]
  );

  const termCount = selectedCourseObj?.totalSemesters ?? 8;
  const termLabel = selectedCourseObj?.degreeLevel === 'Secondary' ? 'Term' : 'Semester';

  useEffect(() => {
    const effectiveCourse =
      selectedCourseObj ??
      (selectedBranchObj
        ? catalog.courses.find((c) => c.id === selectedBranchObj.courseId)
        : undefined);
    updateTrail({
      universityId: effectiveCourse?.universityId ?? 'uni-aktu',
      courseId: effectiveCourse?.id ?? 'course-aktu-btech',
      branchCode: selectedBranchObj?.code ?? null,
      semester: semester !== 'ALL' ? Number(semester) : null,
      subjectCode: null,
    });
  }, [selectedCourseObj, selectedBranchObj, semester, catalog.courses, updateTrail]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.subjects
      .filter((sub) => {
        if (courseFilter !== 'ALL' && sub.courseId !== courseFilter) {
          return false;
        }
        if (branchCode !== 'ALL' && selectedBranchObj) {
          if (!sub.branchIds.includes(selectedBranchObj.id)) return false;
        }
        if (semester !== 'ALL' && sub.semester !== Number(semester)) {
          return false;
        }
        if (q) {
          const hitTitle =
            sub.code.toLowerCase().includes(q) ||
            sub.name.toLowerCase().includes(q) ||
            sub.summary.toLowerCase().includes(q);
          const hitUnit = sub.units.some(
            (u) =>
              u.title.toLowerCase().includes(q) ||
              u.topics.some((t) => t.title.toLowerCase().includes(q))
          );
          return hitTitle || hitUnit;
        }
        return true;
      })
      .sort((a, b) => a.semester - b.semester || a.code.localeCompare(b.code));
  }, [catalog.subjects, courseFilter, branchCode, selectedBranchObj, semester, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = useMemo(
    () => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage]
  );

  return (
    <div>
      <PageHeader
        hierarchy={{
          universityId: selectedCourseObj?.universityId ?? 'uni-aktu',
          courseId: selectedCourseObj?.id ?? 'course-aktu-btech',
          branchCode: selectedBranchObj?.code ?? null,
          semester: semester !== 'ALL' ? Number(semester) : null,
          sectionLabel: !selectedBranchObj && semester === 'ALL' ? 'Subjects' : undefined,
          onBranchClick:
            selectedBranchObj && semester !== 'ALL' ? () => setSemester('ALL') : undefined,
        }}
        title={
          selectedCourseObj
            ? `${selectedCourseObj.shortName} — Subjects Directory`
            : 'Subjects Directory'
        }
        description="Browse indexed subjects across AKTU B.Tech, Mumbai University B.E., Anna University B.E., and CBSE Class 12. Every subject includes Unit → Topic syllabi, original notes, and 70-mark exam blueprints."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4 relative">
            <Search
              className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Filter by code, name, or topic..."
              aria-label="Filter subjects"
              className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={courseFilter}
              onChange={(e) => {
                setCourseFilter(e.target.value);
                setBranchCode('ALL');
                setSemester('ALL');
                setPage(1);
              }}
              aria-label="Filter by course"
              className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
            >
              <option value="ALL">All {catalog.courses.length} Courses</option>
              {catalog.courses.map((c) => {
                const u = catalog.universities.find((uni) => uni.id === c.universityId);
                return (
                  <option key={c.id} value={c.id}>
                    {u?.shortName} · {c.shortName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={branchCode}
              onChange={(e) => {
                setBranchCode(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by branch or stream"
              className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
            >
              <option value="ALL">
                {selectedCourseObj?.degreeLevel === 'Secondary' ? 'All Streams' : 'All Branches'}
              </option>
              {visibleBranches.map((b) => (
                <option key={b.id} value={b.code}>
                  {b.code} — {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={semester}
              onChange={(e) => {
                setSemester(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by semester or term"
              className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
            >
              <option value="ALL">All {termLabel}s</option>
              {Array.from({ length: termCount }, (_, i) => i + 1).map((s) => (
                <option key={s} value={String(s)}>
                  {termLabel} {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-mono tabular-nums">
            Showing {paginated.length} of {filtered.length} matching subjects (Page {safePage} of{' '}
            {totalPages})
          </span>
          {(courseFilter !== 'ALL' || branchCode !== 'ALL' || semester !== 'ALL' || query) && (
            <button
              type="button"
              onClick={() => {
                setCourseFilter('ALL');
                setBranchCode('ALL');
                setSemester('ALL');
                setQuery('');
                setPage(1);
              }}
              className="text-[#1D4ED8] dark:text-blue-400 font-medium hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {paginated.length === 0 ? (
          <EmptyState
            title="No matching subjects found"
            description="No indexed subjects match your current filter combination. Clear filters or request this subject via our Contact page."
            primaryAction={{ label: 'Request Subject', to: '/contact?category=Resource%20Request' }}
            secondaryAction={{ label: 'Open Syllabus Explorer', to: '/syllabus' }}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginated.map((sub) => {
                const noteCount = catalog.notes.filter((n) => n.subjectCode === sub.code).length;
                const pyqCount = catalog.pyqs.filter((p) => p.subjectCode === sub.code).length;
                const course = catalog.courses.find((c) => c.id === sub.courseId);
                const uni = catalog.universities.find((u) => u.id === sub.universityId);
                const shortTerm = course?.degreeLevel === 'Secondary' ? 'Term' : 'Sem';
                return (
                  <Link
                    key={sub.id}
                    to={`/subjects/${encodeURIComponent(sub.code)}`}
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:border-[#1D4ED8]/60 dark:hover:border-blue-500/60 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                        <span className="font-semibold text-[#1D4ED8] dark:text-blue-400">
                          {sub.code}
                        </span>
                        <span className="tabular-nums">
                          {uni?.shortName ?? 'AKTU'} · {shortTerm} {sub.semester} · {sub.credits} Cr
                        </span>
                      </div>
                      <h2 className="mt-2 text-base font-bold text-[#0F172A] dark:text-slate-100 group-hover:text-[#1D4ED8] dark:group-hover:text-blue-400 transition-colors">
                        {sub.name}
                      </h2>
                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {sub.summary}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-mono tabular-nums">
                        {sub.units.length} Units · {noteCount} Notes · {pyqCount} PYQs
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#1D4ED8] dark:group-hover:text-blue-400 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Subjects pagination"
                className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800"
              >
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400 tabular-nums">
                  Page {safePage} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
