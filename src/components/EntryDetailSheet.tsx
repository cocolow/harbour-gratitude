import { useEffect } from 'react';
import { formatEntryTime } from '../lib/dates';
import { arcadeCategoryChipStyle, arcadeGhostButton } from '../design/arcadeStyles';
import { MOTION } from '../design/tokens';
import { useAppTheme } from '../theme/useAppTheme';
import { useReducedMotion } from '../theme/useReducedMotion';
import type { Entry } from '../types';

interface EntryDetailSheetProps {
  entry: Entry;
  categoryLabel?: string;
  onClose: () => void;
}

export function EntryDetailSheet({ entry, categoryLabel, onClose }: EntryDetailSheetProps) {
  const { tokens: t } = useAppTheme();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const slideMs = reducedMotion ? MOTION.duration.rmFade : MOTION.duration.sheetSlide;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(45, 74, 74, 0.32)',
          animation: reducedMotion
            ? `rmFade ${MOTION.duration.rmFade}ms ease forwards`
            : `backdropFade 200ms ${MOTION.easeStandard} forwards`,
        }}
        aria-label="Close entry detail"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="entry-detail-text"
        className="relative w-full max-w-[430px] px-5 pb-8 pt-3"
        style={{
          backgroundColor: t.colors.bgElevated,
          borderRadius: `${t.radius.card} ${t.radius.card} 0 0`,
          border: `3px solid ${t.colors.text}`,
          borderBottom: 'none',
          boxShadow: `0 -5px 0 ${t.colors.text}`,
          animation: reducedMotion
            ? `rmFade ${slideMs}ms ease forwards`
            : `slideUp ${slideMs}ms ${MOTION.easeStandard} forwards`,
        }}
      >
        <div
          className="mx-auto mb-4"
          style={{
            width: 40,
            height: 4,
            borderRadius: 2,
            backgroundColor: t.colors.accentMuted,
          }}
          aria-hidden
        />

        <div className="mb-4 flex items-center justify-between gap-2">
          {categoryLabel && (
            <span
              style={{
                backgroundColor: t.colors.chip,
                ...arcadeCategoryChipStyle(t),
              }}
            >
              {categoryLabel}
            </span>
          )}
          {entry.starred && (
            <span
              style={{ color: t.colors.jarFill, fontFamily: t.fonts.display, fontSize: '1.25rem' }}
              aria-label="Starred"
            >
              ★
            </span>
          )}
        </div>

        <p
          id="entry-detail-text"
          className="mb-2 text-base leading-relaxed"
          style={{ lineHeight: 1.6 }}
        >
          {entry.text}
        </p>
        <p style={{ color: t.colors.textMuted }} className="mb-6 text-xs">
          {formatEntryTime(entry.createdAt)}
        </p>

        <button
          type="button"
          onClick={onClose}
          style={arcadeGhostButton(t)}
          className="w-full py-2.5 text-sm"
        >
          close
        </button>
      </div>
    </div>
  );
}
