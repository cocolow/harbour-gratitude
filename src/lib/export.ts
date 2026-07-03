import { exportAppData, getSettings, putSettings } from './db';
import { logEvent } from './events';

export async function downloadJsonExport(): Promise<void> {
  const json = await exportAppData();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `achievement-tracker-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);

  const settings = await getSettings();
  await putSettings({ ...settings, lastExportAt: new Date().toISOString() });
  await logEvent('export');
}

export function shouldShowBackupNudge(lastExportAt: string | null): boolean {
  if (!lastExportAt) return true;
  const daysSinceExport = Math.floor(
    (Date.now() - new Date(lastExportAt).getTime()) / (1000 * 60 * 60 * 24),
  );
  return daysSinceExport >= 30;
}
