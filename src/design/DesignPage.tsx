import { Link } from 'react-router-dom';
import type { DesignTokens } from './tokens';
import { ALL_DESIGNS } from './tokens';
import { DesignPreview, TokenPanel } from './DesignPreview';

interface DesignPageProps {
  tokens: DesignTokens;
}

export function DesignPage({ tokens }: DesignPageProps) {
  const others = ALL_DESIGNS.filter((d) => d.id !== tokens.id);

  return (
    <div
      className="min-h-full py-8"
      style={{ backgroundColor: '#e8e6e1', fontFamily: 'system-ui, sans-serif' }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <nav className="mb-6 flex flex-wrap items-center gap-3 text-sm">
          <Link to="/" className="font-medium text-[#3d4a3a] underline-offset-2 hover:underline">
            ← App home
          </Link>
          <span className="text-[#6b7a66]">|</span>
          {others.map((d) => (
            <Link
              key={d.id}
              to={`/design/${d.id}`}
              className="text-[#6b7a66] underline-offset-2 hover:underline"
            >
              {d.name}
            </Link>
          ))}
        </nav>

        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6b7a66]">
            Direction {tokens.id.toUpperCase()}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-[#3d4a3a]">{tokens.name}</h1>
          <p className="mt-2 max-w-xl text-[#6b7a66]">{tokens.tagline}</p>
        </header>

        <div className="grid gap-10 lg:grid-cols-2">
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#6b7a66]">
              Home + bad-day quote
            </h2>
            <div className="relative">
              <DesignPreview tokens={tokens} />
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#6b7a66]">
              Capture screen
            </h2>
            <DesignPreview tokens={tokens} showCapture />
            <div className="mt-8">
              <TokenPanel tokens={tokens} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
