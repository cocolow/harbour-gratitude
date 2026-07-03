import { useEffect, useState } from 'react';
import { DESIGN_D, DESIGN_D_DARK, type DesignTokens } from '../design/tokens';
import { useAppData } from '../context/AppProvider';
import type { ThemeMode } from '../types';

export type ResolvedTheme = 'light' | 'dark';

const THEME_COLORS: Record<ResolvedTheme, string> = {
  light: DESIGN_D.colors.bg,
  dark: DESIGN_D_DARK.colors.bg,
};

function resolveTheme(mode: ThemeMode, systemDark: boolean): ResolvedTheme {
  if (mode === 'dark') return 'dark';
  if (mode === 'light') return 'light';
  return systemDark ? 'dark' : 'light';
}

function useSystemDark(): boolean {
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return systemDark;
}

export function useResolvedTheme(mode: ThemeMode = 'system'): ResolvedTheme {
  const systemDark = useSystemDark();
  return resolveTheme(mode, systemDark);
}

export function useAppTheme(): { tokens: DesignTokens; resolved: ResolvedTheme; isDark: boolean } {
  const { settings } = useAppData();
  const resolved = useResolvedTheme(settings.themeMode);
  const tokens = resolved === 'dark' ? DESIGN_D_DARK : DESIGN_D;
  return { tokens, resolved, isDark: resolved === 'dark' };
}

/** Applies `data-theme` and PWA theme-color from settings — mount inside AppProvider. */
export function ThemeManager() {
  const { settings } = useAppData();
  const resolved = useResolvedTheme(settings.themeMode);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.themeMode === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', settings.themeMode);
    }

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', THEME_COLORS[resolved]);
    }
  }, [settings.themeMode, resolved]);

  return null;
}
