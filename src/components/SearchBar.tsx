import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { api } from '../lib/api';
import { useCatalog } from '../lib/catalogContext';
import { useRouter } from '../lib/router';
import type { CatalogData, SearchResultItem } from '../shared/types';

function searchCachedCatalog(catalog: CatalogData, rawQuery: string): SearchResultItem[] {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return [];
  const results: SearchResultItem[] = [];
  const courseById = new Map(catalog.courses.map((c) => [c.id, c]));

  for (const course of catalog.courses) {
    if (
      course.name.toLowerCase().includes(q) ||
      course.shortName.toLowerCase().includes(q) ||
      course.degreeLevel.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'course',
        id: course.id,
        title: `${course.shortName} — ${course.name}`,
        subtitle: course.description,
        route: `/courses/${encodeURIComponent(course.id)}`,
        meta: `${course.degreeLevel} · Cached`,
      });
    }
  }

  for (const subject of catalog.subjects) {
    const parentCourse = courseById.get(subject.courseId);
    if (
      subject.code.toLowerCase().includes(q) ||
      subject.name.toLowerCase().includes(q) ||
      subject.summary.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'subject',
        id: subject.id,
        title: `${subject.code} — ${subject.name}`,
        subtitle: subject.summary,
        route: `/subjects/${encodeURIComponent(subject.code)}`,
        meta: `${parentCourse?.shortName ?? 'Course'} · Cached`,
      });
    }
  }

  for (const note of catalog.notes) {
    if (note.title.toLowerCase().includes(q) || note.subjectCode.toLowerCase().includes(q)) {
      results.push({
        type: 'note',
        id: note.id,
        title: note.title,
        subtitle: note.summary,
        route: `/subjects/${encodeURIComponent(note.subjectCode)}?tab=notes`,
        meta: `Study Note · ${note.subjectCode}`,
      });
    }
  }

  for (const pyq of catalog.pyqs) {
    if (pyq.title.toLowerCase().includes(q) || pyq.subjectCode.toLowerCase().includes(q)) {
      results.push({
        type: 'pyq',
        id: pyq.id,
        title: pyq.title,
        subtitle: `${pyq.examSession} ${pyq.examYear} · ${pyq.paperType}`,
        route: `/subjects/${encodeURIComponent(pyq.subjectCode)}?tab=pyq`,
        meta: `PYQ · ${pyq.subjectCode}`,
      });
    }
  }

  return results.slice(0, 12);
}

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  initialQuery?: string;
}

const TYPE_LABEL: Record<SearchResultItem['type'], string> = {
  university: 'University',
  course: 'Course',
  branch: 'Branch',
  subject: 'Subject',
  topic: 'Syllabus',
  note: 'Note',
  pyq: 'PYQ',
};

export function SearchBar({
  placeholder = 'Search courses, subjects (BCS301, BCA301, KMBN201, BP101T), syllabus, notes, or PYQs...',
  className = '',
  initialQuery = '',
}: SearchBarProps) {
  const { navigate } = useRouter();
  const { catalog, isOffline } = useCatalog();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      return;
    }

    if (isOffline) {
      setResults(searchCachedCatalog(catalog, trimmed));
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const res = await api.search(trimmed);
        if (!cancelled) {
          setResults(res.results);
        }
      } catch {
        if (!cancelled) {
          setResults(searchCachedCatalog(catalog, trimmed));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 140);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, isOffline, catalog]);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      navigate('/subjects');
      return;
    }
    if (results.length > 0) {
      setOpen(false);
      navigate(results[0].route);
      return;
    }
    setOpen(false);
    navigate(`/subjects?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSelect = (route: string) => {
    setOpen(false);
    navigate(route);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} role="search" className="relative flex items-center">
        <Search
          className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-4 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
          placeholder={placeholder}
          aria-label="Search StudySphere academic catalog"
          className="w-full h-13 pl-12 pr-28 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1D4ED8] dark:focus:border-blue-400 focus:ring-2 focus:ring-[#1D4ED8]/15 dark:focus:ring-blue-400/20 focus:outline-none transition-colors"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setResults([]);
              setOpen(false);
            }}
            aria-label="Clear search"
            className="absolute right-24 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-1.5 h-10 px-4 rounded-lg bg-[#1D4ED8] dark:bg-blue-600 text-white text-sm font-medium hover:bg-[#1E40AF] dark:hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
        >
          Search
        </button>
      </form>

      {open && query.trim().length > 0 && (
        <div
          role="region"
          aria-label="Search suggestions"
          className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 overflow-hidden max-h-[380px] overflow-y-auto"
        >
          {loading ? (
            <div className="px-4 py-5 text-sm text-slate-500 dark:text-slate-400">
              Searching academic index...
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-5 text-sm text-slate-600 dark:text-slate-300">
              No direct matches for{' '}
              <span className="font-medium text-[#0F172A] dark:text-white">“{query}”</span>. Try
              searching a course like <span className="font-mono">BCA</span> or subject code like{' '}
              <span className="font-mono">BCS301</span>,{' '}
              <span className="font-mono">BP101T</span>, or browse the{' '}
              <button
                type="button"
                onClick={() => handleSelect('/syllabus')}
                className="text-[#1D4ED8] dark:text-blue-400 underline underline-offset-2 font-medium"
              >
                Syllabus Explorer
              </button>
              .
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {results.slice(0, 8).map((item) => (
                <li key={`${item.type}-${item.id}`}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item.route)}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">
                        <span className="font-medium text-[#1D4ED8] dark:text-blue-400">
                          {TYPE_LABEL[item.type]}
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
                    <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-1" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
