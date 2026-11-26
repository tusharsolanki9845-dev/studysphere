import React, { useState } from 'react';
import { CheckCircle2, Download, Laptop, Share, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../lib/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'drawer' | 'footer';
}

export function PWAInstallButton({ variant = 'compact' }: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [installing, setInstalling] = useState(false);

  // Hide install button when already launched as an installed standalone app
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      setInstalling(true);
      try {
        await install();
      } finally {
        setInstalling(false);
      }
      return;
    }
    setShowGuide(true);
  };

  const buttonClasses =
    variant === 'drawer'
      ? 'w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#1D4ED8] dark:bg-blue-600 text-white text-xs font-semibold hover:bg-[#1E40AF] dark:hover:bg-blue-500 transition-colors whitespace-nowrap'
      : variant === 'footer'
        ? 'inline-flex items-center gap-1.5 text-xs font-medium text-[#1D4ED8] dark:text-blue-400 hover:underline transition-colors'
        : 'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#1D4ED8]/35 dark:border-blue-500/40 bg-[#EFF6FF] dark:bg-blue-950/60 text-xs font-semibold text-[#1D4ED8] dark:text-blue-300 hover:bg-blue-100/80 dark:hover:bg-blue-900/60 transition-colors whitespace-nowrap shrink-0';

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={installing}
        aria-label="Install StudySphere App on PC or Mobile"
        className={buttonClasses}
      >
        <Download className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>{installing ? 'Installing...' : 'Install App'}</span>
      </button>

      {showGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-install-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1D4ED8] dark:text-blue-400">
                  Offline-Ready App
                </p>
                <h3
                  id="pwa-install-title"
                  className="mt-1 text-lg font-bold text-[#0F172A] dark:text-white"
                >
                  Download StudySphere App
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                aria-label="Close install instructions"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Install StudySphere directly on your phone or computer for full-screen focus mode and
              offline access to all 12 courses, 63 subjects, notes, and PYQ blueprints.
            </p>

            <div className="mt-4 space-y-3">
              {isIOS ? (
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 p-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-[#0F172A] dark:text-white">
                    <Smartphone className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400" />
                    <span>iPhone & iPad (Safari)</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300">
                    <li>
                      Tap the <Share className="inline w-3.5 h-3.5 mx-0.5" /> <strong>Share</strong>{' '}
                      icon in the Safari toolbar.
                    </li>
                    <li>
                      Scroll down and tap <strong>Add to Home Screen</strong>.
                    </li>
                    <li>
                      Tap <strong>Add</strong> to launch StudySphere like a native app.
                    </li>
                  </ol>
                </div>
              ) : isAndroid ? (
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 p-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-[#0F172A] dark:text-white">
                    <Smartphone className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400" />
                    <span>Android (Chrome / Edge / Brave)</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300">
                    <li>
                      Tap the <strong>⋮ Menu</strong> icon in the top-right corner of your browser.
                    </li>
                    <li>
                      Select <strong>Install app</strong> or <strong>Add to Home screen</strong>.
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 p-3.5 text-xs sm:text-sm space-y-1.5">
                    <div className="flex items-center gap-2 font-semibold text-[#0F172A] dark:text-white">
                      <Laptop className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400" />
                      <span>Windows, Mac & Linux (Chrome / Edge)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      Open this app in its own browser tab, then click the{' '}
                      <strong>Install icon</strong> in the right side of the address bar (or{' '}
                      <strong>Menu → Save and share → Install StudySphere</strong>).
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 p-3.5 text-xs sm:text-sm space-y-1.5">
                    <div className="flex items-center gap-2 font-semibold text-[#0F172A] dark:text-white">
                      <Smartphone className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400" />
                      <span>Android & iOS Mobile</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      Android Chrome: <strong>⋮ Menu → Install app</strong>. iPhone Safari:{' '}
                      <strong>Share → Add to Home Screen</strong>.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 pt-1">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Works offline automatically with cached syllabus, notes, and PYQs.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-5 w-full rounded-lg bg-[#0F172A] dark:bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
