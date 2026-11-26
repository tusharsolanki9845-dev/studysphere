import React, { useMemo, useState } from 'react';
import { Bookmark, CalendarClock, Check, Flame, Layers, Plus, RotateCw, Trash2 } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { useCatalog } from '../lib/catalogContext';
import { Link, useRouter } from '../lib/router';
import {
  KEYS,
  addStudyMinutes,
  computeStreak,
  localDateKey,
  useBookmarks,
  useStored,
  type StudyLog,
} from '../lib/studyStore';

type TabId = 'overview' | 'exams' | 'saved' | 'cards';
const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: 'Overview', icon: Flame },
  { id: 'exams', label: 'Exam Countdown', icon: CalendarClock },
  { id: 'saved', label: 'Saved Subjects', icon: Bookmark },
  { id: 'cards', label: 'Flashcards', icon: Layers },
];

interface Exam { id: string; subject: string; date: string }
interface Card { id: string; deck: string; front: string; back: string; known: boolean }

const card = 'rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5';
const input =
  'w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-[#0F172A] dark:text-slate-100';
const btn =
  'inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#1D4ED8] text-white text-sm font-medium hover:bg-[#1E40AF] transition-colors disabled:opacity-50';
const ghost =
  'inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 hover:border-[#1D4ED8] transition-colors';

const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

function daysUntil(date: string): number {
  const [y, m, d] = date.split('-').map(Number);
  const target = new Date(y, m - 1, d).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.round((target - today) / 864e5);
}

