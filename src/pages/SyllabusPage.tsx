import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Printer, Search } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { useCatalog } from '../lib/catalogContext';
import { useHierarchy } from '../lib/hierarchyContext';
import { Link, useRouter } from '../lib/router';

export function SyllabusPage() {
  const { catalog } = useCatalog();
  const { updateTrail } = useHierarchy();
  const { getParam, search } = useRouter();

  const initialCourseId = (() => {
    const paramCourse = getParam('course');
    if (paramCourse && catalog.courses.some((c) => c.id === paramCourse)) return paramCourse;
    const paramBranch = getParam('branch');
    if (paramBranch) {
      const b = catalog.branches.find((br) => br.code.toLowerCase() === paramBranch.toLowerCase());
      if (b) return b.courseId;
    }
    return 'course-aktu-btech';
  })();

  const [courseId, setCourseId] = useState<string>(initialCourseId);
  const [branchId, setBranchId] = useState<string>(() => {
    const paramBranch = getParam('branch');
    if (paramBranch) {
      const b = catalog.branches.find((br) => br.code.toLowerCase() === paramBranch.toLowerCase());
      if (b) return b.id;
    }
    return catalog.branches.find((b) => b.courseId === initialCourseId)?.id ?? 'br-cse';
  });
  const [semester, setSemester] = useState<number>(() => {
    const paramSem = Number(getParam('semester'));
    return Number.isInteger(paramSem) && paramSem >= 1 ? paramSem : 3;
  });
  const [topicSearch, setTopicSearch] = useState<string>('');
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('');

  useEffect(() => {
    const paramCourse = getParam('course');
    const paramBranch = getParam('branch');
    const paramSem = getParam('semester');
    let nextCourse = courseId;

    if (paramCourse && catalog.courses.some((c) => c.id === paramCourse)) {
      nextCourse = paramCourse;
      setCourseId(paramCourse);
    }
    if (paramBranch) {
      const b = catalog.branches.find((br) => br.code.toLowerCase() === paramBranch.toLowerCase());
      if (b) {
        nextCourse = b.courseId;
        setCourseId(b.courseId);
        setBranchId(b.id);
      }
    } else if (paramCourse) {
      const firstBranch = catalog.branches.find((b) => b.courseId === nextCourse);
      if (firstBranch) setBranchId(firstBranch.id);
    }

    if (paramSem && Number.isInteger(Number(paramSem))) {
      setSemester(Number(paramSem));
    }
  }, [search, getParam, catalog.courses, catalog.branches]);

  const activeCourse =
    catalog.courses.find((c) => c.id === courseId) ?? catalog.courses[0];
  const courseBranches = useMemo(
    () => catalog.branches.filter((b) => b.courseId === activeCourse?.id),
    [catalog.branches, activeCourse]
  );
  const activeBranch =
    courseBranches.find((b) => b.id === branchId) ?? courseBranches[0];
  const activeUni = activeCourse
    ? catalog.universities.find((u) => u.id === activeCourse.universityId)
    : undefined;

  // Ensure semester points to a valid populated term when switching course/branch
  useEffect(() => {
    if (!activeBranch) return;
    const hasCurrent = catalog.subjects.some(
      (s) => s.branchIds.includes(activeBranch.id) && s.semester === semester
    );
    if (!hasCurrent) {
      const firstMatch = catalog.subjects.find((s) => s.branchIds.includes(activeBranch.id));
      if (firstMatch) setSemester(firstMatch.semester);
    }
  }, [activeBranch, catalog.subjects, semester]);

  const termLabel = activeCourse?.degreeLevel === 'Secondary' ? 'Term' : 'Semester';
  const termNumbers = useMemo(
    () => Array.from({ length: activeCourse?.totalSemesters ?? 8 }, (_, i) => i + 1),
    [activeCourse]
  );

  const subjects = useMemo(() => {
    const q = topicSearch.trim().toLowerCase();
    if (!activeBranch) return [];
    return catalog.subjects.filter((s) => {
      if (!s.branchIds.includes(activeBranch.id)) return false;
      if (s.semester !== semester) return false;
      if (q) {
        return (
          s.code.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.units.some(
            (u) =>
              u.title.toLowerCase().includes(q) ||
              u.topics.some((t) => t.title.toLowerCase().includes(q))
          )
        );
      }
      return true;
    });
  }, [catalog.subjects, activeBranch, semester, topicSearch]);

  const activeSubject = useMemo(() => {
    const match = subjects.find((s) => s.code === selectedSubjectCode);
    return match ?? subjects[0] ?? null;
  }, [subjects, selectedSubjectCode]);

  useEffect(() => {
    updateTrail({
      universityId: activeUni?.id ?? 'uni-aktu',
      courseId: activeCourse?.id ?? 'course-aktu-btech',
      branchCode: activeBranch?.code ?? null,
      semester,
      subjectCode: activeSubject?.code ?? null,
    });
  }, [activeUni, activeCourse, activeBranch, semester, activeSubject, updateTrail]);

  return (
    <div>
      <PageHeader
        hierarchy={{
          universityId: activeUni?.id ?? 'uni-aktu',
          courseId: activeCourse?.id ?? 'course-aktu-btech',
          branchCode: activeBranch?.code ?? null,
          semester,
          subjectCode: activeSubject?.code ?? null,
          sectionLabel: 'Syllabus',
        }}
        title="Syllabus Explorer"
        description="Inspect unit-by-unit syllabus outlines across all 4 courses — AKTU B.Tech, Mumbai University B.E., Anna University B.E., and CBSE Class 12. Filter topics directly or print a clean study sheet."
        actions={
          <button
            type="button"
            onClick={() => window.print()}
            className="no-print inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
          >
            <Printer className="w-4 h-4" />
            <span>Print Active Syllabus</span>
          </button>
        }
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="no-print bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4">
              <label
                htmlFor="syl-course"
                className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5"
              >
                01. Course / Programme
              </label>
              <select
                id="syl-course"
                value={activeCourse?.id ?? ''}
                onChange={(e) => {
                  const nextCourseId = e.target.value;
                  setCourseId(nextCourseId);
                  setSelectedSubjectCode('');
                  const nextBranch = catalog.branches.find((b) => b.courseId === nextCourseId);
                  if (nextBranch) {
                    setBranchId(nextBranch.id);
                    const firstSub = catalog.subjects.find((s) =>
                      s.branchIds.includes(nextBranch.id)
                    );
                    if (firstSub) setSemester(firstSub.semester);
                  }
                }}
                className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
              >
                {catalog.courses.map((c) => {
                  const u = catalog.universities.find((uni) => uni.id === c.universityId);
                  return (
                    <option key={c.id} value={c.id}>
                      {u?.shortName} — {c.shortName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="md:col-span-4">
              <label
                htmlFor="syl-branch"
                className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5"
              >
                02. {activeCourse?.degreeLevel === 'Secondary' ? 'Stream' : 'Branch'}
              </label>
              <select
                id="syl-branch"
                value={activeBranch?.id ?? ''}
                onChange={(e) => {
                  const nextBranchId = e.target.value;
                  setBranchId(nextBranchId);
                  setSelectedSubjectCode('');
                  const firstMatch = catalog.subjects.find((s) =>
                    s.branchIds.includes(nextBranchId)
                  );
                  if (
                    firstMatch &&
                    !catalog.subjects.some(
                      (s) => s.branchIds.includes(nextBranchId) && s.semester === semester
                    )
                  ) {
                    setSemester(firstMatch.semester);
                  }
                }}
                className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
              >
                {courseBranches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.code} — {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4">
              <label
                htmlFor="syl-search"
                className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5"
              >
                03. Filter Topics
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="syl-search"
                  type="search"
                  value={topicSearch}
                  onChange={(e) => setTopicSearch(e.target.value)}
                  placeholder="Search a topic (e.g. AVL, Optics, OS)..."
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div
            role="tablist"
            aria-label={`${termLabel} selector`}
            className="flex items-center gap-1.5 overflow-x-auto pt-1"
          >
            {termNumbers.map((sem) => {
              const active = semester === sem;
              return (
                <button
                  key={sem}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setSemester(sem);
                    setSelectedSubjectCode('');
                  }}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-[#0F172A] dark:bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                  }`}
                >
                  {termLabel} {sem}
                </button>
              );
            })}
          </div>
        </div>

        {subjects.length === 0 ? (
          <EmptyState
            contextLabel={`${activeBranch?.code ?? 'Curriculum'} · ${termLabel} ${semester}`}
            title="No subjects match this syllabus selection"
            description="Either this term has not been indexed yet or your keyword filter narrowed out all subjects. Try another term or open the Course Hub."
            primaryAction={{
              label: `Open ${activeCourse?.shortName ?? 'Course'} Hub`,
              to: `/courses/${encodeURIComponent(activeCourse?.id ?? 'course-aktu-btech')}`,
            }}
            secondaryAction={{
              label: 'Request Curriculum Addition',
              to: '/contact?category=Resource%20Request',
            }}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <aside className="no-print lg:col-span-4 space-y-2.5">
              {subjects.map((sub) => {
                const isSelected = activeSubject?.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSubjectCode(sub.code)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors ${
                      isSelected
                        ? 'bg-[#EFF6FF]/70 dark:bg-blue-950/50 border-[#1D4ED8] dark:border-blue-500'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <p className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-blue-400">
                      {sub.code} · {sub.credits} Credits
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#0F172A] dark:text-slate-100">
                      {sub.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                      {sub.units.length} Units
                    </p>
                  </button>
                );
              })}
            </aside>

            {activeSubject && (
              <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {activeUni?.shortName} · {activeCourse?.shortName} · {activeBranch?.code} ·{' '}
                      {termLabel} {activeSubject.semester} · {activeSubject.code}
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-[#0F172A] dark:text-slate-50">
                      {activeSubject.name}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      {activeSubject.summary}
                    </p>
                  </div>

                  <div className="no-print flex items-center gap-3">
                    <Link
                      to={`/subjects/${encodeURIComponent(activeSubject.code)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline whitespace-nowrap"
                    >
                      <span>Open Notes & PYQs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="mt-6 divide-y divide-slate-200 dark:divide-slate-800">
                  {activeSubject.units.map((unit) => (
                    <div key={unit.id} className="py-5 first:pt-0 last:pb-0">
                      <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100">
                        <span className="font-mono text-[#1D4ED8] dark:text-blue-400 mr-2">
                          Unit {unit.unitNumber}.
                        </span>
                        {unit.title}
                      </h3>
                      <ul className="mt-2.5 space-y-2 text-sm text-slate-700 dark:text-slate-200 pl-1">
                        {unit.topics.map((topic, idx) => (
                          <li key={topic.id} className="flex items-start gap-3">
                            <span className="font-mono text-xs text-slate-400 dark:text-slate-500 mt-0.5 tabular-nums">
                              {unit.unitNumber}.{idx + 1}
                            </span>
                            <span>{topic.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
