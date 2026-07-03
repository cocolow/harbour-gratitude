export interface Entry {
  id: string;
  text: string;
  createdAt: string;
  categoryId?: string;
  starred: boolean;
  reReadCount: number;
}

export interface Category {
  id: string;
  label: string;
  isPreset: boolean;
}

export type ThemeMode = 'system' | 'light' | 'dark';

export interface AppSettings {
  categories: Category[];
  jarSize: number;
  rewardLabel: string;
  lastExportAt: string | null;
  themeMode: ThemeMode;
}

export type EventType =
  | 'capture'
  | 're_read'
  | 'bad_day_open'
  | 'jar_fill'
  | 'redemption'
  | 'export'
  | 'banner_dismiss';

export interface AppEvent {
  id: string;
  type: EventType;
  timestamp: string;
  meta?: Record<string, unknown>;
}

export interface JarState {
  currentCount: number;
  redemptionCount: number;
  redemptionDates: string[];
  bannerDismissedForQuietSince: string | null;
}

export interface AppData {
  entries: Entry[];
  settings: AppSettings;
  jar: JarState;
}

export function isBigWin(entry: Entry): boolean {
  return entry.starred && entry.reReadCount >= 2;
}
