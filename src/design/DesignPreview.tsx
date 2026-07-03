import type { CSSProperties } from 'react';
import type { DesignTokens } from './tokens';
import { DesignDPreview, DesignDTokenPanel } from './DesignDPreview';

const SAMPLE_ENTRIES = [
  {
    text: 'Finished the presentation I was dreading — it went better than expected.',
    category: 'Work',
    starred: true,
    time: '2:34 PM',
  },
  {
    text: 'Took a walk without my phone after lunch.',
    category: 'Health',
    starred: false,
    time: 'Yesterday',
  },
];

interface DesignPreviewProps {
  tokens: DesignTokens;
  showCapture?: boolean;
}

function JarIcon({ fill, empty, level }: { fill: string; empty: string; level: number }) {
  const pct = Math.min(100, (level / 8) * 100);
  return (
    <svg width="48" height="56" viewBox="0 0 48 56" aria-hidden>
      <path
        d="M12 8h24l-2 44H14L12 8z"
        fill={empty}
        stroke={fill}
        strokeWidth="1.5"
      />
      <rect
        x="14"
        y={48 - (40 * pct) / 100}
        width="20"
        height={(40 * pct) / 100}
        rx="2"
        fill={fill}
        opacity="0.85"
      />
      <ellipse cx="24" cy="8" rx="12" ry="3" fill={empty} stroke={fill} strokeWidth="1.5" />
    </svg>
  );
}

