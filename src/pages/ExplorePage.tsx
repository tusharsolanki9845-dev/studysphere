import { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { useCatalog } from '../lib/catalogContext';
import { useHierarchy } from '../lib/hierarchyContext';
import { Link, useRouter } from '../lib/router';

export function ExplorePage() {
  const { catalog } = useCatalog();
  const { updateTrail } = useHierarchy();
  const { getParam } = useRouter();

  const paramCourse = getParam('course');
  const paramUni = getParam('university');
  const initialCourse = paramCourse
    ? catalog.courses.find((c) => c.id === paramCourse)
    : undefined;
  const initialUniId =
    initialCourse?.universityId ??
    (paramUni && catalog.universities.some((u) => u.id === paramUni) ? paramUni : 'uni-aktu');

  const [selectedUniId, setSelectedUniId] = useState<string>(initialUniId);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourse?.id ??
      catalog.courses.find((c) => c.universityId === initialUniId)?.id ??
      'course-aktu-btech'
  );
  const [selectedBranchId, setSelectedBranchId] = useState<string>('br-cse');
  const [selectedSemester, setSelectedSemester] = useState<number>(3);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('sub-bcs301');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('u-bcs301-1');

  const selectedUni = catalog.universities.find((u) => u.id === selectedUniId);
  const availableCourses = useMemo(
    () => catalog.courses.filter((c) => c.universityId === selectedUniId),
    [catalog.courses, selectedUniId]
  );
  const activeCourse =
    availableCourses.find((c) => c.id === selectedCourseId) ?? availableCourses[0] ?? null;

  const availableBranches = useMemo(
    () => (activeCourse ? catalog.branches.filter((b) => b.courseId === activeCourse.id) : []),
    [catalog.branches, activeCourse]
  );
  const activeBranch =
    availableBranches.find((b) => b.id === selectedBranchId) ?? availableBranches[0] ?? null;

  const termNumbers = useMemo(() => {
    const count = activeCourse?.totalSemesters ?? 8;
    return Array.from({ length: count }, (_, idx) => idx + 1);
  }, [activeCourse]);

  const termLabel = activeCourse?.degreeLevel === 'Secondary' ? 'Term' : 'Semester';
  const shortTermLabel = activeCourse?.degreeLevel === 'Secondary' ? 'Term' : 'Sem';

  // Ensure a valid populated semester/term is automatically selected when switching course/branch
  useEffect(() => {
    if (!activeCourse || !activeBranch) return;
    const hasCurrent = catalog.subjects.some(
      (s) =>
        s.courseId === activeCourse.id &&
        s.branchIds.includes(activeBranch.id) &&
        s.semester === selectedSemester
    );
    if (!hasCurrent) {
      const firstMatch = catalog.subjects.find(
        (s) => s.courseId === activeCourse.id && s.branchIds.includes(activeBranch.id)
      );
      if (firstMatch) {
        setSelectedSemester(firstMatch.semester);
      } else if (selectedSemester > activeCourse.totalSemesters) {
        setSelectedSemester(1);
      }
    }
  }, [activeCourse, activeBranch, catalog.subjects, selectedSemester]);

  const availableSubjects = useMemo(() => {
    if (!activeCourse || !activeBranch) return [];
    return catalog.subjects.filter(
      (s) =>
        s.courseId === activeCourse.id &&
        s.branchIds.includes(activeBranch.id) &&
        s.semester === selectedSemester
    );
  }, [catalog.subjects, activeCourse, activeBranch, selectedSemester]);

  const activeSubject =
    availableSubjects.find((s) => s.id === selectedSubjectId) ?? availableSubjects[0] ?? null;

  const activeUnit =
    activeSubject?.units.find((u) => u.id === selectedUnitId) ?? activeSubject?.units[0] ?? null;

  useEffect(() => {
    updateTrail({
      universityId: selectedUniId,
      courseId: activeCourse?.id ?? 'course-aktu-btech',
      branchCode: activeBranch?.code ?? null,
      semester: activeCourse ? selectedSemester : null,
      subjectCode: activeSubject?.code ?? null,
    });
  }, [selectedUniId, activeCourse, activeBranch, selectedSemester, activeSubject, updateTrail]);

  return (
    <div>
      <PageHeader
        hierarchy={{
          universityId: selectedUniId,
          courseId: activeCourse?.id,
          branchCode: activeBranch?.code ?? null,
          semester: activeCourse ? selectedSemester : null,
          subjectCode: activeSubject?.code ?? null,
          unitNumber: activeUnit?.unitNumber ?? null,
        }}
        title="Academic Hierarchy Explorer"
        description="Navigate all 4 institutions through one consistent seven-level structure: University → Course → Branch → Semester → Subject → Unit → Topic."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Step 1-4 Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Level 1: University */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <p className="text-xs font-mono text-[#1D4ED8] dark:text-blue-400 mb-1">
              01. University / Board
            </p>
            <h2 className="text-sm font-semibold text-[#0F172A] dark:text-slate-100 mb-3">
              Select Institution
            </h2>
            <div className="space-y-1.5">
              {catalog.universities.map((uni) => {
                const active = uni.id === selectedUniId;
                return (
                  <button
                    key={uni.id}
                    type="button"
                    onClick={() => {
                      setSelectedUniId(uni.id);
                      const firstCourse = catalog.courses.find((c) => c.universityId === uni.id);
                      if (firstCourse) {
                        setSelectedCourseId(firstCourse.id);
                        const firstBranch = catalog.branches.find(
                          (b) => b.courseId === firstCourse.id
                        );
                        if (firstBranch) setSelectedBranchId(firstBranch.id);
                      }
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors ${
                      active
                        ? 'bg-[#0F172A] dark:bg-blue-600 text-white font-medium'
                        : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate">{uni.shortName}</span>
                      <span
                        className={
                          active
                            ? 'text-blue-100'
                            : 'text-slate-500 dark:text-slate-400'
                        }
                      >
                        {uni.status === 'active' ? 'Active' : 'Planned'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level 2: Course */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <p className="text-xs font-mono text-[#1D4ED8] dark:text-blue-400 mb-1">02. Course</p>
            <h2 className="text-sm font-semibold text-[#0F172A] dark:text-slate-100 mb-3">
              Degree / Track
            </h2>
            {availableCourses.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Curriculum schema is ready for {selectedUni?.shortName}.
              </p>
            ) : (
              <div className="space-y-1.5">
                {availableCourses.map((course) => {
                  const active = activeCourse?.id === course.id;
                  return (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => {
                        setSelectedCourseId(course.id);
                        const firstBranch = catalog.branches.find((b) => b.courseId === course.id);
                        if (firstBranch) setSelectedBranchId(firstBranch.id);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors ${
                        active
                          ? 'bg-[#0F172A] dark:bg-blue-600 text-white font-medium'
                          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <p>{course.name}</p>
                      <p
                        className={
                          active
                            ? 'text-blue-100 mt-0.5'
                            : 'text-slate-500 dark:text-slate-400 mt-0.5'
                        }
                      >
                        {course.durationYears} {course.durationYears === 1 ? 'Year' : 'Years'} ·{' '}
                        {course.totalSemesters}{' '}
                        {course.degreeLevel === 'Secondary' ? 'Terms' : 'Semesters'}
                      </p>
                    </button>
                  );
                })}
                {activeCourse && (
                  <Link
                    to={`/courses/${encodeURIComponent(activeCourse.id)}`}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline pt-1"
                  >
                    <span>Open {activeCourse.shortName} Hub</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Level 3: Branch */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <p className="text-xs font-mono text-[#1D4ED8] dark:text-blue-400 mb-1">
              03. {activeCourse?.degreeLevel === 'Secondary' ? 'Stream' : 'Branch'}
            </p>
            <h2 className="text-sm font-semibold text-[#0F172A] dark:text-slate-100 mb-3">
              Specialization
            </h2>
            {availableBranches.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select an active course to view branches.
              </p>
            ) : (
              <div className="space-y-1.5 max-h-[210px] overflow-y-auto pr-1">
                {availableBranches.map((branch) => {
                  const active = activeBranch?.id === branch.id;
                  return (
                    <button
                      key={branch.id}
                      type="button"
                      onClick={() => setSelectedBranchId(branch.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                        active
                          ? 'bg-[#1D4ED8] dark:bg-blue-600 text-white font-medium'
                          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-mono mr-1.5">{branch.code}</span>
                      <span>{branch.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Level 4: Semester / Term */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <p className="text-xs font-mono text-[#1D4ED8] dark:text-blue-400 mb-1">
              04. {termLabel}
            </p>
            <h2 className="text-sm font-semibold text-[#0F172A] dark:text-slate-100 mb-3">
              Term Selection
            </h2>
            <div className="grid grid-cols-2 gap-1.5">
              {termNumbers.map((sem) => {
                const active = selectedSemester === sem;
                const hasItems =
                  activeCourse &&
                  activeBranch &&
                  catalog.subjects.some(
                    (s) =>
                      s.courseId === activeCourse.id &&
                      s.branchIds.includes(activeBranch.id) &&
                      s.semester === sem
                  );
                return (
                  <button
                    key={sem}
                    type="button"
                    disabled={!activeBranch}
                    onClick={() => setSelectedSemester(sem)}
                    className={`px-3 py-2 rounded-lg text-xs font-mono transition-colors disabled:opacity-40 ${
                      active
                        ? 'bg-[#0F172A] dark:bg-blue-600 text-white font-medium'
                        : hasItems
                          ? 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                          : 'bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {shortTermLabel} {sem}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Levels 5, 6, 7: Subject → Unit → Topic */}
        {!activeCourse ? (
          <EmptyState
            contextLabel={`${selectedUni?.name} · Planned`}
            title="Institution structure ready for onboarding"
            description="Select one of our active institutions to explore complete subjects, study notes, and PYQ blueprints."
            primaryAction={{ label: 'View All Courses', to: '/courses' }}
            secondaryAction={{ label: 'Request Institution Priority', to: '/contact' }}
          />
        ) : availableSubjects.length === 0 ? (
          <EmptyState
            contextLabel={`${activeBranch?.code} · ${termLabel} ${selectedSemester}`}
            title={`No subjects indexed for ${activeBranch?.code} ${termLabel} ${selectedSemester} yet`}
            description="We only publish verified subject structures. Pick another populated term or open the Course Hub to view all available subjects for this course."
            primaryAction={{
              label: `Open ${activeCourse.shortName} Hub`,
              to: `/courses/${encodeURIComponent(activeCourse.id)}`,
            }}
            secondaryAction={{
              label: 'Request This Semester',
              to: '/contact?category=Resource%20Request',
            }}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Level 5: Subject */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
              <p className="text-xs font-mono text-[#5B21B6] dark:text-violet-400 mb-1">
                05. Subject
              </p>
              <h2 className="text-sm font-semibold text-[#0F172A] dark:text-slate-100 mb-3">
                {termLabel} {selectedSemester} Subjects
              </h2>
              <div className="space-y-2">
                {availableSubjects.map((sub) => {
                  const active = activeSubject?.id === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => {
                        setSelectedSubjectId(sub.id);
                        if (sub.units[0]) setSelectedUnitId(sub.units[0].id);
                      }}
                      className={`w-full text-left p-3.5 rounded-lg border transition-colors ${
                        active
                          ? 'bg-[#EFF6FF]/70 dark:bg-blue-950/50 border-[#1D4ED8] dark:border-blue-500'
                          : 'bg-slate-50/70 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-100/60 dark:hover:bg-slate-800'
                      }`}
                    >
                      <p className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-blue-400">
                        {sub.code} · {sub.credits} Credits
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-[#0F172A] dark:text-slate-100">
                        {sub.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Level 6: Unit */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
              <p className="text-xs font-mono text-[#5B21B6] dark:text-violet-400 mb-1">06. Unit</p>
              <h2 className="text-sm font-semibold text-[#0F172A] dark:text-slate-100 mb-3">
                {activeSubject ? `${activeSubject.code} Units` : 'Units'}
              </h2>
              {activeSubject && activeSubject.units.length > 0 ? (
                <div className="space-y-2">
                  {activeSubject.units.map((unit) => {
                    const active = activeUnit?.id === unit.id;
                    return (
                      <button
                        key={unit.id}
                        type="button"
                        onClick={() => setSelectedUnitId(unit.id)}
                        className={`w-full text-left p-3.5 rounded-lg border transition-colors ${
                          active
                            ? 'bg-[#0F172A] dark:bg-blue-600 text-white border-[#0F172A] dark:border-blue-600'
                            : 'bg-slate-50/70 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800'
                        }`}
                      >
                        <p
                          className={`text-xs font-mono ${
                            active ? 'text-blue-100' : 'text-[#1D4ED8] dark:text-blue-400'
                          }`}
                        >
                          Unit {unit.unitNumber} · {unit.topics.length} Topics
                        </p>
                        <p className="mt-0.5 text-sm font-medium">{unit.title}</p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No units added for this subject yet.
                </p>
              )}
            </div>

            {/* Level 7: Topic */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono text-[#5B21B6] dark:text-violet-400 mb-1">
                  07. Topic
                </p>
                <h2 className="text-sm font-semibold text-[#0F172A] dark:text-slate-100 mb-3">
                  {activeUnit ? `Unit ${activeUnit.unitNumber}: ${activeUnit.title}` : 'Topics'}
                </h2>
                {activeUnit && activeUnit.topics.length > 0 ? (
                  <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-200">
                    {activeUnit.topics.map((topic, idx) => (
                      <li
                        key={topic.id}
                        className="pb-2.5 border-b border-slate-100 dark:border-slate-800 last:border-b-0 last:pb-0 flex items-start gap-2.5"
                      >
                        <span className="font-mono text-xs text-slate-400 dark:text-slate-500 mt-0.5 tabular-nums">
                          {activeUnit.unitNumber}.{idx + 1}
                        </span>
                        <span className="leading-snug">{topic.title}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    No topics listed for this unit.
                  </p>
                )}
              </div>

              {activeSubject && (
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
                  <Link
                    to={`/subjects/${encodeURIComponent(activeSubject.code)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:text-[#1E40AF] dark:hover:text-blue-300"
                  >
                    <span>Open Full Subject View (Notes + PYQs)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