function Overview({ log, exams }: { log: StudyLog; exams: Exam[] }) {
  const streak = computeStreak(log);
  const todayMin = log[localDateKey()] ?? 0;
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return { label: d.toLocaleDateString(undefined, { weekday: 'short' }), min: log[localDateKey(d)] ?? 0 };
  });
  const max = Math.max(60, ...week.map((w) => w.min));
  const next = exams
    .map((e) => ({ ...e, left: daysUntil(e.date) }))
    .filter((e) => e.left >= 0)
    .sort((a, b) => a.left - b.left)[0];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className={card}>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Flame className="w-4 h-4 text-orange-500" /> Study streak
        </div>
        <p className="mt-2 text-4xl font-bold">{streak} <span className="text-base font-medium">day{streak === 1 ? '' : 's'}</span></p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Studied today: {todayMin} min</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[15, 30, 60].map((m) => (
            <button key={m} type="button" className={ghost} onClick={() => addStudyMinutes(m)}>+{m} min</button>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Completed Focus Timer sessions are added automatically.</p>
      </div>
      <div className={card}>
        <p className="text-sm text-slate-500 dark:text-slate-400">Next exam</p>
        {next ? (
          <>
            <p className="mt-2 text-4xl font-bold">{next.left === 0 ? 'Today' : `${next.left}d`}</p>
            <p className="mt-1 text-sm">{next.subject}</p>
          </>
        ) : (
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">No upcoming exams. Add one in Exam Countdown.</p>
        )}
      </div>
      <div className={card}>
        <p className="text-sm text-slate-500 dark:text-slate-400">Last 7 days (minutes)</p>
        <div className="mt-3 flex items-end gap-2 h-28">
          {week.map((w, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
              <div className="w-full rounded-t bg-[#1D4ED8] dark:bg-blue-500" style={{ height: `${(w.min / max) * 100}%`, minHeight: w.min ? 4 : 0 }} title={`${w.min} min`} />
              <span className="text-[10px] text-slate-500 dark:text-slate-400">{w.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Exams({ exams, setExams }: { exams: Exam[]; setExams: (u: Exam[] | ((p: Exam[]) => Exam[])) => void }) {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const add = () => {
    if (!subject.trim() || !date) return;
    setExams((p) => [...p, { id: uid(), subject: subject.trim(), date }]);
    setSubject('');
    setDate('');
  };
  const sorted = [...exams].sort((a, b) => (a.date < b.date ? -1 : 1));
  return (
    <div className="space-y-4">
      <div className={`${card} flex flex-col sm:flex-row gap-3`}>
        <input className={input} placeholder="Subject or paper (e.g. BCS301)" value={subject} onChange={(e) => setSubject(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} aria-label="Exam subject" />
        <input className={`${input} sm:max-w-[190px]`} type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Exam date" />
        <button type="button" className={btn} onClick={add}><Plus className="w-4 h-4" />Add</button>
      </div>
      {sorted.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">No exams yet.</p>}
      {sorted.map((e) => {
        const left = daysUntil(e.date);
        return (
          <div key={e.id} className={`${card} flex items-center justify-between gap-3`}>
            <div>
              <p className="font-semibold">{e.subject}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{new Date(e.date + 'T00:00').toLocaleDateString(undefined, { dateStyle: 'medium' })}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-lg font-bold ${left >= 0 && left <= 3 ? 'text-red-600 dark:text-red-400' : ''}`}>
                {left < 0 ? 'Done' : left === 0 ? 'Today' : `${left} days`}
              </span>
              <button type="button" className={ghost} onClick={() => setExams((p) => p.filter((x) => x.id !== e.id))} aria-label={`Remove ${e.subject}`}><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Saved() {
  const { catalog } = useCatalog();
  const { codes, toggle } = useBookmarks();
  const subjects = useMemo(() => catalog.subjects.filter((s) => codes.includes(s.code.toUpperCase())), [catalog.subjects, codes]);
  if (!subjects.length) {
    return <EmptyState contextLabel="Saved" title="No saved subjects yet" description="Open any subject and press Save to keep it here for quick access." primaryAction={{ label: 'Browse subjects', to: '/subjects' }} />;
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {subjects.map((s) => (
        <div key={s.id} className={`${card} flex items-start justify-between gap-3`}>
          <Link to={`/subjects/${encodeURIComponent(s.code)}`} className="min-w-0">
            <p className="font-semibold hover:text-[#1D4ED8] dark:hover:text-blue-400">{s.code} — {s.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Semester {s.semester} · {s.credits} credits</p>
          </Link>
          <button type="button" className={ghost} onClick={() => toggle(s.code)} aria-label={`Unsave ${s.code}`}><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
    </div>
  );
}

function Flashcards() {
  const [cards, setCards] = useStored<Card[]>(KEYS.cards, []);
  const [deck, setDeck] = useState('General');
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [reviewing, setReviewing] = useState(false);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const queue = useMemo(() => cards.filter((c) => !c.known), [cards]);
  const current = queue[idx % Math.max(queue.length, 1)];

  const add = () => {
    if (!front.trim() || !back.trim()) return;
    setCards((p) => [...p, { id: uid(), deck: deck.trim() || 'General', front: front.trim(), back: back.trim(), known: false }]);
    setFront('');
    setBack('');
  };
  const mark = (known: boolean) => {
    if (!current) return;
    if (known) setCards((p) => p.map((c) => (c.id === current.id ? { ...c, known: true } : c)));
    else setIdx((i) => i + 1);
    setFlipped(false);
  };

  if (reviewing) {
    return (
      <div className="max-w-xl mx-auto space-y-4">
        {current ? (
          <>
            <p className="text-sm text-slate-500 dark:text-slate-400">{queue.length} card{queue.length === 1 ? '' : 's'} left · {current.deck}</p>
            <button type="button" onClick={() => setFlipped((f) => !f)} className={`${card} w-full min-h-[200px] text-center text-lg flex items-center justify-center`} aria-live="polite">
              {flipped ? current.back : current.front}
            </button>
            <div className="flex gap-3 justify-center">
              <button type="button" className={ghost} onClick={() => setFlipped((f) => !f)}><RotateCw className="w-4 h-4" />Flip</button>
              <button type="button" className={ghost} onClick={() => mark(false)}>Again</button>
              <button type="button" className={btn} onClick={() => mark(true)}><Check className="w-4 h-4" />Got it</button>
            </div>
          </>
        ) : (
          <p className={`${card} text-center`}>All cards learned. Nice work!</p>
        )}
        <div className="text-center"><button type="button" className={ghost} onClick={() => { setReviewing(false); setIdx(0); setFlipped(false); }}>Back to deck</button></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className={`${card} space-y-3`}>
        <div className="grid gap-3 sm:grid-cols-[160px_1fr_1fr]">
          <input className={input} value={deck} onChange={(e) => setDeck(e.target.value)} placeholder="Deck" aria-label="Deck name" />
          <input className={input} value={front} onChange={(e) => setFront(e.target.value)} placeholder="Question / term" aria-label="Front of card" />
          <input className={input} value={back} onChange={(e) => setBack(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} placeholder="Answer / definition" aria-label="Back of card" />
        </div>
        <div className="flex gap-3">
          <button type="button" className={btn} onClick={add}><Plus className="w-4 h-4" />Add card</button>
          <button type="button" className={ghost} disabled={!queue.length} onClick={() => { setIdx(0); setFlipped(false); setReviewing(true); }}>Review {queue.length} card{queue.length === 1 ? '' : 's'}</button>
          {cards.some((c) => c.known) && <button type="button" className={ghost} onClick={() => setCards((p) => p.map((c) => ({ ...c, known: false })))}>Reset learned</button>}
        </div>
      </div>
      {cards.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">Make cards for formulas, definitions and key terms. They are stored only in this browser.</p>}
      {cards.map((c) => (
        <div key={c.id} className={`${card} flex items-start justify-between gap-3`}>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 dark:text-slate-400">{c.deck}{c.known ? ' · learned' : ''}</p>
            <p className="font-semibold">{c.front}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{c.back}</p>
          </div>
          <button type="button" className={ghost} onClick={() => setCards((p) => p.filter((x) => x.id !== c.id))} aria-label="Delete card"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
    </div>
  );
}

export function MyStudyPage() {
  const { getParam } = useRouter();
  const initial = (TABS.find((t) => t.id === getParam('tab'))?.id ?? 'overview') as TabId;
  const [tab, setTab] = useState<TabId>(initial);
  const [log] = useStored<StudyLog>(KEYS.log, {});
  const [exams, setExams] = useStored<Exam[]>(KEYS.exams, []);

  return (
    <div>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'My Study' }]}
        title="My Study"
        description="Your streak, exam countdowns, saved subjects and flashcards. Everything is saved privately in this browser."
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div role="tablist" className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            const on = t.id === tab;
            return (
              <button key={t.id} role="tab" aria-selected={on} type="button" onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${on ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#1D4ED8]'}`}>
                <Icon className="w-4 h-4" />{t.label}
              </button>
            );
          })}
        </div>
        {tab === 'overview' && <Overview log={log} exams={exams} />}
        {tab === 'exams' && <Exams exams={exams} setExams={setExams} />}
        {tab === 'saved' && <Saved />}
        {tab === 'cards' && <Flashcards />}
      </div>
    </div>
  );
}
