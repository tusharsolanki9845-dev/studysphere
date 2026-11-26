import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { addStudyMinutes } from './studyStore';

const DND_STORAGE_KEY = 'studysphere_dnd_v1';

interface FocusContextValue {
  dndEnabled: boolean;
  toggleDnd: () => void;
  enableDnd: (label?: string) => void;
  disableDnd: () => void;
  presetMinutes: number;
  secondsLeft: number;
  running: boolean;
  focusLabel: string;
  completedSessions: number;
  formattedTime: string;
  setFocusLabel: (label: string) => void;
  selectPreset: (minutes: number) => void;
  toggleRunning: () => void;
  resetTimer: () => void;
}

const FocusContext = createContext<FocusContextValue | null>(null);

function loadInitialDnd(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(DND_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const [dndEnabled, setDndEnabled] = useState<boolean>(loadInitialDnd);
  const [presetMinutes, setPresetMinutes] = useState<number>(25);
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60);
  const [running, setRunning] = useState<boolean>(false);
  const [focusLabel, setFocusLabel] = useState<string>('Deep Study Session');
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(DND_STORAGE_KEY, String(dndEnabled));
    } catch {
      // Ignore storage restrictions
    }
  }, [dndEnabled]);

  // Log each completed session to the study history (feeds the streak on My Study)
  const loggedSessions = useRef(0);
  useEffect(() => {
    if (completedSessions > loggedSessions.current) {
      loggedSessions.current = completedSessions;
      addStudyMinutes(presetMinutes);
    }
  }, [completedSessions, presetMinutes]);

  // Countdown ticker shared across DND Focus Bar and ToolsPage Focus Timer
  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setCompletedSessions((c) => c + 1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running]);

  // Keyboard shortcut: Alt+D toggles Do Not Disturb; Escape exits when no input is focused
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditable =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (e.altKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setDndEnabled((prev) => !prev);
      } else if (e.key === 'Escape' && dndEnabled && !isEditable) {
        setDndEnabled(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dndEnabled]);

  const toggleDnd = useCallback(() => {
    setDndEnabled((prev) => !prev);
  }, []);

  const enableDnd = useCallback((label?: string) => {
    if (label) {
      setFocusLabel(label);
    }
    setDndEnabled(true);
  }, []);

  const disableDnd = useCallback(() => {
    setDndEnabled(false);
  }, []);

  const selectPreset = useCallback((minutes: number) => {
    setRunning(false);
    setPresetMinutes(minutes);
    setSecondsLeft(minutes * 60);
  }, []);

  const toggleRunning = useCallback(() => {
    setSecondsLeft((prev) => (prev === 0 ? presetMinutes * 60 : prev));
    setRunning((prev) => !prev);
  }, [presetMinutes]);

  const resetTimer = useCallback(() => {
    setRunning(false);
    setSecondsLeft(presetMinutes * 60);
  }, [presetMinutes]);

  const formattedTime = useMemo(() => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [secondsLeft]);

  const value = useMemo(
    () => ({
      dndEnabled,
      toggleDnd,
      enableDnd,
      disableDnd,
      presetMinutes,
      secondsLeft,
      running,
      focusLabel,
      completedSessions,
      formattedTime,
      setFocusLabel,
      selectPreset,
      toggleRunning,
      resetTimer,
    }),
    [
      dndEnabled,
      toggleDnd,
      enableDnd,
      disableDnd,
      presetMinutes,
      secondsLeft,
      running,
      focusLabel,
      completedSessions,
      formattedTime,
      selectPreset,
      toggleRunning,
      resetTimer,
    ]
  );

  return <FocusContext.Provider value={value}>{children}</FocusContext.Provider>;
}

export function useFocusMode(): FocusContextValue {
  const ctx = useContext(FocusContext);
  if (!ctx) {
    throw new Error('useFocusMode must be used inside FocusProvider');
  }
  return ctx;
}
