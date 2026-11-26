import React from 'react';
import { useFocusMode } from '../lib/focusContext';
import {
  Breadcrumb,
  type AcademicBreadcrumbConfig,
  type BreadcrumbItem,
} from './Breadcrumb';

interface PageHeaderProps {
  crumbs?: BreadcrumbItem[];
  hierarchy?: AcademicBreadcrumbConfig;
  title: string;
  description: string;
  actions?: React.ReactNode;
}

export function PageHeader({ crumbs, hierarchy, title, description, actions }: PageHeaderProps) {
  const { dndEnabled } = useFocusMode();

  return (
    <>
      {!dndEnabled && (hierarchy || (crumbs && crumbs.length > 0)) && (
        <Breadcrumb items={crumbs} hierarchy={hierarchy} variant="bar" />
      )}
      <section className="bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800">
        <div
          className={`max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 ${
            dndEnabled ? 'py-6 sm:py-7' : 'py-9 sm:py-11'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-slate-50">
                {title}
              </h1>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {description}
              </p>
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
          </div>
        </div>
      </section>
    </>
  );
}
