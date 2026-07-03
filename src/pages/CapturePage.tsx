import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { WavyDivider } from '../components/WavyDivider';
import { useAppData } from '../context/AppProvider';
import { useAppTheme } from '../theme/useAppTheme';

export function CapturePage() {
  const { tokens: t } = useAppTheme();
  const navigate = useNavigate();
  const { settings, saveEntry } = useAppData();
  const [text, setText] = useState('');
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [starred, setStarred] = useState(false);
  const [saving, setSaving] = useState(false);

  const canSave = text.trim().length > 0 && !saving;

  async function handleSave() {
    if (!canSave) return;
    setSaving(true);
    try {
      const { jarFull, isNegative, entry } = await saveEntry({ text, categoryId, starred });
      if (jarFull) {
        navigate('/celebration');
      } else if (isNegative) {
        navigate(`/follow-up?entryId=${entry.id}`);
      } else {
        navigate('/');
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell>
      <header className="mb-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{ color: t.colors.textMuted }}
          className="text-sm tracking-wide"
        >
          Cancel
        </button>
        <span
          style={{ fontFamily: t.fonts.display, color: t.colors.accent, fontSize: '1.5rem' }}
        >
          new win
        </span>
        <button
          type="button"
          onClick={handleSave}
          disabled={!canSave}
          style={{
            backgroundColor: canSave ? t.colors.fab : t.colors.accentMuted,
            color: '#fff',
            borderRadius: t.radius.button,
            transform: 'rotate(-1deg)',
            opacity: canSave ? 1 : 0.6,
          }}
          className="px-4 py-1.5 text-sm font-medium"
        >
          Save
        </button>
      </header>

      <label
        htmlFor="win-text"
        style={{ fontFamily: t.fonts.display, color: t.colors.accent, fontSize: '1.25rem' }}
        className="mb-3 block"
      >
        what went well?
      </label>
      <textarea
        id="win-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Take your time…"
        rows={5}
        autoFocus
        style={{
          backgroundColor: t.colors.bgElevated,
          borderRadius: '1.25rem 1.75rem 1.5rem 1rem',
          border: `1.5px dashed ${t.colors.accentMuted}`,
          color: t.colors.text,
          transform: 'rotate(0.4deg)',
        }}
        className="mb-5 w-full resize-none p-4 text-base leading-relaxed outline-none"
      />

      <WavyDivider color={t.colors.accentMuted} />

      <p
        style={{ color: t.colors.textMuted }}
        className="mb-3 text-xs uppercase tracking-[0.15em]"
      >
        Category
      </p>
      <div className="mb-6 flex flex-wrap gap-2">
        {settings.categories.map((cat, i) => {
          const active = categoryId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryId(active ? undefined : cat.id)}
              style={{
                backgroundColor: active ? t.colors.chipActive : t.colors.chip,
                color: t.colors.text,
                borderRadius: i % 2 === 0 ? '1rem 1.5rem 1rem 1.25rem' : '1.25rem 1rem 1.5rem 1rem',
                transform: `rotate(${i % 2 === 0 ? -0.8 : 0.6}deg)`,
              }}
              className="px-3 py-1.5 text-xs"
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setStarred((s) => !s)}
        style={{ color: t.colors.accent, fontFamily: t.fonts.display, fontSize: '1.15rem' }}
        className="flex items-center gap-1"
        aria-pressed={starred}
      >
        <span aria-hidden>{starred ? '★' : '☆'}</span> star this win
      </button>
    </AppShell>
  );
}
