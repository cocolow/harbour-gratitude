import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BANNER_MESSAGES } from '../constants';
import { formatDayLabel, toDateKey } from '../lib/dates';
import { getJarProgressLabel } from '../lib/jar';
import { AppShell } from '../components/AppShell';
import { EntryCard } from '../components/EntryCard';
import { Fab } from '../components/Fab';
import { OrganicJar } from '../components/OrganicJar';
import { HEADER_ICON_CHIP_CLASS, headerIconChipStyle } from '../components/HeaderIconChip';
import { ThemeToggle } from '../components/ThemeToggle';
import { WavyDivider } from '../components/WavyDivider';
import { useAppData } from '../context/AppProvider';
import { useAppTheme } from '../theme/useAppTheme';

function GearIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function HomePage() {
  const { tokens: t } = useAppTheme();
  const navigate = useNavigate();
  const {
    jar,
    settings,
    jarTarget,
    recentEntries,
    showQuietBanner,
    dismissQuietBanner,
    getCategoryLabel,
  } = useAppData();

  useEffect(() => {
    if (jar.currentCount >= jarTarget) {
      navigate('/celebration', { replace: true });
    }
  }, [jar.currentCount, jarTarget, navigate]);

  const todayLabel = formatDayLabel(toDateKey(new Date().toISOString()));
  const progressLabel = getJarProgressLabel(jar.currentCount, jarTarget, settings.rewardLabel);
  const cycleLabel = jar.redemptionCount === 0 ? 'first cycle' : 'reward cycle';
  const bannerMessage = BANNER_MESSAGES[jar.currentCount % BANNER_MESSAGES.length];

  return (
    <>
      <AppShell withFabSpace>
        <header className="mb-6 flex items-start justify-between">
          <div>
            <h1
              style={{
                fontFamily: t.fonts.display,
                color: t.colors.accent,
                fontSize: '2.25rem',
                lineHeight: 1.1,
                transform: 'rotate(-1deg)',
              }}
            >
              your wins
            </h1>
            <p style={{ color: t.colors.textMuted }} className="mt-1 text-sm tracking-wide">
              {todayLabel}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Link
              to="/settings"
              style={headerIconChipStyle(t, 2)}
              className={HEADER_ICON_CHIP_CLASS}
              aria-label="Settings"
            >
              <GearIcon />
            </Link>
          </div>
        </header>

        {showQuietBanner && (
          <div
            className="mb-6 flex items-start gap-3 p-4"
            style={{
              backgroundColor: t.colors.bgElevated,
              borderRadius: '1.25rem 1.5rem 1.25rem 1.75rem',
              border: `1.5px dashed ${t.colors.accentMuted}`,
            }}
            role="status"
          >
            <p className="flex-1 text-sm leading-relaxed">{bannerMessage}</p>
            <button
              type="button"
              onClick={() => dismissQuietBanner()}
              style={{ color: t.colors.textMuted }}
              className="shrink-0 text-xs underline-offset-2 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <div
          style={{
            backgroundColor: t.colors.bgElevated,
            borderRadius: '1.75rem 1.25rem 1.5rem 2rem',
            boxShadow: t.shadow,
            border: `1.5px solid ${t.colors.accentMuted}`,
            transform: 'rotate(-0.5deg)',
          }}
          className="mb-6 flex w-full items-center gap-4 p-5"
        >
          <OrganicJar
            fill={t.colors.jarFill}
            empty={t.colors.jarEmpty}
            level={jar.currentCount}
            target={jarTarget}
          />
          <div>
            <p
              style={{ fontFamily: t.fonts.display, fontSize: '1.35rem', color: t.colors.text }}
              className="leading-tight"
            >
              {jar.currentCount} / {jarTarget}
            </p>
            <p style={{ color: t.colors.textMuted }} className="mt-0.5 text-xs tracking-wide">
              until {settings.rewardLabel} · {cycleLabel}
            </p>
            <p style={{ color: t.colors.textMuted }} className="mt-1 text-[10px]">
              {progressLabel}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/bad-day')}
          style={{
            background: `linear-gradient(135deg, ${t.colors.badDay} 0%, ${t.colors.fab} 100%)`,
            color: '#fff9f4',
            borderRadius: '2rem 1.5rem 2rem 1.75rem',
            fontFamily: t.fonts.display,
            fontSize: '1.2rem',
            transform: 'rotate(0.6deg)',
          }}
          className="mb-6 w-full py-3.5"
        >
          having a rough day?
        </button>

        <WavyDivider color={t.colors.accent} />

        <h2
          style={{ color: t.colors.textMuted }}
          className="mb-4 text-xs font-medium uppercase tracking-[0.2em]"
        >
          Recent
        </h2>

        {recentEntries.length === 0 ? (
          <p style={{ color: t.colors.textMuted }} className="text-sm leading-relaxed">
            Looking forward to seeing your wins here. Tap + when something goes well.
          </p>
        ) : (
          <ul className="space-y-4">
            {recentEntries.map((entry, i) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                categoryLabel={getCategoryLabel(entry.categoryId)}
                tilt={i % 2 === 0 ? -1.2 : 0.9}
              />
            ))}
          </ul>
        )}
      </AppShell>
      <Fab />
    </>
  );
}
