import { formatEntryTime } from '../lib/dates';
import { arcadeCardStyle, arcadeCategoryChipStyle } from '../design/arcadeStyles';
import { MOTION } from '../design/tokens';
import { useAppTheme } from '../theme/useAppTheme';
import { useReducedMotion } from '../theme/useReducedMotion';
import type { Entry } from '../types';

const CLAMP_CHAR_THRESHOLD = 78;

interface EntryCardProps {
  entry: Entry;
  categoryLabel?: string;
  index?: number;
  onOpen?: (entry: Entry) => void;
}

export function EntryCard({ entry, categoryLabel, index = 0, onOpen }: EntryCardProps) {
  const { tokens: t } = useAppTheme();
  const reducedMotion = useReducedMotion();
  const isLong = entry.text.length > CLAMP_CHAR_THRESHOLD;
  const isInteractive = Boolean(onOpen);

  const entranceStyle = reducedMotion
    ? { animation: `rmFade ${MOTION.duration.rmFade}ms ease both`, animationDelay: `${index * 60}ms` }
    : {
        animation: `bSlam ${MOTION.duration.cardEntrance}ms ${MOTION.ease} both`,
        animationDelay: `${index * MOTION.duration.cardStagger}ms`,
      };

  return (
    <li
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? () => onOpen?.(entry) : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpen?.(entry);
              }
            }
          : undefined
      }
      style={{
        ...arcadeCardStyle(t),
        cursor: isInteractive ? 'pointer' : undefined,
        ...entranceStyle,
      }}
      className="p-4"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        {categoryLabel ? (
          <span
            style={{
              backgroundColor: t.colors.chip,
              ...arcadeCategoryChipStyle(t),
            }}
          >
            {categoryLabel}
          </span>
        ) : (
          <span />
        )}
        {entry.starred && (
          <span
            style={{ color: t.colors.jarFill, fontFamily: t.fonts.display, fontSize: '1rem' }}
            aria-label="Starred"
          >
            ★
          </span>
        )}
      </div>

      <p
        className="text-sm leading-relaxed"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {entry.text}
      </p>

      {isLong && isInteractive && (
        <p
          style={{ color: t.colors.accent, fontSize: '12.5px', fontWeight: 500 }}
          className="mt-2"
        >
          read full win →
        </p>
      )}

      <p style={{ color: t.colors.textMuted }} className="mt-2 text-xs">
        {formatEntryTime(entry.createdAt)}
      </p>
    </li>
  );
}
