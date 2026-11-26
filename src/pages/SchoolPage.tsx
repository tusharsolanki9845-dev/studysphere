import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, Download, GraduationCap, Info } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { downloadTextFile } from '../components/StudyNoteContent';
import { useRouter } from '../lib/router';
import { KEYS, addStudyMinutes, useStored } from '../lib/studyStore';
import { BOARD_NOTES, SCHOOL_BOARDS, type BoardKind } from '../shared/schoolBoards';
import {
  CLASS_BANDS,
  SCHOOL_SUBJECTS,
  STREAM_LABELS,
  revisionSheet,
  subjectsFor,
  type SchoolSubject,
  type Stream,
} from '../shared/schoolCurriculum';

const PROGRESS_KEY = 'studysphere_school_progress_v1';
const KIND_LABEL: Record<BoardKind, string> = {
  national: 'National boards',
  international: 'International boards in India',
  state: 'State and UT boards',
};
const card = 'rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]';
const ghost =
  'inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 hover:border-[#1D4ED8] dark:hover:border-blue-400 transition-colors';
const STREAMS: Stream[] = ['PCM', 'PCB', 'COM', 'HUM'];

export function SchoolPage() {
  const { getParam } = useRouter();
  const [boardId, setBoardId] = useState(() => (SCHOOL_BOARDS.some((b) => b.id === getParam('board')) ? getParam('board')! : 'cbse'));
  const [classNum, setClassNum] = useState(() => {
    const n = Number(getParam('class'));
    return n >= 3 && n <= 12 ? n : 10;
  });
  const [stream, setStream] = useState<Stream>(() => {
    const given = getParam('stream') as Stream;
    if (STREAMS.includes(given)) return given;
    // Arriving from search: pick a stream that actually contains the requested subject.
    const hit = SCHOOL_SUBJECTS.find((s) => s.key === `${getParam('class')}|${getParam('subject')}`);
    return hit && hit.streams !== 'all' ? hit.streams[0] : 'PCM';
  });
  const [openKey, setOpenKey] = useState<string | null>(() => {
    const n = Number(getParam('class'));
    const subj = getParam('subject');
    return subj && n >= 3 && n <= 12 ? `${n}|${subj}` : null;
  });
  const [progress, setProgress] = useStored<Record<string, number[]>>(PROGRESS_KEY, {});

  // Keep the address bar shareable without adding history entries or scrolling.
  useEffect(() => {
    const p = new URLSearchParams({ board: boardId, class: String(classNum) });
    if (classNum >= 11) p.set('stream', stream);
    if (openKey) p.set('subject', openKey.split('|')[1]);
    window.history.replaceState({}, '', `/school?${p.toString()}`);
  }, [boardId, classNum, stream, openKey]);

  const board = SCHOOL_BOARDS.find((b) => b.id === boardId) ?? SCHOOL_BOARDS[0];
  const subjects = useMemo(() => subjectsFor(classNum, classNum >= 11 ? stream : undefined, boardId), [classNum, stream, boardId]);
  const open = openKey ? subjects.find((s) => s.key === openKey) ?? null : null;
  const doneOf = (s: SchoolSubject) => progress[s.key] ?? [];
  const pct = (s: SchoolSubject) => Math.round((doneOf(s).length / s.chapters.length) * 100);

  const toggleChapter = (s: SchoolSubject, i: number) =>
    setProgress((p) => {
      const cur = p[s.key] ?? [];
      return { ...p, [s.key]: cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i] };
    });

  return (
    <div>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'School · Classes 3–12' }]}
        title="School: Classes 3 to 12"
        description="Pick your board and class to see subject-wise chapters and key concepts, track what you have revised, and download a revision sheet."
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Board */}
        <div className={`${card} p-5 space-y-3`}>
          <label htmlFor="board" className="text-sm font-semibold">Board</label>
          <select
            id="board"
            value={boardId}
            onChange={(e) => { setBoardId(e.target.value); setOpenKey(null); }}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
          >
            {(['national', 'international', 'state'] as BoardKind[]).map((k) => (
              <optgroup key={k} label={KIND_LABEL[k]}>
                {SCHOOL_BOARDS.filter((b) => b.kind === k).map((b) => (
                  <option key={b.id} value={b.id}>{b.short} — {b.region}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <p className="text-sm text-slate-700 dark:text-slate-300"><b>{board.name}.</b> {board.stages}.</p>
          {(BOARD_NOTES[board.id] ?? []).length > 0 && (
            <ul className="list-disc ml-5 text-sm text-slate-700 dark:text-slate-300 space-y-1">
              {BOARD_NOTES[board.id].map((n) => <li key={n}>{n}</li>)}
            </ul>
          )}
          <p className="flex gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              Chapters below follow the common national (NCERT-style) framework, which most boards build on. Your board may reorder, merge,
              add or drop chapters, and regional-language subjects are not listed. Always confirm with the latest syllabus from your board or school.
            </span>
          </p>
        </div>

        {/* Class */}
        <div className="space-y-3">
          {CLASS_BANDS.map((band) => (
            <div key={band.label} className="flex flex-wrap items-center gap-2">
              <span className="w-32 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{band.label}</span>
              {band.classes.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={c === classNum}
                  onClick={() => { setClassNum(c); setOpenKey(null); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${c === classNum ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]' : 'border-slate-300 dark:border-slate-700 hover:border-[#1D4ED8]'}`}
                >
                  Class {c}
                </button>
              ))}
            </div>
          ))}
          {classNum >= 11 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-32 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Stream</span>
              {STREAMS.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={s === stream}
                  onClick={() => { setStream(s); setOpenKey(null); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${s === stream ? 'bg-[#0F172A] dark:bg-blue-600 text-white border-transparent' : 'border-slate-300 dark:border-slate-700 hover:border-[#1D4ED8]'}`}
                >
                  {STREAM_LABELS[s]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Subjects or chapters */}
        {!open ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((s) => (
              <button key={s.key} type="button" onClick={() => setOpenKey(s.key)} className={`${card} p-5 text-left hover:border-[#1D4ED8] dark:hover:border-blue-400 transition-colors`}>
                <GraduationCap className="w-5 h-5 text-[#1D4ED8] dark:text-blue-400" aria-hidden="true" />
                <p className="mt-2 font-semibold">{s.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{s.chapters.length} chapters · {pct(s)}% revised</p>
                <div className="mt-3 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: `${pct(s)}%` }} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className={ghost} onClick={() => setOpenKey(null)}><ArrowLeft className="w-4 h-4" />All subjects</button>
              <h2 className="text-xl font-bold mr-auto">Class {open.classNum} · {open.name}</h2>
              <button type="button" className={ghost} onClick={() => addStudyMinutes(15)}>+15 min studied</button>
              <button
                type="button"
                className={ghost}
                onClick={() => downloadTextFile(`class-${open.classNum}-${open.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-revision.md`, revisionSheet(open, board.short, doneOf(open)))}
              >
                <Download className="w-4 h-4" />Revision sheet
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex gap-2">
              <Info className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                {open.verified
                  ? `Chapter titles match the current NCERT textbook: ${open.book}.`
                  : open.book
                    ? `Current NCERT textbook: ${open.book}. Chapter names are not itemised yet, so the topic areas below follow the earlier syllabus. Check them against your textbook.`
                    : 'Topic areas for this subject. Check chapter names against your own textbook.'}
              </span>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{pct(open)}% revised. Tick a chapter when you have finished revising it. Progress is saved in this browser.</p>
            {open.chapters.map((c, i) => {
              const done = doneOf(open).includes(i);
              return (
                <div key={c.title} className={`${card} p-4 flex gap-3`}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={done}
                    aria-label={`Mark ${c.title} as revised`}
                    onClick={() => toggleChapter(open, i)}
                    className={`mt-0.5 w-6 h-6 shrink-0 rounded-md border flex items-center justify-center ${done ? 'bg-green-600 border-green-600 text-white' : 'border-slate-300 dark:border-slate-600'}`}
                  >
                    {done && <Check className="w-4 h-4" />}
                  </button>
                  <div className="min-w-0">
                    <p className={`font-semibold ${done ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>{i + 1}. {c.title}</p>
                    <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-300">
                      {c.concepts.map((k) => <li key={k} className="list-disc ml-4">{k}</li>)}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
