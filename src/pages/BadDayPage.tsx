import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatEntryTime } from '../lib/dates';
import { logEvent } from '../lib/events';
import { AppShell } from '../components/AppShell';
import { WavyDivider } from '../components/WavyDivider';
import { useAppData } from '../context/AppProvider';
import { useAppTheme } from '../theme/useAppTheme';
import { isBigWin } from '../types';

export function BadDayPage() {
  const { tokens: t } = useAppTheme();
  const navigate = useNavigate();
  const { entries, bigWins, getCategoryLabel, incrementReRead } = useAppData();
  const [index, setIndex] = useState(0);
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());

  const carouselEntries = useMemo(() => {
    if (bigWins.length > 0) return bigWins;
    const starred = entries.filter((e) => e.starred);
    if (starred.length > 0) return starred;
    return [];
  }, [bigWins, entries]);

  const randomWin = useMemo(() => {
    if (entries.length === 0) return null;
    return entries[Math.floor(Math.random() * entries.length)];
  }, [entries]);

  useEffect(() => {
    logEvent('bad_day_open');
  }, []);

  useEffect(() => {
    const entry = carouselEntries[index];
    if (!entry || viewedIds.has(entry.id)) return;
    incrementReRead(entry.id);
    setViewedIds((prev) => new Set(prev).add(entry.id));
  }, [index, carouselEntries, viewedIds, incrementReRead]);

  const current = carouselEntries[index];

  function goPrev() {
    setIndex((i) => (i === 0 ? carouselEntries.length - 1 : i - 1));
  }

  function goNext() {
    setIndex((i) => (i === carouselEntries.length - 1 ? 0 : i + 1));
  }

  return (
    <AppShell>
      <header className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{ color: t.colors.textMuted }}
          className="text-sm"
        >
          ← Home
        </button>
        <span
          style={{ fontFamily: t.fonts.display, color: t.colors.accent, fontSize: '1.4rem' }}
        >
          you&apos;ve done hard things
        </span>
        <span className="w-12" />
      </header>

      {entries.length === 0 ? (
        <div
          className="p-8 text-center"
          style={{
            backgroundColor: t.colors.bgElevated,
            borderRadius: '2rem 1.5rem 2.5rem 1.75rem',
            border: `2px solid ${t.colors.accentMuted}`,
          }}
        >
          <p
            style={{ fontFamily: t.fonts.display, fontSize: '1.5rem', color: t.colors.text }}
            className="leading-snug"
          >
            Looking forward to seeing your wins here
          </p>
          <p style={{ color: t.colors.textMuted }} className="mt-4 text-sm">
            When you capture a win, it will be here on tough days.
          </p>
        </div>
      ) : carouselEntries.length === 0 ? (
        <div
          className="p-6"
          style={{
            backgroundColor: t.colors.bgElevated,
            borderRadius: '2rem 1.5rem 2.5rem 1.75rem',
            border: `2px solid ${t.colors.accentMuted}`,
          }}
        >
          <p style={{ color: t.colors.textMuted }} className="mb-4 text-sm leading-relaxed">
            Keep starring wins you want to revisit — after you read them here twice, they become
            big wins in this carousel.
          </p>
          {randomWin && (
            <>
              <blockquote
                style={{
                  fontFamily: t.fonts.quote,
                  fontSize: '1.4rem',
                  lineHeight: 1.4,
                  color: t.colors.text,
                }}
              >
                {randomWin.text}
              </blockquote>
              <WavyDivider color={t.colors.jarFill} />
              <p style={{ color: t.colors.textMuted }} className="text-xs uppercase tracking-wide">
                {getCategoryLabel(randomWin.categoryId) ?? 'Win'} ·{' '}
                {formatEntryTime(randomWin.createdAt)}
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          <div
            className="relative p-6"
            style={{
              backgroundColor: t.colors.bgElevated,
              borderRadius: '2rem 1.5rem 2.5rem 1.75rem',
              border: `2px solid ${t.colors.accentMuted}`,
              transform: 'rotate(-0.8deg)',
            }}
          >
            <blockquote
              style={{
                fontFamily: t.fonts.quote,
                color: t.colors.text,
                fontSize: '1.65rem',
                lineHeight: 1.4,
              }}
            >
              {current.text}
            </blockquote>
            <WavyDivider color={t.colors.jarFill} />
            <p
              style={{ color: t.colors.textMuted, letterSpacing: '0.1em' }}
              className="text-xs uppercase"
            >
              {getCategoryLabel(current.categoryId) ?? 'Win'} · {formatEntryTime(current.createdAt)}
              {isBigWin(current) && ' · big win'}
            </p>
          </div>

          {carouselEntries.length > 1 && (
            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={goPrev}
                style={{
                  backgroundColor: t.colors.chip,
                  borderRadius: t.radius.button,
                  color: t.colors.text,
                }}
                className="px-4 py-2 text-sm"
              >
                ← Prev
              </button>
              <span style={{ color: t.colors.textMuted }} className="text-xs">
                {index + 1} / {carouselEntries.length}
              </span>
              <button
                type="button"
                onClick={goNext}
                style={{
                  backgroundColor: t.colors.fab,
                  borderRadius: t.radius.button,
                  color: '#fff',
                }}
                className="px-4 py-2 text-sm"
              >
                Next →
              </button>
            </div>
          )}

          {bigWins.length === 0 && randomWin && (
            <p style={{ color: t.colors.textMuted }} className="mt-6 text-center text-sm">
              Here&apos;s another win, just for today: &ldquo;{randomWin.text.slice(0, 80)}
              {randomWin.text.length > 80 ? '…' : ''}&rdquo;
            </p>
          )}
        </>
      )}
    </AppShell>
  );
}
