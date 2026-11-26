import { useCallback, useEffect, useRef, useState } from 'react';

const EVENT = 'studysphere-store';

export const KEYS = {
  bookmarks: 'studysphere_bookmarks_v1',
  exams: 'studysphere_exams_v1',
  log: 'studysphere_study_log_v1',
  cards: 'studysphere_flashcards_v1',
} as const;

export function localDateKey(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function read<T>(key: string, initial: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : initial;
  } catch {
    return initial;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be blocked or full; the UI keeps working for this session.
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: key }));
}

/** localStorage-backed state that stays in sync across components and tabs. */
export function useStored<T>(key: string, initial: T): [T, (u: T | ((p: T) => T)) => void] {
  const initialRef = useRef(initial);
  const [value, setValue] = useState<T>(() => read(key, initialRef.current));
  const latest = useRef(value);
  latest.current = value;

  useEffect(() => {
    const sync = (e: Event) => {
      const changed = e instanceof StorageEvent ? e.key : (e as CustomEvent).detail;
      if (changed === key || changed === null) setValue(read(key, initialRef.current));
    };
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, [key]);

  const set = useCallback(
    (u: T | ((p: T) => T)) => {
      const next = typeof u === 'function' ? (u as (p: T) => T)(latest.current) : u;
      latest.current = next;
      setValue(next);
      write(key, next);
    },
    [key]
  );

  return [value, set];
}

export type StudyLog = Record<string, number>;

export function addStudyMinutes(minutes: number) {
  if (!(minutes > 0)) return;
  const log = read<StudyLog>(KEYS.log, {});
  const day = localDateKey();
  log[day] = (log[day] ?? 0) + Math.round(minutes);
  write(KEYS.log, log);
}

export function computeStreak(log: StudyLog): number {
  const d = new Date();
  if (!(log[localDateKey(d)] > 0)) d.setDate(d.getDate() - 1); // today not studied yet: streak is still alive
  let streak = 0;
  while (log[localDateKey(d)] > 0) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export function useBookmarks() {
  const [codes, setCodes] = useStored<string[]>(KEYS.bookmarks, []);
  const has = (code: string) => codes.includes(code.toUpperCase());
  const toggle = (code: string) => {
    const c = code.toUpperCase();
    setCodes((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  };
  return { codes, has, toggle };
}
