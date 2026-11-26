import { ChevronRight, Home } from 'lucide-react';
import { useMemo } from 'react';
import { useCatalog } from '../lib/catalogContext';
import { useHierarchy } from '../lib/hierarchyContext';
import { Link } from '../lib/router';

export type HierarchyLevel =
  | 'Home'
  | 'University'
  | 'Course'
  | 'Branch'
  | 'Semester'
  | 'Subject'
  | 'Unit'
  | 'Section';

export interface BreadcrumbItem {
  label: string;
  to?: string;
  onClick?: () => void;
  level?: HierarchyLevel;
  mono?: boolean;
}

export interface AcademicBreadcrumbConfig {
  universityId?: string;
  courseId?: string;
  branchCode?: string | null;
  semester?: number | null;
  subjectCode?: string | null;
  unitNumber?: number | null;
  /** Optional terminal section label (e.g. "Syllabus", "Notes", "PYQ", "Subjects") */
  sectionLabel?: string;
  /** Optional click overrides for interactive in-page explorers */
  onUniversityClick?: () => void;
  onCourseClick?: () => void;
  onBranchClick?: () => void;
  onSemesterClick?: () => void;
  onSubjectClick?: () => void;
}

/**
 * Resolves a structured University → Course → Branch → Semester → Subject breadcrumb trail
 * from the live StudySphere catalog and tracked user hierarchy context.
 */
export function useAcademicBreadcrumb(config: AcademicBreadcrumbConfig): BreadcrumbItem[] {
  const { catalog } = useCatalog();
  const { trail } = useHierarchy();

  return useMemo(() => {
    const items: BreadcrumbItem[] = [{ label: 'Home', to: '/', level: 'Home' }];

    const subject = config.subjectCode
      ? catalog.subjects.find(
          (s) => s.code.toUpperCase() === config.subjectCode?.toUpperCase()
        )
      : undefined;

    const universityId = config.universityId ?? subject?.universityId ?? 'uni-aktu';
    const university = catalog.universities.find((u) => u.id === universityId);

    if (university) {
      items.push({
        label: university.shortName,
        to: config.onUniversityClick
          ? undefined
          : university.slug === 'aktu'
            ? '/aktu'
            : '/universities',
        onClick: config.onUniversityClick,
        level: 'University',
      });
    }

    const courseId = config.courseId ?? subject?.courseId;
    const course = courseId
      ? catalog.courses.find((c) => c.id === courseId)
      : university?.id === 'uni-aktu'
        ? catalog.courses.find((c) => c.universityId === 'uni-aktu')
        : undefined;

    if (course) {
      items.push({
        label: course.shortName,
        to: config.onCourseClick ? undefined : '/courses',
        onClick: config.onCourseClick,
        level: 'Course',
      });
    }

    // Determine the active branch: explicit config > tracked context (if valid for subject) > subject's first branch
    let resolvedBranchCode = config.branchCode ?? null;
    if (!resolvedBranchCode && subject) {
      const trackedBranch = trail.branchCode
        ? catalog.branches.find(
            (b) =>
              b.code.toUpperCase() === trail.branchCode?.toUpperCase() &&
              subject.branchIds.includes(b.id)
          )
        : undefined;
      const fallbackBranch = catalog.branches.find((b) => subject.branchIds.includes(b.id));
      resolvedBranchCode = (trackedBranch ?? fallbackBranch)?.code ?? null;
    }

    if (resolvedBranchCode) {
      const branch = catalog.branches.find(
        (b) => b.code.toUpperCase() === resolvedBranchCode?.toUpperCase()
      );
      items.push({
        label: branch ? branch.code : resolvedBranchCode,
        to: config.onBranchClick
          ? undefined
          : `/subjects?branch=${encodeURIComponent(branch ? branch.code : resolvedBranchCode)}`,
        onClick: config.onBranchClick,
        level: 'Branch',
        mono: true,
      });
    }

    const resolvedSemester = config.semester ?? subject?.semester ?? null;
    if (resolvedSemester && resolvedSemester >= 1 && resolvedSemester <= 8) {
      const semRoute = resolvedBranchCode
        ? `/subjects?branch=${encodeURIComponent(resolvedBranchCode)}&semester=${resolvedSemester}`
        : `/subjects?semester=${resolvedSemester}`;
      items.push({
        label: `Semester ${resolvedSemester}`,
        to: config.onSemesterClick ? undefined : semRoute,
        onClick: config.onSemesterClick,
        level: 'Semester',
      });
    }

    if (subject) {
      items.push({
        label: subject.code,
        to: config.onSubjectClick
          ? undefined
          : `/subjects/${encodeURIComponent(subject.code)}`,
        onClick: config.onSubjectClick,
        level: 'Subject',
        mono: true,
      });
    } else if (config.subjectCode) {
      items.push({
        label: config.subjectCode.toUpperCase(),
        level: 'Subject',
        mono: true,
      });
    }

    if (config.unitNumber) {
      items.push({
        label: `Unit ${config.unitNumber}`,
        level: 'Unit',
        mono: true,
      });
    }

    if (config.sectionLabel) {
      items.push({
        label: config.sectionLabel,
        level: 'Section',
      });
    }

    // Terminal item represents current view unless an explicit onClick is supplied
    if (items.length > 0) {
      const last = items[items.length - 1];
      items[items.length - 1] = {
        ...last,
        to: undefined,
        onClick: undefined,
      };
    }

    return items;
  }, [catalog, config, trail.branchCode]);
}

