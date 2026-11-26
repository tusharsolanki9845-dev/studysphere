import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BookOpen, FileText, GraduationCap, ScrollText, Search, X } from 'lucide-react';
import { useCatalog } from '../lib/catalogContext';
import { useRouter } from '../lib/router';
import { searchSchool } from '../shared/schoolCurriculum';

type FilterCategory = 'all' | 'subject' | 'note' | 'pyq' | 'school';

interface HeaderSearchItem {
  id: string;
  category: 'subject' | 'note' | 'pyq' | 'school';
  title: string;
  subtitle: string;
  meta: string;
  route: string;
}

const FILTER_TABS: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'subject', label: 'Subjects' },
  { id: 'note', label: 'Notes' },
  { id: 'pyq', label: 'PYQs' },
  { id: 'school', label: 'School' },
];

interface HeaderSearchProps {
  className?: string;
  onNavigate?: () => void;
  enableShortcut?: boolean;
}

export function HeaderSearch({
  className = '',
  onNavigate,
  enableShortcut = false,
}: HeaderSearchProps) {
  const { catalog } = useCatalog();
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const courseById = useMemo(
    () => new Map(catalog.courses.map((course) => [course.id, course])),
    [catalog.courses]
  );

  // Instant client-side filtering across subjects, study notes, and PYQ papers
  const matchedBuckets = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        subjects: [] as HeaderSearchItem[],
        notes: [] as HeaderSearchItem[],
        pyqs: [] as HeaderSearchItem[],
        school: [] as HeaderSearchItem[],
      };
    }

    const subjects: HeaderSearchItem[] = [];
    for (const subject of catalog.subjects) {
      const unitMatch = subject.units.some(
        (u) =>
          u.title.toLowerCase().includes(q) ||
          u.topics.some((t) => t.title.toLowerCase().includes(q))
      );
      if (
        subject.code.toLowerCase().includes(q) ||
        subject.name.toLowerCase().includes(q) ||
        subject.summary.toLowerCase().includes(q) ||
        unitMatch
      ) {
        const course = courseById.get(subject.courseId);
        const termLabel = course?.degreeLevel === 'Secondary' ? 'Term' : 'Sem';
        subjects.push({
          id: `subject-${subject.id}`,
          category: 'subject',
          title: `${subject.code} — ${subject.name}`,
          subtitle: subject.summary,
          meta: `${course?.shortName ?? 'Course'} · ${termLabel} ${subject.semester}`,
          route: `/subjects/${encodeURIComponent(subject.code)}`,
        });
      }
    }

    const notes: HeaderSearchItem[] = [];
    for (const note of catalog.notes) {
      if (
        note.title.toLowerCase().includes(q) ||
        note.subjectCode.toLowerCase().includes(q) ||
        note.summary.toLowerCase().includes(q) ||
        note.authorName.toLowerCase().includes(q)
      ) {
        notes.push({
          id: `note-${note.id}`,
          category: 'note',
          title: note.title,
          subtitle: note.summary,
          meta: `${note.subjectCode}${note.unitNumber ? ` · Unit ${note.unitNumber}` : ''}`,
          route: `/subjects/${encodeURIComponent(note.subjectCode)}?tab=notes`,
        });
      }
    }

    const pyqs: HeaderSearchItem[] = [];
    for (const pyq of catalog.pyqs) {
      if (
        pyq.title.toLowerCase().includes(q) ||
        pyq.subjectCode.toLowerCase().includes(q) ||
        String(pyq.examYear).includes(q) ||
        pyq.examSession.toLowerCase().includes(q) ||
        pyq.paperType.toLowerCase().includes(q)
      ) {
        pyqs.push({
          id: `pyq-${pyq.id}`,
          category: 'pyq',
          title: pyq.title,
          subtitle: `${pyq.examSession} ${pyq.examYear} · ${pyq.paperType}`,
          meta: pyq.subjectCode,
          route: `/subjects/${encodeURIComponent(pyq.subjectCode)}?tab=pyq`,
        });
      }
    }

    const school: HeaderSearchItem[] = searchSchool(q, 10).map((h) => ({
      id: `school-${h.classNum}-${h.subject}-${h.chapter ?? ''}`,
      category: 'school',
      title: h.chapter ? `Class ${h.classNum} ${h.subject}: ${h.chapter}` : `Class ${h.classNum} ${h.subject}`,
      subtitle: h.chapter ? 'School chapter and key concepts' : 'School subject, chapters and concepts',
      meta: `Class ${h.classNum}`,
      route: `/school?class=${h.classNum}&subject=${encodeURIComponent(h.subject)}`,
    }));

    return { subjects, notes, pyqs, school };
  }, [catalog.subjects, catalog.notes, catalog.pyqs, courseById, query]);

  const visibleResults = useMemo(() => {
    if (activeFilter === 'subject') return matchedBuckets.subjects.slice(0, 10);
    if (activeFilter === 'note') return matchedBuckets.notes.slice(0, 10);
    if (activeFilter === 'pyq') return matchedBuckets.pyqs.slice(0, 10);
    if (activeFilter === 'school') return matchedBuckets.school.slice(0, 10);
    return [
      ...matchedBuckets.subjects.slice(0, 4),
      ...matchedBuckets.notes.slice(0, 3),
      ...matchedBuckets.pyqs.slice(0, 3),
      ...matchedBuckets.school.slice(0, 3),
    ];
  }, [activeFilter, matchedBuckets]);

  const counts: Record<FilterCategory, number> = {
    all:
      matchedBuckets.subjects.length +
      matchedBuckets.notes.length +
      matchedBuckets.pyqs.length +
      matchedBuckets.school.length,
    subject: matchedBuckets.subjects.length,
    note: matchedBuckets.notes.length,
    pyq: matchedBuckets.pyqs.length,
    school: matchedBuckets.school.length,
  };

  useEffect(() => {
    setHighlightedIndex(0);
  }, [query, activeFilter]);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  useEffect(() => {
    if (!enableShortcut) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enableShortcut]);

  const selectRoute = (route: string) => {
    setOpen(false);
    setQuery('');
    onNavigate?.();
    navigate(route);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      selectRoute('/subjects');
      return;
    }
    const target = visibleResults[highlightedIndex] ?? visibleResults[0];
    if (target) {
      selectRoute(target.route);
      return;
    }
    selectRoute(`/subjects?q=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!open || visibleResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % visibleResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + visibleResults.length) % visibleResults.length);
    }
  };

  const renderCategoryIcon = (category: HeaderSearchItem['category']) => {
    if (category === 'subject') {
      return <BookOpen className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400 shrink-0 mt-0.5" />;
    }
    if (category === 'note') {
      return <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />;
    }
    if (category === 'school') {
      return <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />;
    }
    return <ScrollText className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />;
  };

  const categoryBadgeLabel = (category: HeaderSearchItem['category']) => {
    if (category === 'subject') return 'Subject';
    if (category === 'note') return 'Note';
    if (category === 'school') return 'School';
    return 'PYQ';
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} role="search" className="relative flex items-center">
        <Search
          className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search subjects, notes, PYQs..."
          aria-label="Global search across subjects, notes, and PYQ materials"
          className="w-full h-9 pl-9 pr-14 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:ring-2 focus:ring-[#1D4ED8]/15 dark:focus:ring-blue-400/20 focus:outline-none transition-colors"
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search query"
            className="absolute right-2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          enableShortcut && (
            <kbd
              aria-hidden="true"
              className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded absolute right-2 pointer-events-none"
            >
              Ctrl K
            </kbd>
          )
        )}
      </form>

      {open && query.trim().length > 0 && (
        <div
          role="region"
          aria-label="Global search results"
          className="absolute right-0 left-0 sm:left-auto sm:w-[420px] top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden"
        >
          {/* Simple Category Filter Bar */}
          <div className="flex items-center gap-1 px-2.5 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50">
            {FILTER_TABS.map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#0F172A] dark:bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab.label}{' '}
                  <span className={active ? 'text-slate-200' : 'text-slate-400 dark:text-slate-500'}>
                    ({counts[tab.id]})
                  </span>
                </button>
              );
            })}
          </div>

          {visibleResults.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <p>
                No matching{' '}
                {activeFilter === 'all' ? 'subjects, notes, or PYQs' : `${activeFilter}s`} for{' '}
                <span className="font-semibold text-[#0F172A] dark:text-white">“{query}”</span>.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Try codes like <span className="font-mono">BCS301</span>,{' '}
                <span className="font-mono">BCA301</span>, <span className="font-mono">KMBN201</span>, or{' '}
                <span className="font-mono">BP101T</span>.
              </p>
            </div>
          ) : (
            <ul className="max-h-[360px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
              {visibleResults.map((item, idx) => {
                const isHighlighted = idx === highlightedIndex;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      onClick={() => selectRoute(item.route)}
                      className={`w-full text-left px-3.5 py-2.5 flex items-start justify-between gap-3 transition-colors ${
                        isHighlighted
                          ? 'bg-[#EFF6FF] dark:bg-blue-950/60'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/70'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        {renderCategoryIcon(item.category)}
                        <div className="min-w-0">
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="font-semibold text-[#1D4ED8] dark:text-blue-400">
                              {categoryBadgeLabel(item.category)}
                            </span>
                            <span aria-hidden="true"> · </span>
                            <span>{item.meta}</span>
                          </p>
                          <p className="text-sm font-medium text-[#0F172A] dark:text-slate-100 truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-1" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {counts.all > 0 && (
            <div className="px-3.5 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{counts.all} total matches</span>
              <button
                type="button"
                onClick={() => selectRoute(`/subjects?q=${encodeURIComponent(query.trim())}`)}
                className="font-medium text-[#1D4ED8] dark:text-blue-400 hover:underline"
              >
                View in Subjects →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
