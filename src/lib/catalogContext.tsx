import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { INITIAL_CATALOG_DATA } from '../shared/seedData';
import type { CatalogData } from '../shared/types';
import { api } from './api';

const CATALOG_CACHE_KEY = 'studysphere_cached_catalog_v1';
const CATALOG_SYNCED_AT_KEY = 'studysphere_cached_catalog_synced_at_v1';

interface CatalogContextValue {
  catalog: CatalogData;
  loading: boolean;
  error: string | null;
  isOffline: boolean;
  isUsingCache: boolean;
  lastSyncedAt: string | null;
  refresh: () => Promise<void>;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

function readCachedCatalog(): { data: CatalogData; syncedAt: string | null } {
  if (typeof window === 'undefined') {
    return { data: INITIAL_CATALOG_DATA, syncedAt: null };
  }
  try {
    const raw = window.localStorage.getItem(CATALOG_CACHE_KEY);
    const syncedAt = window.localStorage.getItem(CATALOG_SYNCED_AT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CatalogData>;
      if (
        Array.isArray(parsed.courses) &&
        parsed.courses.length >= INITIAL_CATALOG_DATA.courses.length &&
        Array.isArray(parsed.subjects) &&
        parsed.subjects.length >= INITIAL_CATALOG_DATA.subjects.length
      ) {
        return { data: parsed as CatalogData, syncedAt };
      }
    }
  } catch {
    // Fall back safely to bundled catalog if localStorage is unavailable or corrupted
  }
  return { data: INITIAL_CATALOG_DATA, syncedAt: null };
}

function writeCachedCatalog(data: CatalogData): string | null {
  if (typeof window === 'undefined') return null;
  const nowIso = new Date().toISOString();
  try {
    window.localStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify(data));
    window.localStorage.setItem(CATALOG_SYNCED_AT_KEY, nowIso);
    return nowIso;
  } catch {
    return null;
  }
}

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const initialCache = readCachedCatalog();
  const [catalog, setCatalog] = useState<CatalogData>(initialCache.data);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [isUsingCache, setIsUsingCache] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(initialCache.syncedAt);

  const fetchCatalog = useCallback(async (bypassCache: boolean) => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOffline(true);
      setIsUsingCache(true);
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const data = await api.getCatalog({ bypassCache });
      setCatalog(data);
      setIsOffline(false);
      setIsUsingCache(false);
      const synced = writeCachedCatalog(data);
      if (synced) setLastSyncedAt(synced);
    } catch (err) {
      setIsUsingCache(true);
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setIsOffline(true);
      }
      setError(err instanceof Error ? err.message : 'Unable to reach StudySphere server.');
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => fetchCatalog(true), [fetchCatalog]);

  useEffect(() => {
    void fetchCatalog(false);
  }, [fetchCatalog]);

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true);
      setIsUsingCache(true);
    };

    const handleOnline = () => {
      setIsOffline(false);
      void fetchCatalog(true);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [fetchCatalog]);

  return (
    <CatalogContext.Provider
      value={{
        catalog,
        loading,
        error,
        isOffline,
        isUsingCache,
        lastSyncedAt,
        refresh,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error('useCatalog must be used inside CatalogProvider');
  }
  return ctx;
}