interface BreadcrumbProps {
  /** Direct list of breadcrumb items */
  items?: BreadcrumbItem[];
  /** Academic hierarchy config automatically resolved into University → Course → Branch → Semester → Subject */
  hierarchy?: AcademicBreadcrumbConfig;
  /** Render inside a subtle full-width bar or inline inside a header */
  variant?: 'inline' | 'bar';
  className?: string;
}

export function Breadcrumb({
  items,
  hierarchy,
  variant = 'inline',
  className = '',
}: BreadcrumbProps) {
  const resolvedHierarchy = useAcademicBreadcrumb(hierarchy ?? {});
  const trailItems = items && items.length > 0 ? items : resolvedHierarchy;

  if (trailItems.length === 0) return null;

  const navContent = (
    <nav aria-label="Breadcrumb" className="w-full overflow-x-auto">
      <ol className="flex items-center flex-nowrap sm:flex-wrap gap-y-1.5 text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 min-w-0">
        {trailItems.map((item, idx) => {
          const isLast = idx === trailItems.length - 1;
          const isHome = idx === 0 && item.label === 'Home';

          const labelClass = `${item.mono ? 'font-mono' : ''} whitespace-nowrap shrink-0`;

          return (
            <li
              key={`${item.label}-${idx}`}
              className="inline-flex items-center min-w-0 shrink-0"
              title={item.level ? `${item.level}: ${item.label}` : item.label}
            >
              {idx > 0 && (
                <ChevronRight
                  className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 mx-1.5 shrink-0"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                <span
                  aria-current="page"
                  className={`font-semibold text-[#0F172A] dark:text-slate-100 ${labelClass}`}
                >
                  {item.label}
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className={`inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors ${labelClass}`}
                >
                  {isHome && <Home className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                  <span>{item.label}</span>
                </button>
              ) : item.to ? (
                <Link
                  to={item.to}
                  className={`inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors ${labelClass}`}
                >
                  {isHome && <Home className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className={`text-slate-600 dark:text-slate-300 ${labelClass}`}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );

  if (variant === 'bar') {
    return (
      <div
        className={`bg-[#F8FAFC] dark:bg-[#0D1526] border-b border-slate-200/90 dark:border-slate-800 ${className}`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          {navContent}
        </div>
      </div>
    );
  }

  return <div className={className}>{navContent}</div>;
}
