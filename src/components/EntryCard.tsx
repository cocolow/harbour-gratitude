import { formatEntryTime } from '../lib/dates';
import { useAppTheme } from '../theme/useAppTheme';
import type { Entry } from '../types';

interface EntryCardProps {
  entry: Entry;
  categoryLabel?: string;
  tilt?: number;
}

export function EntryCard({ entry, categoryLabel, tilt = 0 }: EntryCardProps) {
  const { tokens: t } = useAppTheme();
  return (
    <li
      style={{
        backgroundColor: t.colors.bgElevated,
        borderRadius: '1.25rem 1.75rem 1.5rem 1.25rem',
        border: `1px solid ${t.colors.jarEmpty}`,
        boxShadow: t.shadow,
        transform: `rotate(${tilt}deg)`,
      }}
      className="p-4"
    >
      <p className="text-sm leading-relaxed">{entry.text}</p>
      <div className="mt-2 flex items-center gap-2 text-xs" style={{ color: t.colors.textMuted }}>
        {categoryLabel && (
          <span
            style={{
              backgroundColor: t.colors.chip,
              borderRadius: '0.75rem 1rem 0.75rem 1rem',
              padding: '2px 10px',
            }}
          >
            {categoryLabel}
          </span>
        )}
        <span>{formatEntryTime(entry.createdAt)}</span>
        {entry.starred && (
          <span style={{ color: t.colors.jarFill, fontFamily: t.fonts.display, fontSize: '1rem' }}>
            ★
          </span>
        )}
      </div>
    </li>
  );
}
