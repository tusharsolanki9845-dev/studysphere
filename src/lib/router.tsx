import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface RouterContextValue {
  pathname: string;
  search: string;
  navigate: (to: string) => void;
  getParam: (key: string) => string | null;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function parseLocation(): { pathname: string; search: string } {
  if (typeof window === 'undefined') {
    return { pathname: '/', search: '' };
  }
  const cleanPath = window.location.pathname.replace(/\/+$/, '') || '/';
  return {
    pathname: cleanPath,
    search: window.location.search,
  };
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [loc, setLoc] = useState(parseLocation);

  useEffect(() => {
    const onPopState = () => {
      setLoc(parseLocation());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (typeof window === 'undefined') return;
    const url = new URL(to, window.location.origin);
    const nextPath = url.pathname.replace(/\/+$/, '') || '/';
    const nextSearch = url.search;
    if (nextPath !== window.location.pathname || nextSearch !== window.location.search) {
      window.history.pushState({}, '', `${nextPath}${nextSearch}`);
    }
    setLoc({ pathname: nextPath, search: nextSearch });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getParam = useCallback(
    (key: string) => {
      const params = new URLSearchParams(loc.search);
      return params.get(key);
    },
    [loc.search]
  );

  return (
    <RouterContext.Provider value={{ pathname: loc.pathname, search: loc.search, navigate, getParam }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used inside RouterProvider');
  }
  return ctx;
}

interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  children: React.ReactNode;
}

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onClick?.(e);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
