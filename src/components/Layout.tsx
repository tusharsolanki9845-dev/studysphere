import React, { useState } from 'react';
import {
  BellOff,
  BookOpen,
  FileText,
  Flame,
  GraduationCap,
  Home,
  Menu,
  Moon,
  Pause,
  Play,
  RotateCcw,
  ScrollText,
  Sun,
  Wrench,
  X,
} from 'lucide-react';
import { useCatalog } from '../lib/catalogContext';
import { useFocusMode } from '../lib/focusContext';
import { Link, useRouter } from '../lib/router';
import { useTheme } from '../lib/themeContext';
import { BrandMark } from './BrandMark';
import { HeaderSearch } from './HeaderSearch';
import { OfflineBanner } from './OfflineBanner';
import { PWAInstallButton } from './PWAInstallButton';

const PRIMARY_NAV = [
  { label: 'Explore', to: '/explore' },
  { label: 'Courses', to: '/courses' },
  { label: 'Syllabus', to: '/syllabus' },
  { label: 'PYQ', to: '/pyq' },
  { label: 'Tools', to: '/tools' },
];

const MOBILE_ALL_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Explore Hierarchy', to: '/explore' },
  { label: 'Universities', to: '/universities' },
  { label: 'AKTU Hub', to: '/aktu' },
  { label: 'Courses', to: '/courses' },
  { label: 'School (Classes 3–12)', to: '/school' },
  { label: 'Subjects', to: '/subjects' },
  { label: 'Notes & PDFs', to: '/notes' },
  { label: 'Previous-Year Papers', to: '/pyq' },
  { label: 'Syllabus Explorer', to: '/syllabus' },
  { label: 'Study Tools', to: '/tools' },
  { label: 'My Study', to: '/my-study' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  const { catalog } = useCatalog();
  const { isDark, toggleTheme } = useTheme();
  const {
    dndEnabled,
    toggleDnd,
    disableDnd,
    formattedTime,
    running,
    presetMinutes,
    focusLabel,
    toggleRunning,
    resetTimer,
    selectPreset,
  } = useFocusMode();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to: string) => {
    if (to === '/') return pathname === '/';
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-slate-100 transition-colors duration-150">
      {dndEnabled ? (
        /* Distraction-Free Do Not Disturb Bar */
        <header className="no-print sticky top-0 z-40 bg-[#0F172A] dark:bg-[#070B14] text-slate-100 border-b border-slate-800">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <BellOff className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap shrink-0">
                Do Not Disturb
              </span>
              <span className="hidden md:inline text-slate-600" aria-hidden="true">
                ·
              </span>
              <span className="hidden md:inline text-xs text-slate-300 truncate max-w-[220px]">
                {focusLabel}
              </span>
              <Link
                to="/subjects"
                className="hidden lg:inline-flex items-center gap-1 text-xs text-blue-300 hover:text-blue-200 whitespace-nowrap shrink-0 ml-2"
              >
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Subjects</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Compact Integrated Focus Countdown */}
              <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 rounded-lg px-2.5 py-1">
                <span
                  className="font-mono text-xs sm:text-sm font-semibold text-white tabular-nums"
                  aria-live="off"
                >
                  {formattedTime}
                </span>
                <button
                  type="button"
                  onClick={toggleRunning}
                  aria-label={running ? 'Pause focus timer' : 'Start focus timer'}
                  className="p-1 rounded text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={resetTimer}
                  aria-label="Reset focus timer"
                  className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <div className="hidden sm:flex items-center gap-1 pl-1.5 border-l border-slate-700">
                  {[25, 50].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => selectPreset(m)}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
                        presetMinutes === m
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-pressed={isDark}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors shrink-0"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={disableDnd}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#0F172A] text-xs font-semibold hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Exit Focus</span>
              </button>
            </div>
          </div>
        </header>
      ) : (
        <>
          {/* Top Navigation Bar with Global Search across Subjects, Notes, and PYQs */}
          <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-sm border-b border-slate-200/90 dark:border-slate-800">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-6">
              {/* Brand lockup */}
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#0F172A] dark:text-slate-100 whitespace-nowrap shrink-0"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <BrandMark className="w-7 h-7 shrink-0" />
                <span>StudySphere</span>
              </Link>

              {/* Primary nav links */}
              <nav
                aria-label="Primary navigation"
                className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
              >
                {PRIMARY_NAV.map((item) => {
                  const active = isActive(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`py-1 whitespace-nowrap shrink-0 transition-colors duration-150 border-b-2 ${
                        active
                          ? 'text-[#0F172A] dark:text-white border-[#1D4ED8] dark:border-blue-400'
                          : 'border-transparent hover:text-[#0F172A] dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Global Search Bar + Primary CTA / Mobile Toggle */}
              <div className="flex items-center gap-2.5 lg:gap-3 shrink-0">
                <HeaderSearch
                  enableShortcut
                  className="hidden md:block w-52 lg:w-64 xl:w-72"
                />

                <Link
                  to="/notes"
                  className="hidden lg:inline-flex items-center justify-center px-3.5 py-2 text-sm font-medium text-white bg-[#0F172A] dark:bg-blue-600 rounded-lg hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  Browse Notes
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileOpen((prev) => !prev)}
                  className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-200 dark:border-slate-700 text-[#0F172A] dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={mobileOpen}
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {mobileOpen && (
              <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] px-4 py-4 space-y-3">
                <HeaderSearch
                  className="w-full"
                  onNavigate={() => setMobileOpen(false)}
                />

                <PWAInstallButton variant="drawer" />

                <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      toggleDnd();
                      setMobileOpen(false);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 whitespace-nowrap"
                  >
                    <BellOff className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400" />
                    <span>Do Not Disturb</span>
                  </button>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-pressed={isDark}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 whitespace-nowrap"
                  >
                    {isDark ? (
                      <Sun className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-[#1D4ED8]" />
                    )}
                    <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </div>

                <nav aria-label="Mobile navigation" className="grid grid-cols-2 gap-1.5">
                  {MOBILE_ALL_LINKS.map((item) => {
                    const active = isActive(item.to);
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          active
                            ? 'bg-[#EFF6FF] dark:bg-blue-950/70 text-[#1D4ED8] dark:text-blue-300'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-[#0F172A] dark:hover:text-white'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}
          </header>

          {/* Non-Sticky Study Workspace Utility Strip: Install App, Theme Toggle & Do Not Disturb */}
          <div className="no-print bg-[#F8FAFC] dark:bg-[#0D1526] border-b border-slate-200/80 dark:border-slate-800/90">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2 sm:gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 min-w-0">
                {running ? (
                  <Link
                    to="/tools?tab=timer"
                    className="font-mono tabular-nums text-[#1D4ED8] dark:text-blue-400 font-semibold hover:underline truncate"
                  >
                    Focus Timer: {formattedTime} · {focusLabel}
                  </Link>
                ) : (
                  <span className="hidden sm:inline truncate">
                    Learn Without Limits · Free Open Access · Works Offline
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
                <Link
                  to="/school"
                  className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-300/90 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:border-[#1D4ED8] dark:hover:border-blue-400 transition-colors whitespace-nowrap shrink-0"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-blue-400" aria-hidden="true" />
                  <span>School 3–12</span>
                </Link>

                <Link
                  to="/my-study"
                  className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-300/90 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:border-[#1D4ED8] dark:hover:border-blue-400 transition-colors whitespace-nowrap shrink-0"
                >
                  <Flame className="w-3.5 h-3.5 text-orange-500" aria-hidden="true" />
                  <span>My Study</span>
                </Link>

                <PWAInstallButton variant="compact" />

                <button
                  type="button"
                  onClick={toggleDnd}
                  title="Enter Do Not Disturb focus mode (Alt+D)"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-300/90 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:border-[#1D4ED8] dark:hover:border-blue-400 transition-colors whitespace-nowrap shrink-0"
                >
                  <BellOff className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-blue-400" aria-hidden="true" />
                  <span className="hidden sm:inline">Do Not Disturb</span>
                  <span className="sm:hidden">Focus</span>
                </button>

                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                  aria-pressed={isDark}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-300/90 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:border-[#1D4ED8] dark:hover:border-blue-400 transition-colors whitespace-nowrap shrink-0"
                >
                  {isDark ? (
                    <Sun className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 text-[#1D4ED8]" aria-hidden="true" />
                  )}
                  <span>{isDark ? 'Light' : 'Dark'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Optional platform notice (suppressed in Do Not Disturb) */}
          {catalog.settings.platformNotice && (
            <div className="bg-[#0F172A] dark:bg-blue-950 text-slate-100 text-xs sm:text-sm py-2.5 px-4 text-center">
              <div className="max-w-[1200px] mx-auto">{catalog.settings.platformNotice}</div>
            </div>
          )}
        </>
      )}

      {/* Offline / Cached Content Visual Indicator */}
      <OfflineBanner />

      {/* Main Content */}
      <main className={`flex-1 ${dndEnabled ? 'pb-16' : ''}`}>{children}</main>

      {/* Quiet, Structured Footer (hidden in Do Not Disturb mode for serene focus) */}
      {!dndEnabled && (
        <footer className="bg-white dark:bg-[#0F172A] border-t border-slate-200 dark:border-slate-800 mt-16 pb-20 md:pb-0">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              {/* Brand Column */}
              <div className="md:col-span-4 space-y-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#0F172A] dark:text-slate-100"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <BrandMark className="w-6 h-6" />
                  <span>StudySphere</span>
                </Link>
                <p className="text-sm font-medium text-[#1D4ED8] dark:text-blue-400">
                  Learn Without Limits.
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
                  An independent, 100% free academic platform for students across India — covering
                  B.Tech, B.E., BCA, MCA, MBA, BBA, B.Pharm, B.Sc, B.Com, Diploma, and CBSE Class 12.
                </p>
              </div>

              {/* Academic Navigation */}
              <div className="md:col-span-3 space-y-3">
                <h3 className="text-sm font-semibold text-[#0F172A] dark:text-slate-100">
                  Academics
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>
                    <Link
                      to="/explore"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      Explore Hierarchy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/universities"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      Universities
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/aktu"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      AKTU B.Tech Hub
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/courses"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/subjects"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      Subjects
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources & Utilities */}
              <div className="md:col-span-2 space-y-3">
                <h3 className="text-sm font-semibold text-[#0F172A] dark:text-slate-100">
                  Resources
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>
                    <Link
                      to="/syllabus"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      Syllabus Explorer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/notes"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      Notes & PDFs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pyq"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      Previous-Year Papers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tools"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      Study Tools
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/school"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      School (Classes 3–12)
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-study"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      My Study
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Platform & Policies */}
              <div className="md:col-span-3 space-y-3">
                <h3 className="text-sm font-semibold text-[#0F172A] dark:text-slate-100">
                  Platform & Policies
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>
                    <Link
                      to="/about"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      About StudySphere
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      Contact & Contributions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy-policy"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/copyright-policy"
                      className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                    >
                      Copyright Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
              <p>
                © {new Date().getFullYear()} StudySphere. Independent educational platform — not
                affiliated with or endorsed by AKTU or any government examination authority.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 shrink-0">
                <PWAInstallButton variant="footer" />
                <button
                  type="button"
                  onClick={toggleDnd}
                  className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                >
                  Do Not Disturb (Alt+D)
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="hover:text-[#1D4ED8] dark:hover:text-blue-400 transition-colors"
                >
                  Switch to {isDark ? 'Light' : 'Dark'} Theme
                </button>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Mobile App Bottom Navigation Bar (hidden on desktop and in Do Not Disturb mode) */}
      {!dndEnabled && (
        <nav
          aria-label="Mobile quick navigation"
          className="no-print md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-[env(safe-area-inset-bottom)]"
        >
          <div className="grid grid-cols-6 h-16">
            {[
              { label: 'Home', to: '/', icon: Home },
              { label: 'School', to: '/school', icon: GraduationCap },
              { label: 'Notes', to: '/notes', icon: FileText },
              { label: 'PYQ', to: '/pyq', icon: ScrollText },
              { label: 'Tools', to: '/tools', icon: Wrench },
              { label: 'My Study', to: '/my-study', icon: Flame },
            ].map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                    active
                      ? 'text-[#1D4ED8] dark:text-blue-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
