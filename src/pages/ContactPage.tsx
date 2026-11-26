import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { api } from '../lib/api';
import { useRouter } from '../lib/router';
import type { ContactSubmission } from '../shared/types';

const CATEGORIES: ContactSubmission['category'][] = [
  'Resource Request',
  'Original Contribution',
  'Syllabus Correction',
  'Copyright Notice',
  'General',
];

export function ContactPage() {
  const { getParam } = useRouter();
  const initialCat = getParam('category');
  const safeInitialCategory = CATEGORIES.includes(initialCat as ContactSubmission['category'])
    ? (initialCat as ContactSubmission['category'])
    : 'Resource Request';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<ContactSubmission['category']>(safeInitialCategory);
  const [subjectContext, setSubjectContext] = useState(getParam('subject') ?? '');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{ id: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await api.submitContact({
        name,
        email,
        category,
        subjectContext: subjectContext.trim() || undefined,
        message,
      });
      setReceipt({ id: res.id, message: res.message });
      setName('');
      setEmail('');
      setSubjectContext('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send message right now.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    'w-full h-11 px-3.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none';

  return (
    <div>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        title="Contact & Original Contributions"
        description="Request missing university or board subjects, contribute original copyright-safe notes, report syllabus corrections, or submit a copyright notice."
      />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
            {receipt ? (
              <div className="space-y-4">
                <p className="text-xs font-mono text-[#1D4ED8] dark:text-blue-400">
                  Submission Recorded · {receipt.id}
                </p>
                <h2 className="text-xl font-bold text-[#0F172A] dark:text-slate-50">
                  Thank you for writing to StudySphere
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {receipt.message}
                </p>
                <button
                  type="button"
                  onClick={() => setReceipt(null)}
                  className="px-4 py-2.5 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-sm font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="c-name"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aarav Verma"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="c-email"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      required
                      maxLength={160}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="c-cat"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="c-cat"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ContactSubmission['category'])}
                      className={inputCls}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="c-sub"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      University / Subject Code (Optional)
                    </label>
                    <input
                      id="c-sub"
                      type="text"
                      maxLength={120}
                      value={subjectContext}
                      onChange={(e) => setSubjectContext(e.target.value)}
                      placeholder="e.g. AKTU · BCS301 or CBSE-P12"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="c-msg"
                    className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="c-msg"
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share details of your request, syllabus correction, original study notes proposal, or copyright concern..."
                    className="w-full p-3.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 rounded-lg px-4 py-2.5"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-sm font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 disabled:opacity-50 transition-colors"
                >
                  {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5 space-y-5">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3">
              <h2 className="text-base font-bold text-[#0F172A] dark:text-slate-100">
                Editorial Review Guidelines
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                All submissions sent through this form are recorded directly for verification by
                the StudySphere editorial team.
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc pl-4">
                <li>
                  <strong className="text-[#0F172A] dark:text-slate-100">
                    Original Contributions:
                  </strong>{' '}
                  Only submit notes authored by you or licensed under Creative Commons / open
                  academic terms.
                </li>
                <li>
                  <strong className="text-[#0F172A] dark:text-slate-100">Copyright Notices:</strong>{' '}
                  Include the exact page route and claim details so we can review and act promptly.
                </li>
                <li>
                  <strong className="text-[#0F172A] dark:text-slate-100">
                    University Expansion:
                  </strong>{' '}
                  Mention the university name, degree, and branch structure you would like
                  prioritized.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
