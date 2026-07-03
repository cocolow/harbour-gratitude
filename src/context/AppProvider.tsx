import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { QUIET_DAYS_BANNER, RECENT_FEED_LIMIT } from '../constants';
import {
  getAllEntries,
  getJarState,
  getSettings,
  initDb,
  putEntry,
  putJarState,
  putSettings,
  updateEntry,
} from '../lib/db';
import { daysSinceLastEntry } from '../lib/dates';
import { logEvent } from '../lib/events';
import { looksNegative } from '../lib/negative';
import { getJarTarget } from '../lib/jar';
import type { AppSettings, Entry, JarState } from '../types';
import { isBigWin } from '../types';

interface SaveEntryInput {
  text: string;
  categoryId?: string;
  starred: boolean;
}

interface AppContextValue {
  ready: boolean;
  entries: Entry[];
  settings: AppSettings;
  jar: JarState;
  recentEntries: Entry[];
  bigWins: Entry[];
  jarTarget: number;
  showQuietBanner: boolean;
  saveEntry: (input: SaveEntryInput) => Promise<{ entry: Entry; jarFull: boolean; isNegative: boolean }>;
  redeemJar: () => Promise<void>;
  dismissQuietBanner: () => Promise<void>;
  incrementReRead: (entryId: string) => Promise<Entry | null>;
  updateSettings: (partial: Partial<AppSettings>) => Promise<void>;
  refreshSettings: () => Promise<void>;
  getCategoryLabel: (categoryId?: string) => string | undefined;
  pickRandomEntries: (count: number, excludeId?: string) => Entry[];
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [jar, setJar] = useState<JarState | null>(null);

  useEffect(() => {
    initDb()
      .then(() => Promise.all([getAllEntries(), getSettings(), getJarState()]))
      .then(([loadedEntries, loadedSettings, loadedJar]) => {
        setEntries(loadedEntries);
        setSettings(loadedSettings);
        setJar(loadedJar);
        setReady(true);
      });
  }, []);

  const getCategoryLabel = useCallback(
    (categoryId?: string) => settings?.categories.find((c) => c.id === categoryId)?.label,
    [settings],
  );

  const jarTarget = jar && settings ? getJarTarget(jar, settings.jarSize) : 8;

  const recentEntries = useMemo(
    () => entries.slice(0, RECENT_FEED_LIMIT),
    [entries],
  );

  const bigWins = useMemo(
    () => entries.filter(isBigWin),
    [entries],
  );

  const showQuietBanner = useMemo(() => {
    if (!jar || entries.length === 0) return false;
    const days = daysSinceLastEntry(entries);
    if (days === null || days < QUIET_DAYS_BANNER) return false;
    const latest = entries[0];
    return jar.bannerDismissedForQuietSince !== latest.createdAt;
  }, [entries, jar]);

  const pickRandomEntries = useCallback(
    (count: number, excludeId?: string) => {
      const pool = entries.filter((e) => e.id !== excludeId);
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    },
    [entries],
  );

  const saveEntry = useCallback(
    async (input: SaveEntryInput) => {
      if (!settings || !jar) throw new Error('App not ready');

      const entry: Entry = {
        id: crypto.randomUUID(),
        text: input.text.trim(),
        createdAt: new Date().toISOString(),
        categoryId: input.categoryId,
        starred: input.starred,
        reReadCount: 0,
      };

      const nextJar: JarState = {
        ...jar,
        currentCount: jar.currentCount + 1,
        bannerDismissedForQuietSince: null,
      };

      await putEntry(entry);
      await putJarState(nextJar);
      await logEvent('capture', {
        entryId: entry.id,
        categoryId: entry.categoryId,
        starred: entry.starred,
      });

      const target = getJarTarget(nextJar, settings.jarSize);
      const jarFull = nextJar.currentCount >= target;
      if (jarFull) {
        await logEvent('jar_fill', { count: nextJar.currentCount, target });
      }

      setEntries((prev) => [entry, ...prev]);
      setJar(nextJar);

      return { entry, jarFull, isNegative: looksNegative(entry.text) };
    },
    [jar, settings],
  );

  const redeemJar = useCallback(async () => {
    if (!jar) return;
    const nextJar: JarState = {
      currentCount: 0,
      redemptionCount: jar.redemptionCount + 1,
      redemptionDates: [...jar.redemptionDates, new Date().toISOString()],
      bannerDismissedForQuietSince: jar.bannerDismissedForQuietSince,
    };
    await putJarState(nextJar);
    await logEvent('redemption', { redemptionCount: nextJar.redemptionCount });
    setJar(nextJar);
  }, [jar]);

  const dismissQuietBanner = useCallback(async () => {
    if (!jar || entries.length === 0) return;
    const nextJar: JarState = {
      ...jar,
      bannerDismissedForQuietSince: entries[0].createdAt,
    };
    await putJarState(nextJar);
    await logEvent('banner_dismiss');
    setJar(nextJar);
  }, [entries, jar]);

  const incrementReRead = useCallback(async (entryId: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry) return null;
    const updated: Entry = { ...entry, reReadCount: entry.reReadCount + 1 };
    await updateEntry(updated);
    await logEvent('re_read', { entryId });
    setEntries((prev) => prev.map((e) => (e.id === entryId ? updated : e)));
    return updated;
  }, [entries]);

  const updateSettingsFn = useCallback(async (partial: Partial<AppSettings>) => {
    if (!settings) return;
    const next = { ...settings, ...partial };
    await putSettings(next);
    setSettings(next);
  }, [settings]);

  const refreshSettings = useCallback(async () => {
    const next = await getSettings();
    setSettings(next);
  }, []);

  const value = useMemo<AppContextValue | null>(() => {
    if (!settings || !jar) return null;
    return {
      ready,
      entries,
      settings,
      jar,
      recentEntries,
      bigWins,
      jarTarget,
      showQuietBanner,
      saveEntry,
      redeemJar,
      dismissQuietBanner,
      incrementReRead,
      updateSettings: updateSettingsFn,
      refreshSettings,
      getCategoryLabel,
      pickRandomEntries,
    };
  }, [
    ready,
    entries,
    settings,
    jar,
    recentEntries,
    bigWins,
    jarTarget,
    showQuietBanner,
    saveEntry,
    redeemJar,
    dismissQuietBanner,
    incrementReRead,
    updateSettingsFn,
    refreshSettings,
    getCategoryLabel,
    pickRandomEntries,
  ]);

  if (!value) {
    return (
      <div className="flex min-h-full items-center justify-center bg-app-bg text-app-text-muted">
        Loading…
      </div>
    );
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppData(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppData must be used within AppProvider');
  return ctx;
}
