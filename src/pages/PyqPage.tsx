import { useEffect, useMemo, useState } from 'react';
import { BellOff, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { PyqPaperViewer } from '../components/PyqPaperViewer';
import { useCatalog } from '../lib/catalogContext';
import { useFocusMode } from '../lib/focusContext';
import { Link, useRouter } from '../lib/router';

const PAGE_SIZE = 10;

export function PyqPage() {
  const { catalog } = useCatalog();
  const { dndEnabled, enableDnd } = useFocusMode();
  const { getParam, search } = useRouter();
  const [courseFilter, setCourseFilter] = useState<string>(getParam('course') ?? 'ALL');
  const [subjectFilter, setSubjectFilter] = useState<string>(getParam('subject') ?? 'ALL');
  const [sessionFilter, setSessionFilter] = useState<string>('ALL');
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setCourseFilter(getParam('course') ?? 'ALL');
    setSubjectFilter(getParam('subject') ?? 'ALL');
    setPage(1);
  }, [search, getParam]);

  const selectedCourseObj = useMemo(
    () => (courseFilter !== 'ALL' ? catalog.courses.find((c) => c.id === courseFilter) : undefined),
    [catalog.courses, courseFilter]
  );

  const visibleSubjects = useMemo(
    () =>
      selectedCourseObj
        ? catalog.subjects.filter((s) => s.courseId === selectedCourseObj.id)
        : catalog.subjects,
    [catalog.subjects, selectedCourseObj]
  );

  const courseSubjectCodes = useMemo(
    () => new Set(visibleSubjects.map((s) => s.code.toUpperCase())),
    [visibleSubjects]
  );

  const filteredPyqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.pyqs.filter((paper) => {
      if (courseFilter !== 'ALL' && !courseSubjectCodes.has(paper.subjectCode.toUpperCase())) {
        return false;
      }
      if (
        subjectFilter !== 'ALL' &&
        paper.subjectCode.toUpperCase() !== subjectFilter.toUpperCase()
      ) {
        return false;
      }
      if (sessionFilter !== 'ALL' && paper.examSession !== sessionFilter) {
        return false;
      }
      if (q) {
        return (
          paper.title.toLowerCase().includes(q) ||
          paper.subjectCode.toLowerCase().includes(q) ||
          String(paper.examYear).includes(q)
        );
      }
      return true;
    });
  }, [catalog.pyqs, courseFilter, courseSubjectCodes, subjectFilter, sessionFilter, query]);

  const totalPages = Math.max(1, Math.ceil(filteredPyqs.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedPyqs = useMemo(
    () => filteredPyqs.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filteredPyqs, safePage]
  );

  return (
    <div>
      <PageHeader
        hierarchy={{
          universityId: selectedCourseObj?.universityId ?? 'uni-aktu',
          courseId: selectedCourseObj?.id ?? 'course-aktu-btech',
          subjectCode: subjectFilter !== 'ALL' ? subjectFilter : null,
          sectionLabel: 'Previous-Year Papers',
        }}
        title={
          selectedCourseObj
            ? `${selectedCourseObj.shortName} — Exam Blueprints & PYQs`
            : 'Previous-Year Papers & Exam Blueprints'
        }
        description="Structured 70-mark Section A/B/C exam blueprints covering every indexed subject across AKTU B.Tech, Mumbai University B.E., Anna University B.E., and CBSE Class 12."
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            {!dndEnabled && (
              <button
                type="button"
                onClick={() => enableDnd('Solving Practice Exam Papers')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-[#0F172A] dark:text-slate-100 hover:border-[#1D4ED8] dark:hover:border-blue-400 transition-colors whitespace-nowrap"
              >
                <BellOff className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400" />
                <span>Exam Focus Mode</span>
              </button>
            )}
            <Link
              to="/contact?category=Resource%20Request"
              className="inline-flex items-center px-4 py-2.5 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-sm font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors whitespace-nowrap"
            >
              Request Subject Papers
            </Link>
          </div>
        }
      />

      <div
        className={`${
          dndEnabled ? 'max-w-[960px]' : 'max-w-[1200px]'
        } mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10`}
      >
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
              placeholder="Search by subject code, title, or year..."
              aria-label="Search PYQs"
              className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={courseFilter}
              onChange={(e) => {
                setCourseFilter(e.target.value);
                setSubjectFilter('ALL');
                setPage(1);
              }}
              aria-label="Filter PYQs by course"
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
              value={subjectFilter}
              onChange={(e) => {
                setSubjectFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter PYQs by subject"
              className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
            >
              <option value="ALL">All Subjects ({filteredPyqs.length})</option>
              {visibleSubjects.map((sub) => (
                <option key={sub.id} value={sub.code}>
                  {sub.code} — {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={sessionFilter}
              onChange={(e) => {
                setSessionFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter PYQs by session"
              className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
            >
              <option value="ALL">All Sessions</option>
              <option value="Odd Semester">Odd Semester</option>
              <option value="Even Semester">Even Semester</option>
            </select>
          </div>
        </div>

        <AdSlot slotId="pyq-top" />

        {paginatedPyqs.length === 0 ? (
          <EmptyState
            contextLabel="Verified Exam Archive"
            title="No papers match your active filter"
            description="Clear your course, session, or subject filter to explore all indexed 70-mark exam blueprints, or upload a new practice paper on any subject page."
            primaryAction={{ label: 'Explore Unit-Wise Syllabus', to: '/syllabus' }}
            secondaryAction={{
              label: 'Request Priority Subject',
              to: '/contact?category=Resource%20Request',
            }}
          />
        ) : (
          <>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              <span>
                Showing {paginatedPyqs.length} of {filteredPyqs.length} exam blueprints (Page{' '}
                {safePage} of {totalPages})
              </span>
              {(courseFilter !== 'ALL' ||
                subjectFilter !== 'ALL' ||
                sessionFilter !== 'ALL' ||
                query) && (
                <button
                  type="button"
                  onClick={() => {
                    setCourseFilter('ALL');
                    setSubjectFilter('ALL');
                    setSessionFilter('ALL');
                    setQuery('');
                    setPage(1);
                  }}
                  className="font-sans text-[#1D4ED8] dark:text-blue-400 font-medium hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            <div className="space-y-4">
              {paginatedPyqs.map((paper) => (
                <PyqPaperViewer key={paper.id} paper={paper} showSubjectLink />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="PYQs pagination"
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

        {/* Reference Structure */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
          <p className="text-xs font-medium text-[#5B21B6] dark:text-violet-400">
            Reference Structure
          </p>
          <h2 className="mt-1 text-xl font-bold text-[#0F172A] dark:text-slate-50">
            Standard 70-Mark End-Term Theory Blueprint Structure
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Every StudySphere original practice blueprint organizes theory preparation across three
            clear progressive sections (short concepts, analytical proofs/numericals, and unit-wise
            long answers) over a 3-hour window.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  <th className="py-3 pr-4 font-semibold">Section</th>
                  <th className="py-3 px-4 font-semibold">Question Format</th>
                  <th className="py-3 px-4 font-semibold">Attempt Scope</th>
                  <th className="py-3 pl-4 font-semibold text-right">Weightage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                <tr>
                  <td className="py-3.5 pr-4 font-semibold text-[#0F172A] dark:text-white">
                    Section A
                  </td>
                  <td className="py-3.5 px-4">Short conceptual answers across Units 1–5</td>
                  <td className="py-3.5 px-4">7 compulsory questions × 2 marks</td>
                  <td className="py-3.5 pl-4 text-right font-mono tabular-nums font-semibold">
                    14 Marks
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-semibold text-[#0F172A] dark:text-white">
                    Section B
                  </td>
                  <td className="py-3.5 px-4">Medium-length analytical or numerical questions</td>
                  <td className="py-3.5 px-4">Any 3 of 5 questions × 7 marks</td>
                  <td className="py-3.5 pl-4 text-right font-mono tabular-nums font-semibold">
                    21 Marks
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-semibold text-[#0F172A] dark:text-white">
                    Section C
                  </td>
                  <td className="py-3.5 px-4">
                    In-depth unit-wise questions (internal choice per unit)
                  </td>
                  <td className="py-3.5 px-4">5 questions (1 per unit) × 7 marks</td>
                  <td className="py-3.5 pl-4 text-right font-mono tabular-nums font-semibold">
                    35 Marks
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Note: Specific university or board examination schemes (e.g., 80-mark Mumbai University
            or 100-mark Anna University papers) may vary. Always cross-verify with your official
            examination schedule.
          </p>
        </section>
      </div>
    </div>
  );
}
