import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import {
  DEFAULT_JAR_SIZE,
  DEFAULT_REWARD_LABEL,
  PRESET_CATEGORY_LABELS,
} from '../constants';
import type { AppEvent, AppSettings, Entry, JarState } from '../types';

const DB_NAME = 'achievement-tracker';
const DB_VERSION = 1;
const SETTINGS_KEY = 'settings';
const JAR_KEY = 'jar';

interface AchievementDB extends DBSchema {
  entries: {
    key: string;
    value: Entry;
    indexes: { 'by-createdAt': string };
  };
  settings: {
    key: string;
    value: AppSettings;
  };
  jar: {
    key: string;
    value: JarState;
  };
  events: {
    key: string;
    value: AppEvent;
    indexes: { 'by-timestamp': string };
  };
}

let dbPromise: Promise<IDBPDatabase<AchievementDB>> | null = null;

function createDefaultSettings(): AppSettings {
  return {
    categories: PRESET_CATEGORY_LABELS.map((label) => ({
      id: label.toLowerCase().replace(/\s+/g, '-'),
      label,
      isPreset: true,
    })),
    jarSize: DEFAULT_JAR_SIZE,
    rewardLabel: DEFAULT_REWARD_LABEL,
    lastExportAt: null,
    themeMode: 'system',
  };
}

function createDefaultJar(): JarState {
  return {
    currentCount: 0,
    redemptionCount: 0,
    redemptionDates: [],
    bannerDismissedForQuietSince: null,
  };
}

export function getDb(): Promise<IDBPDatabase<AchievementDB>> {
  if (!dbPromise) {
    dbPromise = openDB<AchievementDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const entries = db.createObjectStore('entries', { keyPath: 'id' });
        entries.createIndex('by-createdAt', 'createdAt');

        db.createObjectStore('settings');
        db.createObjectStore('jar');

        const events = db.createObjectStore('events', { keyPath: 'id' });
        events.createIndex('by-timestamp', 'timestamp');
      },
    });
  }
  return dbPromise;
}

export async function initDb(): Promise<void> {
  const db = await getDb();
  const tx = db.transaction(['settings', 'jar'], 'readwrite');
  const settingsStore = tx.objectStore('settings');
  const jarStore = tx.objectStore('jar');

  if (!(await settingsStore.get(SETTINGS_KEY))) {
    await settingsStore.put(createDefaultSettings(), SETTINGS_KEY);
  }
  if (!(await jarStore.get(JAR_KEY))) {
    await jarStore.put(createDefaultJar(), JAR_KEY);
  }
  await tx.done;
}

export async function getAllEntries(): Promise<Entry[]> {
  const db = await getDb();
  const entries = await db.getAll('entries');
  return entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function putEntry(entry: Entry): Promise<void> {
  const db = await getDb();
  await db.put('entries', entry);
}

export async function updateEntry(entry: Entry): Promise<void> {
  await putEntry(entry);
}

export async function getSettings(): Promise<AppSettings> {
  const db = await getDb();
  const stored = await db.get('settings', SETTINGS_KEY);
  if (!stored) return createDefaultSettings();
  const defaults = createDefaultSettings();
  return { ...defaults, ...stored, themeMode: stored.themeMode ?? defaults.themeMode };
}

export async function putSettings(settings: AppSettings): Promise<void> {
  const db = await getDb();
  await db.put('settings', settings, SETTINGS_KEY);
}

export async function getJarState(): Promise<JarState> {
  const db = await getDb();
  return (await db.get('jar', JAR_KEY)) ?? createDefaultJar();
}

export async function putJarState(jar: JarState): Promise<void> {
  const db = await getDb();
  await db.put('jar', jar, JAR_KEY);
}

export async function appendEvent(event: AppEvent): Promise<void> {
  const db = await getDb();
  await db.add('events', event);
}

export async function getAllEvents(): Promise<AppEvent[]> {
  const db = await getDb();
  const events = await db.getAll('events');
  return events.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

export async function exportAppData(): Promise<string> {
  const [entries, settings, jar, events] = await Promise.all([
    getAllEntries(),
    getSettings(),
    getJarState(),
    getAllEvents(),
  ]);
  return JSON.stringify({ entries, settings, jar, events, exportedAt: new Date().toISOString() }, null, 2);
}
