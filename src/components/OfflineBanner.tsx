import React, { useEffect, useState } from 'react';
import { RefreshCw, Wifi, WifiOff, X } from 'lucide-react';
import { useCatalog } from '../lib/catalogContext';

export function OfflineBanner() {
  const { isOffline, isUsingCache, lastSyncedAt, refresh } = useCatalog();
  const [dismissedOffline, setDismissedOffline] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [showReconnected, setShowReconnected] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  const showOfflineState = isOffline || isUsingCache;

  useEffect(() => {
    if (showOfflineState) {
      setDismissedOffline(false);
      setWasOffline(true);
      setShowReconnected(false);
    } else if (wasOffline) {
      setShowReconnected(true);
      const timer = window.setTimeout(() => {
        setShowReconnected(false);
        setWasOffline(false);
      }, 4000);
      return () => window.clearTimeout(timer);
    }
  }, [showOfflineState, wasOffline]);

  const handleRetry = async () => {
    setRetrying(true);
    try {
      await refresh();
    } finally {
      setRetrying(false);
    }
  };

  if (showReconnected) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="no-print bg-emerald-50 dark:bg-emerald-950/60 border-b border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <Wifi className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
            <p className="font-medium truncate">
              Back online — StudySphere catalog is synced with the latest updates.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowReconnected(false)}
            aria-label="Dismiss reconnection notice"
            className="p-1 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (!showOfflineState || dismissedOffline) {
    return null;
  }

  const syncedLabel = lastSyncedAt
    ? new Date(lastSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="no-print bg-amber-50 dark:bg-amber-950/50 border-b border-amber-200 dark:border-amber-800/70 text-amber-950 dark:text-amber-100"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs sm:text-sm">
        <div className="flex items-start sm:items-center gap-2.5 min-w-0">
          <WifiOff
            className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <span className="font-semibold">
              {isOffline ? 'You are offline.' : 'Connection interrupted.'}
            </span>{' '}
            <span className="text-amber-900/90 dark:text-amber-200/90">
              Cached content is available — you can continue reading saved courses, syllabus units,
              study notes, and PYQ papers
              {syncedLabel ? ` (last synced ${syncedLabel})` : ''}. Uploads and contact forms will
              resume once you reconnect.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={handleRetry}
            disabled={retrying}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-amber-300 dark:border-amber-700 bg-white/80 dark:bg-amber-900/40 text-xs font-medium text-amber-950 dark:text-amber-100 hover:bg-white dark:hover:bg-amber-900/70 disabled:opacity-60 transition-colors whitespace-nowrap"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${retrying ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span>{retrying ? 'Checking...' : 'Retry'}</span>
          </button>
          <button
            type="button"
            onClick={() => setDismissedOffline(true)}
            aria-label="Dismiss offline notice"
            className="p-1 rounded text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
