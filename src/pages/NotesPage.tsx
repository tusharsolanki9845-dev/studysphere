import { useEffect, useMemo, useState } from 'react';
import { BellOff, ChevronLeft, ChevronRight, Download, ExternalLink, Search } from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { StudyNoteContent, downloadTextFile } from '../components/StudyNoteContent';
import { useCatalog } from '../lib/catalogContext';
import { useFocusMode } from '../lib/focusContext';
import { Link, useRouter } from '../lib/router';

const PAGE_SIZE = 10;

export function NotesPage() {
  const { catalog } = useCatalog();
  const { dndEnabled, enableDnd } = useFocusMode();
  const { getParam, search } = useRouter();
  const [courseFilter, setCourseFilter] = useState<string>(getParam('course') ?? 'ALL');
  const [subjectFilter, setSubjectFilter] = useState<string>(getParam('subject') ?? 'ALL');
  const [query, setQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setCourseFilter(getParam('course') ?? 'ALL');
    setSubjectFilter(getParam('subject') ?? 'ALL');
    setPage(1);
  }, [search, getParam]);

  const selectedCourseObj = useMemo(
    () => (courseFilter !== 'ALL' ? catalog.courses.find((c) => c.id === courseFilter) : undefined),
    [catalog.courses, courseFilter]
  );

  const visibleSubjects = useMemo(
    () =>
      selectedCourseObj
        ? catalog.subjects.filter((s) => s.courseId === selectedCourseObj.id)
        : catalog.subjects,
    [catalog.subjects, selectedCourseObj]
  );

  const courseSubjectCodes = useMemo(
    () => new Set(visibleSubjects.map((s) => s.code.toUpperCase())),
    [visibleSubjects]
  );

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.notes.filter((note) => {
      if (courseFilter !== 'ALL' && !courseSubjectCodes.has(note.subjectCode.toUpperCase())) {
        return false;
      }
      if (
        subjectFilter !== 'ALL' &&
        note.subjectCode.toUpperCase() !== subjectFilter.toUpperCase()
      ) {
        return false;
      }
      if (q) {
        return (
          note.title.toLowerCase().includes(q) ||
          note.subjectCode.toLowerCase().includes(q) ||
          note.summary.toLowerCase().includes(q) ||
          note.authorName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [catalog.notes, courseFilter, courseSubjectCodes, subjectFilter, query]);

  const totalPages = Math.max(1, Math.ceil(filteredNotes.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedNotes = useMemo(
    () => filteredNotes.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filteredNotes, safePage]
  );

  return (
    <div>
      <PageHeader
        hierarchy={{
          universityId: selectedCourseObj?.universityId ?? 'uni-aktu',
          courseId: selectedCourseObj?.id ?? 'course-aktu-btech',
          subjectCode: subjectFilter !== 'ALL' ? subjectFilter : null,
          sectionLabel: 'Notes & PDFs',
        }}
        title={
          selectedCourseObj
            ? `${selectedCourseObj.shortName} — Study Notes`
            : 'Original Study Notes & Guides'
        }
        description="Free, copyright-safe study notes written or openly licensed for every indexed course. Read online in Do Not Disturb mode or download clean Markdown files directly."
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            {!dndEnabled && (
              <button
                type="button"
                onClick={() => enableDnd('Reading Original Study Notes')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-[#0F172A] dark:text-slate-100 hover:border-[#1D4ED8] dark:hover:border-blue-400 transition-colors whitespace-nowrap"
              >
                <BellOff className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400" />
                <span>Focus Mode</span>
              </button>
            )}
            <Link
              to="/contact?category=Original%20Contribution"
              className="inline-flex items-center px-4 py-2.5 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-sm font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors whitespace-nowrap"
            >
              Contribute Original Notes
            </Link>
          </div>
        }
      />

      <div
        className={`${
          dndEnabled ? 'max-w-[960px]' : 'max-w-[1200px]'
        } mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8`}
      >
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5 relative">
            <Search
              className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search notes by title, subject code, or author..."
              aria-label="Search notes"
              className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={courseFilter}
              onChange={(e) => {
                setCourseFilter(e.target.value);
                setSubjectFilter('ALL');
                setPage(1);
              }}
              aria-label="Filter notes by course"
              className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
            >
              <option value="ALL">All {catalog.courses.length} Courses</option>
              {catalog.courses.map((c) => {
                const u = catalog.universities.find((uni) => uni.id === c.universityId);
                return (
                  <option key={c.id} value={c.id}>
                    {u?.shortName} · {c.shortName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="md:col-span-4">
            <select
              value={subjectFilter}
              onChange={(e) => {
                setSubjectFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter notes by subject"
              className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-[#0F172A] dark:text-slate-100 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:outline-none"
            >
              <option value="ALL">All Subjects ({filteredNotes.length} Guides)</option>
              {visibleSubjects.map((sub) => (
                <option key={sub.id} value={sub.code}>
                  {sub.code} — {sub.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <AdSlot slotId="notes-top" />

        {paginatedNotes.length === 0 ? (
          <EmptyState
            contextLabel="Original-Content-First Repository"
            title="No notes match your current filter"
            description="Try clearing your course or subject filter, or open any subject page to upload original Markdown study notes directly."
            primaryAction={{ label: 'Explore Syllabus', to: '/syllabus' }}
            secondaryAction={{
              label: 'Submit Original Notes',
              to: '/contact?category=Original%20Contribution',
            }}
          />
        ) : (
          <>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              <span>
                Showing {paginatedNotes.length} of {filteredNotes.length} study guides (Page{' '}
                {safePage} of {totalPages})
              </span>
              {(courseFilter !== 'ALL' || subjectFilter !== 'ALL' || query) && (
                <button
                  type="button"
                  onClick={() => {
                    setCourseFilter('ALL');
                    setSubjectFilter('ALL');
                    setQuery('');
                    setPage(1);
                  }}
                  className="font-sans text-[#1D4ED8] dark:text-blue-400 font-medium hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            <div className="space-y-4">
              {paginatedNotes.map((note) => {
                const isExpanded = expandedId === note.id;
                return (
                  <article
                    key={note.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <div>
                        <Link
                          to={`/subjects/${encodeURIComponent(note.subjectCode)}?tab=notes`}
                          className="font-mono font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline"
                        >
                          {note.subjectCode}
                        </Link>
                        {note.unitNumber && (
                          <>
                            <span aria-hidden="true"> · </span>
                            <span className="font-mono">Unit {note.unitNumber}</span>
                          </>
                        )}
                        <span aria-hidden="true"> · </span>
                        <span>{note.license}</span>
                        <span aria-hidden="true"> · </span>
                        <span>By {note.authorName}</span>
                      </div>
                      <time dateTime={note.publishedAt} className="font-mono">
                        {note.publishedAt}
                      </time>
                    </div>

                    <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
                      {note.title}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {note.summary}
                    </p>

                    {isExpanded && note.contentMarkdown && (
                      <div className="mt-4 p-5 rounded-lg bg-[#F8FAFC] dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                        <StudyNoteContent markdown={note.contentMarkdown} />
                      </div>
                    )}

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {note.contentMarkdown && (
                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? null : note.id)}
                          className="inline-flex items-center px-3.5 py-2 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-xs font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors whitespace-nowrap"
                        >
                          {isExpanded ? 'Hide Study Guide' : 'Read Full Study Guide'}
                        </button>
                      )}
                      {note.contentMarkdown && (
                        <button
                          type="button"
                          onClick={() => {
                            const slug = `${note.subjectCode.toLowerCase()}-unit-${note.unitNumber ?? 'all'}-${note.id}`;
                            const header = `# ${note.title}\n\nSubject: ${note.subjectCode}${note.unitNumber ? ` · Unit ${note.unitNumber}` : ''}\nAuthor: ${note.authorName} · License: ${note.license}\n\n${note.summary}\n\n---\n\n`;
                            downloadTextFile(
                              `${slug}.md`,
                              `${header}${note.contentMarkdown}\n`,
                              'text/markdown;charset=utf-8'
                            );
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download .md</span>
                        </button>
                      )}
                      <Link
                        to={`/subjects/${encodeURIComponent(note.subjectCode)}?tab=notes`}
                        className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline whitespace-nowrap"
                      >
                        Open Subject View →
                      </Link>
                      {note.resourceUrl && (
                        <a
                          href={note.resourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0F172A] dark:text-slate-200 hover:text-[#1D4ED8] dark:hover:text-blue-400 whitespace-nowrap"
                        >
                          <span>Open External Document</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Notes pagination"
                className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800"
              >
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400 tabular-nums">
                  Page {safePage} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
