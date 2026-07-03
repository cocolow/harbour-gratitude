import type { CSSProperties } from 'react';
import type { DesignTokens } from './tokens';

const SAMPLE_ENTRIES = [
  {
    text: 'Finished the presentation I was dreading — it went better than expected.',
    category: 'Work',
    starred: true,
    time: '2:34 PM',
    tilt: -1.2,
  },
  {
    text: 'Took a walk without my phone after lunch.',
    category: 'Health',
    starred: false,
    time: 'Yesterday',
    tilt: 0.9,
  },
];

interface DesignDPreviewProps {
  tokens: DesignTokens;
  showCapture?: boolean;
}

function WashBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute -left-12 -top-8 h-48 w-48 rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(232, 180, 160, 0.55) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 top-24 h-40 w-40 rounded-full opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(196, 114, 90, 0.35) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-6 bottom-40 h-36 w-36 rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(61, 107, 107, 0.25) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-4 bottom-16 h-32 w-32 rounded-full opacity-45"
        style={{
          background: 'radial-gradient(circle, rgba(212, 168, 75, 0.3) 0%, transparent 70%)',
        }}
        aria-hidden
      />
    </>
  );
}

function WavyDivider({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 12" className="my-5 w-full" aria-hidden>
      <path
        d="M0 6 Q40 0 80 6 T160 6 T240 6 T320 6"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

function OrganicJar({ fill, empty, level }: { fill: string; empty: string; level: number }) {
  const pct = Math.min(100, (level / 8) * 100);
  return (
    <svg width="52" height="60" viewBox="0 0 52 60" aria-hidden>
      <path
        d="M14 10 C14 8 18 6 26 6 C34 6 38 8 38 10 L36 48 C36 50 32 52 26 52 C20 52 16 50 16 48 Z"
        fill={empty}
        stroke={fill}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d={`M18 ${50 - (38 * pct) / 100} C20 ${48 - (38 * pct) / 100} 32 ${48 - (38 * pct) / 100} 34 ${50 - (38 * pct) / 100} L34 48 C34 50 30 52 26 52 C22 52 18 50 18 48 Z`}
        fill={fill}
        opacity="0.9"
      />
      <ellipse cx="26" cy="10" rx="13" ry="3.5" fill={empty} stroke={fill} strokeWidth="1.5" />
    </svg>
  );
}

function SpeckleTexture({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: `radial-gradient(circle at 20% 30%, #2d4a4a 0.5px, transparent 0.5px),
          radial-gradient(circle at 60% 70%, #2d4a4a 0.5px, transparent 0.5px),
          radial-gradient(circle at 80% 20%, #2d4a4a 0.5px, transparent 0.5px)`,
        backgroundSize: '24px 24px, 32px 32px, 28px 28px',
      }}
      aria-hidden
    />
  );
}

