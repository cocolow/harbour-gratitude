import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { EntryCard } from '../components/EntryCard';
import { useAppData } from '../context/AppProvider';
import { useAppTheme } from '../theme/useAppTheme';

export function FollowUpPage() {
  const { tokens: t } = useAppTheme();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const entryId = params.get('entryId');
  const { entries, pickRandomEntries, getCategoryLabel } = useAppData();

  const surfacedWins = useMemo(() => {
    const recent = entries.filter((e) => e.id !== entryId).slice(0, 3);
    if (recent.length >= 2) return recent.slice(0, 3);
    return pickRandomEntries(3, entryId ?? undefined);
  }, [entries, entryId, pickRandomEntries]);

  return (
    <AppShell>
      <div className="mb-8">
        <p
          style={{
            fontFamily: t.fonts.display,
            color: t.colors.accent,
            fontSize: '1.75rem',
            lineHeight: 1.2,
          }}
        >
          It&apos;s ok to not feel ok
        </p>
        <p style={{ color: t.colors.textMuted }} className="mt-3 text-sm leading-relaxed">
          Thanks for being honest. That counts too. Here are a few wins you&apos;ve logged before —
          no pressure to feel better, just a gentle reminder.
        </p>
      </div>

      {surfacedWins.length === 0 ? (
        <p style={{ color: t.colors.textMuted }} className="text-sm">
          When you capture more wins, they&apos;ll show up here on harder days.
        </p>
      ) : (
        <ul className="space-y-4">
          {surfacedWins.map((entry, i) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              categoryLabel={getCategoryLabel(entry.categoryId)}
              tilt={i % 2 === 0 ? -0.8 : 0.6}
            />
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => navigate('/')}
        style={{
          backgroundColor: t.colors.fab,
          color: '#fff',
          borderRadius: t.radius.button,
          fontFamily: t.fonts.display,
          fontSize: '1.15rem',
        }}
        className="mt-8 w-full py-3"
      >
        Back home
      </button>
    </AppShell>
  );
}
