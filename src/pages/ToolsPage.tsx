import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BellOff, Pause, Play, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { useCatalog } from '../lib/catalogContext';
import { useFocusMode } from '../lib/focusContext';
import { Link, useRouter } from '../lib/router';

type ToolTab = 'sgpa' | 'attendance' | 'timer' | 'checklist';

interface GradeRow {
  id: string;
  label: string;
  credits: number;
  gradePoint: number;
}

interface SemesterCgpaRow {
  id: string;
  semester: string;
  credits: number;
  sgpa: number;
}

const TEN_POINT_GRADES = [
  { label: 'O / A+ (Outstanding · 10)', value: 10 },
  { label: 'A+ / A (Excellent · 9)', value: 9 },
  { label: 'A / B+ (Very Good · 8)', value: 8 },
  { label: 'B+ / B (Good · 7)', value: 7 },
  { label: 'B / C (Above Average · 6)', value: 6 },
  { label: 'C / D (Average · 5)', value: 5 },
  { label: 'F / RA (Fail · 0)', value: 0 },
];

const CHECKLIST_STORAGE_KEY = 'studysphere_unit_checklist_v1';

function loadChecklist(): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(CHECKLIST_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function ToolsPage() {
  const { catalog } = useCatalog();
  const { getParam, search } = useRouter();
  const {
    dndEnabled,
    enableDnd,
    disableDnd,
    presetMinutes,
    running,
    focusLabel,
    completedSessions,
    formattedTime,
    setFocusLabel,
    selectPreset,
    toggleRunning,
    resetTimer,
  } = useFocusMode();

  const initialTab = (getParam('tab') as ToolTab | null) ?? 'sgpa';
  const validTab: ToolTab = ['sgpa', 'attendance', 'timer', 'checklist'].includes(initialTab)
    ? initialTab
    : 'sgpa';
  const [activeTab, setActiveTab] = useState<ToolTab>(validTab);

  // Equal Course Context across all Study Tools
  const initialCourseId = (() => {
    const paramCourse = getParam('course');
    if (paramCourse && catalog.courses.some((c) => c.id === paramCourse)) return paramCourse;
    const paramSub = getParam('subject');
    if (paramSub) {
      const sub = catalog.subjects.find((s) => s.code.toUpperCase() === paramSub.toUpperCase());
      if (sub) return sub.courseId;
    }
    return catalog.courses[0]?.id ?? 'course-aktu-btech';
  })();

  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId);

  useEffect(() => {
    const t = getParam('tab') as ToolTab | null;
    if (t && ['sgpa', 'attendance', 'timer', 'checklist'].includes(t)) {
      setActiveTab(t);
    }
    const c = getParam('course');
    if (c && catalog.courses.some((course) => course.id === c)) {
      setSelectedCourseId(c);
    }
  }, [search, getParam, catalog.courses]);

  const activeCourse = useMemo(
    () => catalog.courses.find((c) => c.id === selectedCourseId) ?? catalog.courses[0],
    [catalog.courses, selectedCourseId]
  );

  const activeUni = useMemo(
    () => catalog.universities.find((u) => u.id === activeCourse?.universityId),
    [catalog.universities, activeCourse]
  );

  const courseSubjects = useMemo(
    () => catalog.subjects.filter((s) => s.courseId === activeCourse?.id),
    [catalog.subjects, activeCourse]
  );

  const availableSemesters = useMemo(() => {
    const sems = Array.from(new Set(courseSubjects.map((s) => s.semester))).sort((a, b) => a - b);
    return sems.length > 0 ? sems : [1];
  }, [courseSubjects]);

  const termLabel = activeCourse?.degreeLevel === 'Secondary' ? 'Term' : 'Sem';

  // 1. SGPA & CGPA Calculator State
  const [rows, setRows] = useState<GradeRow[]>(() => {
    const defaults = catalog.subjects
      .filter((s) => s.courseId === initialCourseId)
      .slice(0, 4);
    if (defaults.length > 0) {
      return defaults.map((sub, idx) => ({
        id: `init-${idx}-${sub.code}`,
        label: `${sub.code} — ${sub.name}`,
        credits: sub.credits,
        gradePoint: 9,
      }));
    }
    return [
      { id: 'r1', label: 'BCS301 — Data Structures', credits: 4, gradePoint: 9 },
      { id: 'r2', label: 'BCS302 — Computer Organization', credits: 4, gradePoint: 8 },
      { id: 'r3', label: 'BCS303 — Discrete Structures', credits: 3, gradePoint: 9 },
    ];
  });

  const [cgpaRows, setCgpaRows] = useState<SemesterCgpaRow[]>([
    { id: 'cg-1', semester: 'Prior Term 1', credits: 20, sgpa: 8.2 },
    { id: 'cg-2', semester: 'Prior Term 2', credits: 20, sgpa: 8.5 },
  ]);

  const loadSemesterPreset = (sem: number, targetCourseId = activeCourse?.id) => {
    const semSubjects = catalog.subjects.filter(
      (s) => s.courseId === targetCourseId && s.semester === sem
    );
    if (semSubjects.length === 0) return;
    setRows(
      semSubjects.slice(0, 6).map((sub, idx) => ({
        id: `preset-${targetCourseId}-${sem}-${idx}-${Date.now()}`,
        label: `${sub.code} — ${sub.name}`,
        credits: sub.credits,
        gradePoint: 8,
      }))
    );
  };

  const handleCourseChange = (nextCourseId: string) => {
    setSelectedCourseId(nextCourseId);
    const nextSubs = catalog.subjects.filter((s) => s.courseId === nextCourseId);
    if (nextSubs.length > 0) {
      const firstSem = nextSubs[0].semester;
      loadSemesterPreset(firstSem, nextCourseId);
      setChecklistSubjectCode(nextSubs[0].code);
    }
  };

  const sgpaStats = useMemo(() => {
    const totalCredits = rows.reduce((sum, r) => sum + Math.max(0, r.credits), 0);
    const weightedPoints = rows.reduce(
      (sum, r) => sum + Math.max(0, r.credits) * r.gradePoint,
      0
    );
    const sgpa = totalCredits > 0 ? weightedPoints / totalCredits : 0;
    const approxPercentage =
      activeCourse?.degreeLevel === 'Secondary'
        ? sgpa > 0
          ? Math.max(0, Math.min(100, sgpa * 9.5))
          : 0
        : sgpa > 0
          ? Math.max(0, Math.min(100, sgpa * 10 - 7.5))
          : 0;
    return { totalCredits, weightedPoints, sgpa, approxPercentage };
  }, [rows, activeCourse]);

  const cgpaStats = useMemo(() => {
    const pastCredits = cgpaRows.reduce((sum, r) => sum + Math.max(0, r.credits), 0);
    const pastWeighted = cgpaRows.reduce(
      (sum, r) => sum + Math.max(0, r.credits) * Math.max(0, Math.min(10, r.sgpa)),
      0
    );
    const combinedCredits = pastCredits + sgpaStats.totalCredits;
    const combinedWeighted = pastWeighted + sgpaStats.weightedPoints;
    const cgpa = combinedCredits > 0 ? combinedWeighted / combinedCredits : 0;
    return { combinedCredits, cgpa };
  }, [cgpaRows, sgpaStats]);

  // 2. Attendance Calculator State
  const [attended, setAttended] = useState<number>(34);
  const [conducted, setConducted] = useState<number>(48);
  const [targetPct, setTargetPct] = useState<number>(75);

  const attendanceStats = useMemo(() => {
    const safeConducted = Math.max(0, conducted);
    const safeAttended = Math.max(0, Math.min(attended, safeConducted));
    const currentPct = safeConducted > 0 ? (safeAttended / safeConducted) * 100 : 0;
    const targetFraction = targetPct / 100;

    let classesNeeded = 0;
    let safeToMiss = 0;

    if (safeConducted > 0) {
      if (currentPct < targetPct && targetFraction < 1) {
        classesNeeded = Math.max(
          0,
          Math.ceil((targetFraction * safeConducted - safeAttended) / (1 - targetFraction))
        );
      } else if (targetFraction > 0) {
        safeToMiss = Math.max(
          0,
          Math.floor(safeAttended / targetFraction - safeConducted)
        );
      }
    }

    return { safeConducted, safeAttended, currentPct, classesNeeded, safeToMiss };
  }, [attended, conducted, targetPct]);

  // 4. Unit Revision Checklist State
  const initialSubject =
    getParam('subject') ??
    catalog.subjects.find((s) => s.courseId === initialCourseId)?.code ??
    catalog.subjects[0]?.code ??
    'BCS301';
  const [checklistSubjectCode, setChecklistSubjectCode] = useState<string>(initialSubject);
  const [checkedTopics, setCheckedTopics] = useState<Record<string, boolean>>(() =>
    typeof window !== 'undefined' ? loadChecklist() : {}
  );

  const checklistSubject = useMemo(
    () =>
      courseSubjects.find(
        (s) => s.code.toUpperCase() === checklistSubjectCode.toUpperCase()
      ) ??
      catalog.subjects.find(
        (s) => s.code.toUpperCase() === checklistSubjectCode.toUpperCase()
      ) ??
      courseSubjects[0] ??
      catalog.subjects[0],
    [courseSubjects, catalog.subjects, checklistSubjectCode]
  );

  const toggleTopic = (topicId: string) => {
    setCheckedTopics((prev) => {
      const next = { ...prev, [topicId]: !prev[topicId] };
      try {
        window.localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota issues
      }
      return next;
    });
  };

  const checklistProgress = useMemo(() => {
    if (!checklistSubject) return { done: 0, total: 0, pct: 0 };
    const allTopics = checklistSubject.units.flatMap((u) => u.topics);
    const total = allTopics.length;
    const done = allTopics.filter((t) => checkedTopics[t.id]).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { done, total, pct };
  }, [checklistSubject, checkedTopics]);

  const toolLabels: Record<ToolTab, string> = {
    sgpa: 'SGPA / CGPA Calculator',
    attendance: '75% Attendance Planner',
    timer: 'Exam Focus Timer & DND',
    checklist: 'Unit Revision Checklist',
  };

  const fieldCls =
    'w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none';

  return (
    <div>
      <PageHeader
        hierarchy={
          activeTab === 'checklist' && checklistSubject
            ? {
                universityId: checklistSubject.universityId,
                courseId: checklistSubject.courseId,
                semester: checklistSubject.semester,
                subjectCode: checklistSubject.code,
                sectionLabel: 'Revision Checklist',
              }
            : activeCourse
              ? {
                  universityId: activeCourse.universityId,
                  courseId: activeCourse.id,
                  sectionLabel: toolLabels[activeTab],
                }
              : undefined
        }
        title="Academic Study Tools"
        description="Free, browser-local utilities configured equally for AKTU B.Tech, Mumbai University B.E., Anna University B.E., and CBSE Class 12. Zero student login or cloud fees."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Course Context Bar + Tool Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Study tools"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/70 dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-xl w-fit"
          >
            {[
              { id: 'sgpa', label: 'SGPA / CGPA Calculator' },
              { id: 'attendance', label: '75% Attendance Planner' },
              { id: 'timer', label: 'Focus Timer & DND' },
              { id: 'checklist', label: 'Unit Revision Checklist' },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id as ToolTab)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-white dark:bg-blue-600 text-[#0F172A] dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5">
            <label
              htmlFor="tools-course-select"
              className="text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap"
            >
              Active Course:
            </label>
            <select
              id="tools-course-select"
              value={activeCourse?.id ?? ''}
              onChange={(e) => handleCourseChange(e.target.value)}
              className="h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-medium text-[#0F172A] dark:text-slate-100 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
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
        </div>

        {/* TOOL 1: SGPA & CGPA Calculator */}
        {activeTab === 'sgpa' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-[#0F172A] dark:text-slate-50">
                      {activeUni?.shortName} {activeCourse?.shortName} — 10-Point Grade Calculator
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Load an indexed {activeCourse?.shortName} preset below or add custom subjects,
                      credits, and grade points.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setRows((prev) => [
                        ...prev,
                        {
                          id: `r-${Date.now()}`,
                          label: `Subject ${prev.length + 1}`,
                          credits: 3,
                          gradePoint: 8,
                        },
                      ])
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-xs font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Subject</span>
                  </button>
                </div>

                {/* Quick Course Semester/Term Loader */}
                <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">
                    Load {activeCourse?.shortName} subjects:
                  </span>
                  {availableSemesters.map((sem) => (
                    <button
                      key={sem}
                      type="button"
                      onClick={() => loadSemesterPreset(sem)}
                      className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-200 hover:bg-[#EFF6FF] dark:hover:bg-blue-950/70 hover:text-[#1D4ED8] dark:hover:text-blue-300 transition-colors"
                    >
                      {termLabel} {sem}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {rows.map((row) => (
                    <div
                      key={row.id}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pb-3 border-b border-slate-100 dark:border-slate-800 last:border-b-0 last:pb-0"
                    >
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          value={row.label}
                          onChange={(e) =>
                            setRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, label: e.target.value } : r
                              )
                            )
                          }
                          aria-label="Subject label"
                          className={fieldCls}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          type="number"
                          min={1}
                          max={12}
                          value={row.credits}
                          onChange={(e) =>
                            setRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, credits: Number(e.target.value) || 0 }
                                  : r
                              )
                            )
                          }
                          aria-label="Credits"
                          className={`${fieldCls} font-mono tabular-nums`}
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <select
                          value={row.gradePoint}
                          onChange={(e) =>
                            setRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, gradePoint: Number(e.target.value) }
                                  : r
                              )
                            )
                          }
                          aria-label="Grade"
                          className={fieldCls}
                        >
                          {TEN_POINT_GRADES.map((g) => (
                            <option key={g.value} value={g.value}>
                              {g.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          disabled={rows.length <= 1}
                          onClick={() => setRows((prev) => prev.filter((r) => r.id !== row.id))}
                          aria-label={`Remove ${row.label}`}
                          className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prior Semesters for Cumulative CGPA */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100">
                      Previous Terms (Cumulative CGPA)
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Combined automatically with your current term GPA above.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setCgpaRows((prev) => [
                        ...prev,
                        {
                          id: `cg-${Date.now()}`,
                          semester: `Prior Term ${prev.length + 1}`,
                          credits: 20,
                          sgpa: 8.0,
                        },
                      ])
                    }
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Term</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {cgpaRows.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          value={item.semester}
                          onChange={(e) =>
                            setCgpaRows((prev) =>
                              prev.map((c) =>
                                c.id === item.id ? { ...c, semester: e.target.value } : c
                              )
                            )
                          }
                          aria-label="Term label"
                          className={fieldCls}
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <input
                          type="number"
                          min={1}
                          max={40}
                          value={item.credits}
                          onChange={(e) =>
                            setCgpaRows((prev) =>
                              prev.map((c) =>
                                c.id === item.id
                                  ? { ...c, credits: Number(e.target.value) || 0 }
                                  : c
                              )
                            )
                          }
                          aria-label="Term credits"
                          className={`${fieldCls} font-mono tabular-nums`}
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <input
                          type="number"
                          min={0}
                          max={10}
                          step={0.01}
                          value={item.sgpa}
                          onChange={(e) =>
                            setCgpaRows((prev) =>
                              prev.map((c) =>
                                c.id === item.id ? { ...c, sgpa: Number(e.target.value) || 0 } : c
                              )
                            )
                          }
                          aria-label="Term SGPA"
                          className={`${fieldCls} font-mono tabular-nums`}
                        />
                      </div>
                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setCgpaRows((prev) => prev.filter((c) => c.id !== item.id))}
                          aria-label={`Remove ${item.semester}`}
                          className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
              <div>
                <p className="text-xs font-medium text-[#1D4ED8] dark:text-blue-400">
                  Calculated Result · {activeCourse?.shortName}
                </p>
                <p className="mt-2 text-4xl font-bold font-mono tabular-nums text-[#0F172A] dark:text-white">
                  {sgpaStats.sgpa.toFixed(2)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Term Grade Point Average (out of 10)
                </p>
              </div>

              <dl className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-600 dark:text-slate-400">Current Credits</dt>
                  <dd className="font-mono font-semibold tabular-nums text-[#0F172A] dark:text-slate-100">
                    {sgpaStats.totalCredits}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600 dark:text-slate-400">Approx. Percentage</dt>
                  <dd className="font-mono font-semibold tabular-nums text-[#1D4ED8] dark:text-blue-400">
                    {sgpaStats.approxPercentage.toFixed(1)}%
                  </dd>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-600 dark:text-slate-400">Cumulative CGPA</dt>
                  <dd className="font-mono font-bold tabular-nums text-[#5B21B6] dark:text-violet-400">
                    {cgpaStats.cgpa.toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600 dark:text-slate-400">Total Credits Combined</dt>
                  <dd className="font-mono font-semibold tabular-nums text-[#0F172A] dark:text-slate-100">
                    {cgpaStats.combinedCredits}
                  </dd>
                </div>
              </dl>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                {activeCourse?.degreeLevel === 'Secondary'
                  ? 'Uses indicative 9.5× conversion for CBSE grade points. Official Class 12 board transcripts report subject-wise marks and positional grades.'
                  : 'Uses the standard CBCS formula (SGPA × 10 − 7.5) as an estimate. Confirm official conversion rules with your university ordinance.'}
              </p>
            </aside>
          </div>
        )}

        {/* TOOL 2: Attendance Planner */}
        {activeTab === 'attendance' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] dark:text-slate-50">
                  75% Attendance Eligibility Planner
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Enter lectures attended and total classes held so far to calculate your exact
                  standing for {activeCourse?.shortName ?? 'your course'}.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">Quick target:</span>
                {[75, 80, 85].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setTargetPct(pct)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      targetPct === pct
                        ? 'bg-[#0F172A] dark:bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="att-attended"
                    className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Classes Attended
                  </label>
                  <input
                    id="att-attended"
                    type="number"
                    min={0}
                    value={attended}
                    onChange={(e) => setAttended(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono tabular-nums text-sm text-[#0F172A] dark:text-slate-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="att-conducted"
                    className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Total Classes Held
                  </label>
                  <input
                    id="att-conducted"
                    type="number"
                    min={0}
                    value={conducted}
                    onChange={(e) => setConducted(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono tabular-nums text-sm text-[#0F172A] dark:text-slate-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="att-target"
                    className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Target Threshold (%)
                  </label>
                  <input
                    id="att-target"
                    type="number"
                    min={50}
                    max={95}
                    value={targetPct}
                    onChange={(e) =>
                      setTargetPct(Math.min(95, Math.max(50, Number(e.target.value) || 75)))
                    }
                    className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono tabular-nums text-sm text-[#0F172A] dark:text-slate-100"
                  />
                </div>
              </div>
            </div>

            <aside className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
              <p className="text-xs font-medium text-[#1D4ED8] dark:text-blue-400">
                Attendance Status
              </p>
              <p className="text-4xl font-bold font-mono tabular-nums text-[#0F172A] dark:text-white">
                {attendanceStats.currentPct.toFixed(1)}%
              </p>

              {attendanceStats.safeConducted === 0 ? (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Enter total classes held to calculate.
                </p>
              ) : attendanceStats.currentPct >= targetPct ? (
                <div className="p-4 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-sm text-emerald-950 dark:text-emerald-100">
                  <p className="font-semibold">On Track — Meets {targetPct}% Target</p>
                  <p className="mt-1 text-xs leading-relaxed">
                    You can miss up to{' '}
                    <strong className="font-mono tabular-nums">
                      {attendanceStats.safeToMiss}
                    </strong>{' '}
                    consecutive lecture{attendanceStats.safeToMiss === 1 ? '' : 's'} while remaining
                    at or above {targetPct}%.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-amber-50/90 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-sm text-amber-950 dark:text-amber-100">
                  <p className="font-semibold">Below Target — Action Needed</p>
                  <p className="mt-1 text-xs leading-relaxed">
                    Attend the next{' '}
                    <strong className="font-mono tabular-nums">
                      {attendanceStats.classesNeeded}
                    </strong>{' '}
                    consecutive lecture{attendanceStats.classesNeeded === 1 ? '' : 's'} without
                    absence to reach {targetPct}%.
                  </p>
                </div>
              )}
            </aside>
          </div>
        )}

        {/* TOOL 3: Exam Focus Timer & Do Not Disturb */}
        {activeTab === 'timer' && (
          <div className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] dark:text-slate-50">
                  Exam Focus Timer & Do Not Disturb
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Synced across every page. Activate Do Not Disturb (Alt+D) to silence navigation
                  clutter while reading notes or solving PYQs.
                </p>
              </div>
              <button
                type="button"
                onClick={() => (dndEnabled ? disableDnd() : enableDnd(focusLabel))}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  dndEnabled
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0F172A] dark:text-slate-100 hover:border-[#1D4ED8] dark:hover:border-blue-400'
                }`}
              >
                <BellOff className="w-3.5 h-3.5" />
                <span>{dndEnabled ? 'Exit Do Not Disturb' : 'Enable Do Not Disturb'}</span>
              </button>
            </div>

            <div>
              <label
                htmlFor="timer-label"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Current Study Topic
              </label>
              <input
                id="timer-label"
                type="text"
                value={focusLabel}
                onChange={(e) => setFocusLabel(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {[15, 25, 45, 50, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => selectPreset(mins)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-colors ${
                    presetMinutes === mins
                      ? 'bg-[#1D4ED8] dark:bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>

            <div className="py-6 border-y border-slate-100 dark:border-slate-800 text-center">
              <p className="text-5xl sm:text-6xl font-bold font-mono tabular-nums tracking-tight text-[#0F172A] dark:text-white">
                {formattedTime}
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {focusLabel || 'Focused Study Session'} · Completed today:{' '}
                <span className="font-mono tabular-nums font-semibold text-[#0F172A] dark:text-slate-100">
                  {completedSessions}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={toggleRunning}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-sm font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors"
              >
                {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{running ? 'Pause' : 'Start Session'}</span>
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}

        {/* TOOL 4: Unit Revision Checklist */}
        {activeTab === 'checklist' && checklistSubject && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex-1 max-w-md space-y-2">
                <label
                  htmlFor="chk-sub"
                  className="block text-xs font-medium text-slate-600 dark:text-slate-300"
                >
                  Select {activeCourse?.shortName} Subject to Track ({courseSubjects.length}{' '}
                  subjects)
                </label>
                <select
                  id="chk-sub"
                  value={checklistSubject.code}
                  onChange={(e) => setChecklistSubjectCode(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100"
                >
                  {courseSubjects.map((sub) => (
                    <option key={sub.id} value={sub.code}>
                      {sub.code} — {sub.name} ({termLabel} {sub.semester})
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-4 text-xs">
                  <Link
                    to={`/subjects/${encodeURIComponent(checklistSubject.code)}?tab=notes`}
                    className="inline-flex items-center gap-1 font-medium text-[#1D4ED8] dark:text-blue-400 hover:underline"
                  >
                    <span>Read {checklistSubject.code} Notes</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    to={`/subjects/${encodeURIComponent(checklistSubject.code)}?tab=pyq`}
                    className="inline-flex items-center gap-1 font-medium text-[#5B21B6] dark:text-violet-400 hover:underline"
                  >
                    <span>Practice PYQ Blueprint</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="text-left md:text-right min-w-[210px]">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Local Browser Revision Progress
                </p>
                <p className="text-2xl font-bold font-mono tabular-nums text-[#0F172A] dark:text-white">
                  {checklistProgress.done} / {checklistProgress.total} ({checklistProgress.pct}%)
                </p>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-[#1D4ED8] dark:bg-blue-500 transition-all duration-200"
                    style={{ width: `${checklistProgress.pct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {checklistSubject.units.map((unit) => (
                <div key={unit.id}>
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-100 mb-2.5">
                    <span className="font-mono text-[#1D4ED8] dark:text-blue-400 mr-2">
                      Unit {unit.unitNumber}.
                    </span>
                    {unit.title}
                  </h3>
                  <div className="space-y-2">
                    {unit.topics.map((topic) => {
                      const checked = Boolean(checkedTopics[topic.id]);
                      return (
                        <label
                          key={topic.id}
                          className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/70 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleTopic(topic.id)}
                            className="mt-0.5 w-4 h-4 accent-[#1D4ED8]"
                          />
                          <span
                            className={`text-sm ${
                              checked
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {topic.title}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
