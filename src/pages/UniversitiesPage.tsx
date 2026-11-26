import { ArrowRight, ExternalLink } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { useCatalog } from '../lib/catalogContext';
import { Link } from '../lib/router';
import { OFFICIAL_FREE_SOURCES } from '../shared/officialSources';

const TYPE_LABELS: Record<string, string> = {
  'technical-university': 'Technical University',
  'state-university': 'State University',
  'central-university': 'Central University',
  'education-board': 'Education Board',
};

export function UniversitiesPage() {
  const { catalog } = useCatalog();

  return (
    <div>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Universities' }]}
        title="Indian Universities & Boards"
        description="StudySphere provides equal free access across AKTU, Mumbai University, Anna University, and CBSE Class 12 — alongside direct links to verified official academic portals."
        actions={
          <Link
            to="/contact?category=Resource%20Request"
            className="inline-flex items-center px-4 py-2.5 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-sm font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors whitespace-nowrap"
          >
            Request Your University
          </Link>
        }
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {catalog.universities.map((uni) => {
              const courses = catalog.courses.filter((c) => c.universityId === uni.id);
              const primaryCourse = courses[0];
              const subjectCount = catalog.subjects.filter((s) => s.universityId === uni.id).length;
              const isActive = uni.status === 'active';

              return (
                <article
                  key={uni.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>
                        {TYPE_LABELS[uni.type] ?? uni.type} · {uni.city}, {uni.state}
                      </span>
                      <span
                        className={`font-medium ${
                          isActive
                            ? 'text-[#1D4ED8] dark:text-blue-400'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {isActive ? 'Active Curriculum' : 'Planned · Schema Ready'}
                      </span>
                    </div>

                    <h2 className="mt-2.5 text-xl font-bold text-[#0F172A] dark:text-slate-50">
                      {uni.shortName} — {uni.name}
                    </h2>

                    <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {uni.description}
                    </p>

                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-600 dark:text-slate-400 font-mono tabular-nums">
                      <span>
                        {courses.length} Course{courses.length === 1 ? '' : 's'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{subjectCount} Indexed Subjects</span>
                      {uni.officialDomain && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{uni.officialDomain}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    {isActive && primaryCourse ? (
                      <>
                        <Link
                          to={`/courses/${encodeURIComponent(primaryCourse.id)}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] dark:text-blue-400 hover:text-[#1E40AF] dark:hover:text-blue-300"
                        >
                          <span>Open {uni.shortName} Hub</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/explore?university=${encodeURIComponent(uni.id)}`}
                          className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white"
                        >
                          Explore in Hierarchy
                        </Link>
                      </>
                    ) : (
                      <Link
                        to="/contact?category=Resource%20Request"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white"
                      >
                        <span>Volunteer curriculum structure</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Verified Free Official Academic Sources */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-[#1D4ED8] dark:text-blue-400">
              Free Official Academic Data Sources
            </p>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-slate-50">
              Authorized official portals & open learning platforms
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              StudySphere authors original notes, formulas, and practice blueprints in-house.
              Third-party documents are only hosted when their licence explicitly permits
              redistribution; otherwise, we link directly to the official free source below.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {OFFICIAL_FREE_SOURCES.map((source) => (
              <div
                key={source.id}
                className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-4"
              >
                <div>
                  <p className="text-xs font-mono text-[#5B21B6] dark:text-violet-400">
                    {source.category}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-[#0F172A] dark:text-slate-100">
                    {source.name}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {source.coverage}
                  </p>
                  <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                    {source.licenseNote}
                  </p>
                </div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:text-[#1E40AF] dark:hover:text-blue-300"
                >
                  <span>Visit {source.url.replace(/^https?:\/\//, '')}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
