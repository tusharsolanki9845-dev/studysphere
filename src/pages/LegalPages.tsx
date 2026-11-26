import { PageHeader } from '../components/PageHeader';
import { Link } from '../lib/router';

export function PrivacyPolicyPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]}
        title="Privacy Policy"
        description="Effective November 2026 · StudySphere is designed for open academic access without student accounts or invasive tracking."
      />
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
              1. No Student Registration Required
            </h2>
            <p>
              StudySphere does not offer or require student accounts, logins, or student profiles.
              You can browse universities, courses, syllabi, notes, PYQs, and study tools freely
              without providing personal credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
              2. Information You Voluntarily Submit
            </h2>
            <p>
              If you submit a message via the{' '}
              <Link to="/contact" className="text-[#1D4ED8] dark:text-blue-400 hover:underline">
                Contact page
              </Link>
              , we store the name, email address, inquiry category, optional subject context, message,
              submission time, and review status. These records are stored in the configured Turso
              database or, when it is unavailable, in the server's local data file. No automatic
              deletion schedule is currently implemented; the operator must review and delete
              records when they are no longer needed. The contact form records submissions but does
              not itself send email notifications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
              3. Local Browser Storage
            </h2>
            <p>
              Your theme preference, cached public catalogue, bookmarks, exam planner entries, study
              history, flashcards, revision checklist, and focus-mode preference are stored in your
              browser's local or session storage. These personal study records are not synchronised
              to a StudySphere account or uploaded by the app. The public catalogue cache is populated
              from the StudySphere API. Clearing browser storage removes locally saved study state.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
              4. Technical Request Data
            </h2>
            <p>
              The server uses request IP addresses in memory to apply abuse-prevention rate limits;
              these rate-limit buckets are not written to the StudySphere content database. The
              hosting provider and database provider may independently process operational logs
              under their own policies. The page also loads typefaces from Google Fonts, which means
              your browser contacts Google's font domains; see{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Google's Privacy Policy</a>.
              The current codebase does not include an analytics SDK.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
              5. Advertising Status (ADS_ENABLED=false)
            </h2>
            <p>
              Third-party advertisements and advertising scripts are strictly disabled by default on
              StudySphere (<code className="font-mono text-xs">ADS_ENABLED=false</code>). If
              compliant advertising or clearly disclosed sponsorships are ever enabled after owner
              and ad-network approval, this Privacy Policy will be updated prior to activation.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Terms of Use' }]}
        title="Terms of Use"
        description="Effective November 2026 · Plain-language rules for using StudySphere's free academic platform."
      />
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
              1. Independent Educational Platform
            </h2>
            <p>
              StudySphere is an independent, free academic resource platform. It is not affiliated
              with, sponsored by, or officially endorsed by Dr. A.P.J. Abdul Kalam Technical
              University (AKTU), University of Mumbai, Anna University, CBSE, or any government
              examination authority listed on the site.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
              2. Academic Verification
            </h2>
            <p>
              While we structure subject codes, credit weights, syllabus outlines, and SGPA
              calculators carefully, universities and boards periodically revise curricula and
              ordinances. Students must always verify official examination schedules, grade
              conversions, and syllabi with their institution's official portals.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
              3. Acceptable Use & Fair Free-Tier Limits
            </h2>
            <p>
              Browsing and using the platform's core student features is free of charge (₹0).
              Automated scraping, abusive bulk requests, or disruption of free-tier backend services
              are prohibited and rate limits may be applied. Separate Creative Commons licences shown
              on contributed material govern reuse of that material.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}

export function CopyrightPolicyPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Copyright Policy' }]}
        title="Copyright & Original Content Policy"
        description="StudySphere is built on an original-content-first foundation that respects authors, publishers, educators, and universities."
      />
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
              1. Original-Content-First & Non-Redistribution Rule
            </h2>
            <p>
              StudySphere is intended to publish original explanations and practice material, not
              scans or copied extracts from proprietary websites, commercial textbooks, paid coaching
              booklets, or restricted exam papers. Free-to-access official documents are not assumed
              to be redistributable; where redistribution rights are not clear, the platform links
              directly to the official source instead. A source being publicly accessible does not
              by itself grant permission to republish it.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
              2. Contributor Submissions & Public Licences
            </h2>
            <p>
              Public note contributions must be submitted under Creative Commons Attribution-ShareAlike
              4.0 or Creative Commons Attribution 4.0. Contributors must own the material or have
              permission from the rights holder to apply the selected licence. Uploading a file or
              ticking a confirmation box does not make unauthorised material lawful. Practice-paper
              submissions must be original questions or material explicitly licensed for redistribution;
              restricted official exam papers and copied textbook extracts must not be uploaded.
              Bundled editorial material marked “Original StudySphere” is a project label, not a
              substitute for retaining evidence of authorship and source provenance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
              3. Trademarks & Institution Names
            </h2>
            <p>
              University and board names, course designations (such as B.Tech or B.E.), and acronyms
              (such as AKTU or CBSE) are used strictly for nominative identification so students can
              locate relevant academic structures. StudySphere does not reproduce university crests
              or protected logos.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
              4. Notice & Takedown Procedure
            </h2>
            <p>
              If you believe any resource, link, or text on StudySphere infringes your copyright,
              please submit a{' '}
              <Link
                to="/contact?category=Copyright%20Notice"
                className="text-[#1D4ED8] dark:text-blue-400 font-medium hover:underline"
              >
                Copyright Notice via our Contact page
              </Link>{' '}
              with the exact page URL, description of the copyrighted work, and your contact
              details. Verified claims are reviewed and removed promptly.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