export function DesignDPreview({ tokens: t, showCapture = false }: DesignDPreviewProps) {
  const jarLevel = 5;
  const jarTarget = 8;

  const phoneStyle: CSSProperties = {
    fontFamily: t.fonts.body,
    backgroundColor: t.colors.bg,
    color: t.colors.text,
    borderRadius: '2rem',
    boxShadow: t.shadow,
    position: 'relative',
    overflow: 'hidden',
  };

  const organicCard: CSSProperties = {
    borderRadius: '60% 40% 30% 70% / 55% 35% 65% 45%',
  };

  if (showCapture) {
    return (
      <div className="relative mx-auto w-full max-w-[390px] overflow-hidden" style={phoneStyle}>
        <WashBackground />
        <SpeckleTexture />
        <div className="relative px-5 pb-8 pt-12">
          <header className="mb-8 flex items-center justify-between">
            <button type="button" style={{ color: t.colors.textMuted }} className="text-sm tracking-wide">
              Cancel
            </button>
            <span
              style={{ fontFamily: t.fonts.display, color: t.colors.accent, fontSize: '1.5rem' }}
            >
              new win
            </span>
            <button
              type="button"
              style={{
                backgroundColor: t.colors.fab,
                color: '#fff',
                borderRadius: t.radius.button,
                transform: 'rotate(-1deg)',
              }}
              className="px-4 py-1.5 text-sm font-medium"
            >
              Save
            </button>
          </header>

          <p
            style={{ fontFamily: t.fonts.display, color: t.colors.accent, fontSize: '1.25rem' }}
            className="mb-3"
          >
            what went well?
          </p>
          <textarea
            readOnly
            placeholder="Take your time…"
            defaultValue=""
            rows={5}
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
            style={{ fontFamily: t.fonts.body, color: t.colors.textMuted }}
            className="mb-3 text-xs uppercase tracking-[0.15em]"
          >
            Category
          </p>
          <div className="mb-6 flex flex-wrap gap-2">
            {['Work', 'Health', 'Relationships', 'Creative', 'Personal Growth', 'Small Joys'].map(
              (cat, i) => (
                <span
                  key={cat}
                  style={{
                    backgroundColor: i === 0 ? t.colors.chipActive : t.colors.chip,
                    color: t.colors.text,
                    borderRadius: i % 2 === 0 ? '1rem 1.5rem 1rem 1.25rem' : '1.25rem 1rem 1.5rem 1rem',
                    transform: `rotate(${i % 2 === 0 ? -0.8 : 0.6}deg)`,
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
            style={{ color: t.colors.accent, fontFamily: t.fonts.display, fontSize: '1.15rem' }}
            className="flex items-center gap-1"
          >
            <span aria-hidden>☆</span> star this win
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[390px] overflow-hidden" style={phoneStyle}>
      <WashBackground />
      <SpeckleTexture />

      <div className="relative px-5 pb-28 pt-10">
        <header className="mb-8 flex items-start justify-between">
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
            <p
              style={{ color: t.colors.textMuted, fontFamily: t.fonts.body }}
              className="mt-1 text-sm tracking-wide"
            >
              Tuesday, May 26
            </p>
          </div>
          <button
            type="button"
            style={{
              backgroundColor: t.colors.surface,
              ...organicCard,
              color: t.colors.textMuted,
              transform: 'rotate(2deg)',
            }}
            className="p-2.5 text-xs"
            aria-label="Settings"
          >
            ⚙
          </button>
        </header>

        <button
          type="button"
          style={{
            backgroundColor: t.colors.bgElevated,
            borderRadius: '1.75rem 1.25rem 1.5rem 2rem',
            boxShadow: t.shadow,
            border: `1.5px solid ${t.colors.accentMuted}`,
            transform: 'rotate(-0.5deg)',
          }}
          className="mb-6 flex w-full items-center gap-4 p-5 text-left"
        >
          <OrganicJar fill={t.colors.jarFill} empty={t.colors.jarEmpty} level={jarLevel} />
          <div>
            <p
              style={{ fontFamily: t.fonts.display, fontSize: '1.35rem', color: t.colors.text }}
              className="leading-tight"
            >
              {jarLevel} / {jarTarget}
            </p>
            <p style={{ color: t.colors.textMuted }} className="mt-0.5 text-xs tracking-wide">
              until bubble tea · first cycle
            </p>
          </div>
        </button>

        <button
          type="button"
          style={{
            background: `linear-gradient(135deg, ${t.colors.badDay} 0%, #3d6b6b 100%)`,
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
          style={{
            fontFamily: t.fonts.body,
            color: t.colors.textMuted,
          }}
          className="mb-4 text-xs font-medium uppercase tracking-[0.2em]"
        >
          Recent
        </h2>
        <ul className="space-y-4">
          {SAMPLE_ENTRIES.map((entry) => (
            <li
              key={entry.text}
              style={{
                backgroundColor: t.colors.bgElevated,
                borderRadius: '1.25rem 1.75rem 1.5rem 1.25rem',
                border: `1px solid ${t.colors.jarEmpty}`,
                boxShadow: t.shadow,
                transform: `rotate(${entry.tilt}deg)`,
              }}
              className="p-4"
            >
              <p className="text-sm leading-relaxed">{entry.text}</p>
              <div className="mt-2 flex items-center gap-2 text-xs" style={{ color: t.colors.textMuted }}>
                <span
                  style={{
                    backgroundColor: t.colors.chip,
                    borderRadius: '0.75rem 1rem 0.75rem 1rem',
                    padding: '2px 10px',
                  }}
                >
                  {entry.category}
                </span>
                <span>{entry.time}</span>
                {entry.starred && (
                  <span style={{ color: t.colors.jarFill, fontFamily: t.fonts.display, fontSize: '1rem' }}>
                    ★
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
        <div
          style={{
            backgroundColor: t.colors.fab,
            borderRadius: '60% 40% 50% 50% / 50% 50% 50% 50%',
            boxShadow: '0 6px 24px rgba(61, 107, 107, 0.35)',
            transform: 'rotate(-3deg)',
          }}
          className="flex h-14 w-14 items-center justify-center text-2xl text-white"
        >
          +
        </div>
      </div>

      <div
        className="relative mt-8 px-5 py-10"
        style={{ backgroundColor: t.colors.surface }}
      >
        <div
          className="pointer-events-none absolute -right-6 top-4 h-28 w-28 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(212, 168, 75, 0.5) 0%, transparent 70%)',
          }}
          aria-hidden
        />
        <p
          style={{ color: t.colors.textMuted, fontFamily: t.fonts.body }}
          className="relative mb-4 text-xs uppercase tracking-[0.2em]"
        >
          Bad-day view
        </p>
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
            Finished the presentation I was dreading — it went better than expected.
          </blockquote>
          <WavyDivider color={t.colors.jarFill} />
          <p
            style={{
              fontFamily: t.fonts.body,
              color: t.colors.textMuted,
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
            }}
            className="uppercase"
          >
            Work · May 12
          </p>
        </div>
      </div>
    </div>
  );
}

export function DesignDTokenPanel({ tokens }: { tokens: DesignTokens }) {
  const entries = Object.entries(tokens.colors) as [string, string][];
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5"
      style={{
        backgroundColor: tokens.colors.bgElevated,
        border: `1.5px dashed ${tokens.colors.accentMuted}`,
        fontFamily: tokens.fonts.body,
        color: tokens.colors.text,
        transform: 'rotate(-0.3deg)',
      }}
    >
      <div
        className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(196, 114, 90, 0.6) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <h3
        style={{ fontFamily: tokens.fonts.display, fontSize: '1.5rem', color: tokens.colors.accent }}
        className="relative mb-4"
      >
        design tokens
      </h3>
      <div className="relative mb-5 grid grid-cols-4 gap-2 sm:grid-cols-6">
        {entries.map(([name, hex]) => (
          <div key={name} className="text-center">
            <div
              className="mx-auto mb-1 h-10 w-10 border border-black/5"
              style={{
                backgroundColor: hex,
                borderRadius: '40% 60% 50% 50% / 50% 40% 60% 50%',
              }}
            />
            <p className="text-[10px] leading-tight" style={{ color: tokens.colors.textMuted }}>
              {name}
            </p>
          </div>
        ))}
      </div>
      <dl className="relative space-y-2 text-sm">
        <div>
          <dt className="font-medium">Body (sans)</dt>
          <dd style={{ color: tokens.colors.textMuted }}>{tokens.fonts.body}</dd>
        </div>
        <div>
          <dt className="font-medium">Display / quote (script)</dt>
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
        <div>
          <dt className="font-medium">Visual language</dt>
          <dd style={{ color: tokens.colors.textMuted }}>
            Peach washes, organic blobs, wavy dividers, slight card rotation, dashed borders
          </dd>
        </div>
      </dl>
    </div>
  );
}
