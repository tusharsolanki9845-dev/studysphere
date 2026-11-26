import { ArrowRight, ExternalLink } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Link } from '../lib/router';
import { OFFICIAL_FREE_SOURCES } from '../shared/officialSources';

export function AboutPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        title="About StudySphere"
        description="Learn Without Limits. An independent, ₹0-student-cost academic platform built with open-source tools and free-tier-first engineering."
      />

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-slate-50">
            Why StudySphere Exists
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Students across Indian universities and boards often lose hours navigating ad-heavy
            download pages, broken mirrors, mandatory phone-number sign-ups, and scattered folder
            links just to check a semester syllabus or revise for exams. StudySphere replaces that
            friction with one structured, calm, distraction-free workspace.
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Every supported programme — AKTU B.Tech, Mumbai University B.E., Anna University B.E.
            R2021, and CBSE Class 12 — receives equal platform features: a dedicated Course Hub,
            seven-level Academic Hierarchy Explorer, unit-by-unit Syllabus Explorer, original
            Markdown Study Notes, 70-mark PYQ Blueprints, Do Not Disturb Focus Mode, and local Study
            Tools.
          </p>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-5">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-slate-50">
            Zero-Cost & Open Access Charter
          </h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <div className="py-4 first:pt-0">
              <h3 className="text-base font-semibold text-[#0F172A] dark:text-slate-100">
                01. Students Pay ₹0 — No Paywalls or Mandatory Login
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Essential notes, syllabus outlines, PYQ blueprints, focus mode, and study
                calculators are completely free for students without requiring registration or
                subscriptions.
              </p>
            </div>
            <div className="py-4">
              <h3 className="text-base font-semibold text-[#0F172A] dark:text-slate-100">
                02. Zero Paid APIs & Honest Free-Tier Operation
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                StudySphere runs on open-source software (React, TypeScript, Tailwind CSS) with zero
                paid AI API dependencies, zero paid databases, and built-in caching, pagination,
                rate limiting, and storage quota safeguards. Free infrastructure tiers have explicit
                usage limits — if a quota is reached, existing data is preserved and no paid plan is
                ever triggered automatically.
              </p>
            </div>
            <div className="py-4">
              <h3 className="text-base font-semibold text-[#0F172A] dark:text-slate-100">
                03. Copyright-Safe Content & Authorized External Links
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                StudySphere is designed around original explanations and practice blueprints.
                Contributor notes must be offered under a recognised Creative Commons licence, and
                third-party documents are not assumed reusable just because they are free to access.
                Where redistribution permission is unclear, we link directly to official portals
                such as AKTU, NPTEL, SWAYAM, and NCERT. Content provenance still requires editorial
                review; no platform can guarantee that a complaint will never arise.
              </p>
            </div>
            <div className="py-4 last:pb-0">
              <h3 className="text-base font-semibold text-[#0F172A] dark:text-slate-100">
                04. Advertising Disabled by Default (ADS_ENABLED=false)
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Advertising slots are architected cleanly for future sustainability (such as
                compliant Google AdSense, clearly labelled sponsorships, or legitimate affiliate
                links), but remain strictly disabled until explicit owner approval and ad-provider
                verification.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-slate-50">
            Official Free Academic Sources We Reference
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OFFICIAL_FREE_SOURCES.map((src) => (
              <a
                key={src.id}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#1D4ED8]/60 dark:hover:border-blue-500/60 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-[#0F172A] dark:text-slate-100">
                    {src.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-blue-400 shrink-0" />
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {src.coverage}
                </p>
              </a>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-sm font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors"
          >
            <span>Explore All 12 Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span>Contact Editorial Team</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