export function DesignPreview({ tokens, showCapture = false }: DesignPreviewProps) {
  if (tokens.id === 'd') {
    return <DesignDPreview tokens={tokens} showCapture={showCapture} />;
  }

  const t = tokens;
  const jarLevel = 5;
  const jarTarget = 8;

  const phoneStyle: CSSProperties = {
    fontFamily: t.fonts.body,
    backgroundColor: t.colors.bg,
    color: t.colors.text,
    borderRadius: '2rem',
    boxShadow: t.shadow === 'none' ? undefined : t.shadow,
    border: t.shadow === 'none' ? `1px solid ${t.colors.jarEmpty}` : undefined,
  };

  if (showCapture) {
    return (
      <div className="mx-auto w-full max-w-[390px] overflow-hidden" style={phoneStyle}>
        <div className="px-5 pb-8 pt-12">
          <header className="mb-6 flex items-center justify-between">
            <button type="button" style={{ color: t.colors.textMuted }} className="text-sm">
              Cancel
            </button>
            <span style={{ fontFamily: t.fonts.display }} className="text-sm font-medium">
              New win
            </span>
            <button
              type="button"
              style={{ backgroundColor: t.colors.accent, color: '#fff', borderRadius: t.radius.button }}
              className="px-3 py-1 text-sm font-medium"
            >
              Save
            </button>
          </header>

          <textarea
            readOnly
            placeholder="What went well today?"
            defaultValue=""
            rows={5}
            style={{
              backgroundColor: t.colors.bgElevated,
              borderRadius: t.radius.card,
              border: `1px solid ${t.colors.jarEmpty}`,
              color: t.colors.text,
            }}
            className="mb-4 w-full resize-none p-4 text-base leading-relaxed outline-none"
          />

          <p style={{ color: t.colors.textMuted }} className="mb-2 text-xs uppercase tracking-wide">
            Category (optional)
          </p>
          <div className="mb-6 flex flex-wrap gap-2">
            {['Work', 'Health', 'Relationships', 'Creative', 'Personal Growth', 'Small Joys'].map(
              (cat, i) => (
                <span
                  key={cat}
                  style={{
                    backgroundColor: i === 0 ? t.colors.chipActive : t.colors.chip,
                    color: t.colors.text,
                    borderRadius: t.radius.chip,
                  }}
                  className="px-3 py-1.5 text-xs"
                >
                  {cat}
                </span>
              ),
            )}
          </div>

          <button
            type="button"
            style={{ color: t.colors.accent }}
            className="flex items-center gap-1 text-sm"
          >
            <span aria-hidden>☆</span> Star this win
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[390px] overflow-hidden" style={phoneStyle}>
      {/* Home */}
      <div className="px-5 pb-28 pt-10">
        <header className="mb-6 flex items-start justify-between">
          <div>
            <h1
              style={{ fontFamily: t.fonts.display, color: t.colors.text }}
              className="text-xl font-semibold tracking-tight"
            >
              Your wins
            </h1>
            <p style={{ color: t.colors.textMuted }} className="mt-0.5 text-sm">
              Tuesday, May 26
            </p>
          </div>
          <button
            type="button"
            style={{
              backgroundColor: t.colors.surface,
              borderRadius: t.radius.card,
              color: t.colors.textMuted,
            }}
            className="p-2 text-xs"
            aria-label="Settings"
          >
            ⚙
          </button>
        </header>

        {/* Jar — primary progress */}
        <button
          type="button"
          style={{
            backgroundColor: t.colors.bgElevated,
            borderRadius: t.radius.card,
            boxShadow: t.shadow !== 'none' ? t.shadow : undefined,
            border: t.shadow === 'none' ? `1px solid ${t.colors.jarEmpty}` : undefined,
          }}
          className="mb-6 flex w-full items-center gap-4 p-4 text-left"
        >
          <JarIcon fill={t.colors.jarFill} empty={t.colors.jarEmpty} level={jarLevel} />
          <div>
            <p className="text-sm font-medium">
              {jarLevel} / {jarTarget} until bubble tea
            </p>
            <p style={{ color: t.colors.textMuted }} className="mt-0.5 text-xs">
              First cycle · tap to expand
            </p>
          </div>
        </button>

        {/* Bad day */}
        <button
          type="button"
          style={{
            backgroundColor: t.colors.badDay,
            color: '#fff',
            borderRadius: t.radius.button,
            fontFamily: t.fonts.body,
          }}
          className="mb-8 w-full py-3.5 text-sm font-medium"
        >
          Having a rough day?
        </button>

        {/* Recent feed */}
        <h2 style={{ color: t.colors.textMuted }} className="mb-3 text-xs font-medium uppercase tracking-wide">
          Recent
        </h2>
        <ul className="space-y-3">
          {SAMPLE_ENTRIES.map((entry) => (
            <li
              key={entry.text}
              style={{
                backgroundColor: t.colors.bgElevated,
                borderRadius: t.radius.card,
                border: t.shadow === 'none' ? `1px solid ${t.colors.jarEmpty}` : undefined,
                boxShadow: t.shadow !== 'none' ? t.shadow : undefined,
              }}
              className="p-4"
            >
              <p className="text-sm leading-relaxed">{entry.text}</p>
              <div className="mt-2 flex items-center gap-2 text-xs" style={{ color: t.colors.textMuted }}>
                <span
                  style={{
                    backgroundColor: t.colors.chip,
                    borderRadius: t.radius.chip,
                    padding: '2px 8px',
                  }}
                >
                  {entry.category}
                </span>
                <span>{entry.time}</span>
                {entry.starred && <span style={{ color: t.colors.accent }}>★</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* FAB */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
        <div
          style={{
            backgroundColor: t.colors.fab,
            borderRadius: '9999px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
          className="flex h-14 w-14 items-center justify-center text-2xl text-white"
        >
          +
        </div>
      </div>

      {/* Quote card — bad-day style */}
      <div
        className="mt-8 border-t px-5 py-8"
        style={{ borderColor: t.colors.jarEmpty, backgroundColor: t.colors.surface }}
      >
        <p style={{ color: t.colors.textMuted }} className="mb-3 text-xs uppercase tracking-wide">
          Bad-day view · quote card
        </p>
        <blockquote
          style={{
            fontFamily: t.fonts.quote,
            color: t.colors.text,
            fontSize: '1.35rem',
            lineHeight: 1.45,
          }}
        >
          &ldquo;Finished the presentation I was dreading — it went better than expected.&rdquo;
        </blockquote>
        <p style={{ color: t.colors.textMuted }} className="mt-4 text-sm">
          Work · May 12
        </p>
      </div>
    </div>
  );
}

interface TokenSwatchProps {
  tokens: DesignTokens;
}

export function TokenPanel({ tokens }: TokenSwatchProps) {
  if (tokens.id === 'd') {
    return <DesignDTokenPanel tokens={tokens} />;
  }

  const entries = Object.entries(tokens.colors) as [string, string][];
  return (
    <div
      className="rounded-xl p-5"
      style={{
        backgroundColor: tokens.colors.bgElevated,
        border: `1px solid ${tokens.colors.jarEmpty}`,
        fontFamily: tokens.fonts.body,
        color: tokens.colors.text,
      }}
    >
      <h3 className="mb-4 text-sm font-semibold">Design tokens</h3>
      <div className="mb-5 grid grid-cols-4 gap-2 sm:grid-cols-6">
        {entries.map(([name, hex]) => (
          <div key={name} className="text-center">
            <div
              className="mx-auto mb-1 h-10 w-10 rounded-lg border border-black/5"
              style={{ backgroundColor: hex }}
            />
            <p className="text-[10px] leading-tight" style={{ color: tokens.colors.textMuted }}>
              {name}
            </p>
          </div>
        ))}
      </div>
      <dl className="space-y-2 text-sm">
        <div>
          <dt className="font-medium">Body</dt>
          <dd style={{ color: tokens.colors.textMuted }}>{tokens.fonts.body}</dd>
        </div>
        <div>
          <dt className="font-medium">Quote / display</dt>
          <dd style={{ color: tokens.colors.textMuted }}>{tokens.fonts.quote}</dd>
        </div>
        <div>
          <dt className="font-medium">Spacing</dt>
          <dd style={{ color: tokens.colors.textMuted }}>{tokens.spacing}</dd>
        </div>
        <div>
          <dt className="font-medium">Elevation</dt>
          <dd style={{ color: tokens.colors.textMuted }}>{tokens.shadow}</dd>
        </div>
      </dl>
    </div>
  );
}
