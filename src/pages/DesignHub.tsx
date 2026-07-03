import { Link } from 'react-router-dom';
import { ALL_DESIGNS } from '../design/tokens';
import { DesignPreview } from '../design/DesignPreview';

export function DesignHub() {
  return (
    <div className="min-h-full bg-[#e8e6e1] py-10">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6b7a66]">
            Achievement Tracker · Design reference
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#3d4a3a]">Visual directions (archive)</h1>
          <p className="mx-auto mt-3 max-w-lg text-[#6b7a66]">
            Phase 1 ships with <strong>Design D — Gentle Words</strong>. These pages remain for
            portfolio comparison.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block text-sm font-medium text-[#3d6b6b] underline-offset-2 hover:underline"
          >
            ← Back to app
          </Link>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ALL_DESIGNS.map((tokens) => (
            <article
              key={tokens.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="scale-[0.85] origin-top -mb-8 pointer-events-none">
                <DesignPreview tokens={tokens} />
              </div>
              <div className="relative z-10 border-t bg-white p-5">
                <h2 className="text-lg font-semibold text-[#3d4a3a]">
                  {tokens.id.toUpperCase()} {tokens.name}
                  {tokens.id === 'd' && (
                    <span className="ml-2 text-xs font-normal text-[#3d6b6b]">(chosen)</span>
                  )}
                </h2>
                <p className="mt-1 text-sm text-[#6b7a66]">{tokens.tagline}</p>
                <Link
                  to={`/design/${tokens.id}`}
                  className="mt-4 inline-block rounded-full px-5 py-2.5 text-sm font-medium text-white"
                  style={{ backgroundColor: tokens.colors.accent }}
                >
                  Explore {tokens.id.toUpperCase()} →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-[#8a9a85]">
          Routes: <code>/design</code> · <code>/design/a</code> · <code>/design/b</code> ·{' '}
          <code>/design/c</code> · <code>/design/d</code>
        </p>
      </div>
    </div>
  );
}
