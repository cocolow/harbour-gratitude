import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FIRST_JAR_SIZE } from '../constants';
import { downloadJsonExport, shouldShowBackupNudge } from '../lib/export';
import { AppShell } from '../components/AppShell';
import { useAppData } from '../context/AppProvider';
import { useAppTheme } from '../theme/useAppTheme';
import type { ThemeMode } from '../types';

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export function SettingsPage() {
  const { tokens: t } = useAppTheme();
  const { settings, jar, updateSettings, refreshSettings } = useAppData();
  const [rewardLabel, setRewardLabel] = useState(settings.rewardLabel);
  const [saved, setSaved] = useState(false);
  const showNudge = shouldShowBackupNudge(settings.lastExportAt);

  async function handleSaveLabel() {
    const trimmed = rewardLabel.trim() || settings.rewardLabel;
    await updateSettings({ rewardLabel: trimmed });
    setRewardLabel(trimmed);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleExport() {
    await downloadJsonExport();
    await refreshSettings();
  }

  const jarSizeNote =
    jar.redemptionCount === 0
      ? `First cycle: ${FIRST_JAR_SIZE} wins, then ${settings.jarSize} per cycle`
      : `Current cycle: ${settings.jarSize} wins until reward`;

  return (
    <AppShell>
      <header className="mb-8 flex items-center gap-4">
        <Link to="/" style={{ color: t.colors.textMuted }} className="text-sm">
          ← Home
        </Link>
        <h1
          style={{ fontFamily: t.fonts.display, color: t.colors.accent, fontSize: '1.75rem' }}
        >
          settings
        </h1>
      </header>

      {showNudge && (
        <div
          className="mb-6 p-4"
          style={{
            backgroundColor: t.colors.surface,
            borderRadius: '1.25rem 1.5rem 1.25rem 1.75rem',
            border: `1.5px dashed ${t.colors.accentMuted}`,
          }}
        >
          <p className="text-sm leading-relaxed">
            Your wins live on this device only. Export a backup when you can — it only takes a
            moment.
          </p>
          <button
            type="button"
            onClick={handleExport}
            style={{
              backgroundColor: t.colors.fab,
              color: '#fff',
              borderRadius: t.radius.button,
            }}
            className="mt-3 px-4 py-2 text-sm font-medium"
          >
            Export backup now
          </button>
        </div>
      )}

      <section className="mb-8">
        <label
          htmlFor="reward-label"
          className="mb-2 block text-xs uppercase tracking-[0.15em]"
          style={{ color: t.colors.textMuted }}
        >
          Reward label
        </label>
        <div className="flex gap-2">
          <input
            id="reward-label"
            value={rewardLabel}
            onChange={(e) => setRewardLabel(e.target.value)}
            style={{
              backgroundColor: t.colors.bgElevated,
              border: `1.5px dashed ${t.colors.accentMuted}`,
              borderRadius: '1rem',
              color: t.colors.text,
            }}
            className="flex-1 px-3 py-2 text-sm outline-none"
          />
          <button
            type="button"
            onClick={handleSaveLabel}
            style={{
              backgroundColor: t.colors.fab,
              color: '#fff',
              borderRadius: t.radius.button,
            }}
            className="px-4 py-2 text-sm"
          >
            Save
          </button>
        </div>
        {saved && (
          <p style={{ color: t.colors.textMuted }} className="mt-2 text-xs">
            Saved
          </p>
        )}
      </section>

      <section className="mb-8">
        <h2
          className="mb-2 text-xs uppercase tracking-[0.15em]"
          style={{ color: t.colors.textMuted }}
        >
          Jar size
        </h2>
        <p className="text-sm leading-relaxed">{jarSizeNote}</p>
        <p style={{ color: t.colors.textMuted }} className="mt-2 text-xs">
          Redemptions so far: {jar.redemptionCount}
        </p>
      </section>

      <section className="mb-8">
        <h2
          className="mb-3 text-xs uppercase tracking-[0.15em]"
          style={{ color: t.colors.textMuted }}
        >
          Appearance
        </h2>
        <div
          className="inline-flex gap-1 p-1"
          style={{
            backgroundColor: t.colors.chip,
            borderRadius: t.radius.button,
          }}
          role="group"
          aria-label="Theme preference"
        >
          {THEME_OPTIONS.map((opt) => {
            const active = settings.themeMode === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateSettings({ themeMode: opt.value })}
                style={{
                  backgroundColor: active ? t.colors.chipActive : 'transparent',
                  color: active ? t.colors.text : t.colors.textMuted,
                  borderRadius: t.radius.chip,
                }}
                className="px-3 py-1.5 text-sm"
                aria-pressed={active}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        <p style={{ color: t.colors.textMuted }} className="mt-2 text-xs">
          System follows your device&apos;s light or dark preference.
        </p>
      </section>

      <section className="mb-8">
        <h2
          className="mb-2 text-xs uppercase tracking-[0.15em]"
          style={{ color: t.colors.textMuted }}
        >
          Data export
        </h2>
        <p className="mb-3 text-sm leading-relaxed">
          Download all entries, settings, jar state, and events as JSON.
        </p>
        <button
          type="button"
          onClick={handleExport}
          style={{
            backgroundColor: t.colors.bgElevated,
            border: `1.5px solid ${t.colors.accentMuted}`,
            borderRadius: t.radius.button,
            color: t.colors.text,
          }}
          className="px-4 py-2 text-sm"
        >
          Export JSON
        </button>
        {settings.lastExportAt && (
          <p style={{ color: t.colors.textMuted }} className="mt-2 text-xs">
            Last export: {new Date(settings.lastExportAt).toLocaleDateString()}
          </p>
        )}
      </section>

      <section
        className="mt-10 border-t pt-6"
        style={{ borderColor: t.colors.jarEmpty }}
      >
        <p style={{ color: t.colors.textMuted }} className="text-xs">
          Design reference:{' '}
          <Link to="/design/d" className="underline-offset-2 hover:underline">
            Gentle Words (D)
          </Link>
        </p>
      </section>
    </AppShell>
  );
}
