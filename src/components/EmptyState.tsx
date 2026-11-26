import { Link } from '../lib/router';

interface EmptyStateProps {
  title: string;
  description: string;
  contextLabel?: string;
  primaryAction?: { label: string; to: string };
  secondaryAction?: { label: string; to: string };
}

export function EmptyState({
  title,
  description,
  contextLabel,
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 sm:p-10 text-left">
      {contextLabel && (
        <p className="text-xs font-medium text-[#5B21B6] dark:text-violet-400 mb-2">
          {contextLabel}
        </p>
      )}
      <h3 className="text-lg font-semibold text-[#0F172A] dark:text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
        {description}
      </p>
      {(primaryAction || secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {primaryAction && (
            <Link
              to={primaryAction.to}
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors whitespace-nowrap"
            >
              {primaryAction.label}
            </Link>
          )}
          {secondaryAction && (
            <Link
              to={secondaryAction.to}
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
