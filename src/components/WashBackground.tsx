import { useAppTheme } from '../theme/useAppTheme';

export function WashBackground() {
  const { isDark } = useAppTheme();

  if (isDark) {
    return (
      <>
        <div
          className="pointer-events-none absolute -left-12 -top-8 h-48 w-48 rounded-full opacity-50"
          style={{
            background:
              'radial-gradient(circle, rgba(212, 137, 111, 0.22) 0%, transparent 70%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-8 top-24 h-40 w-40 rounded-full opacity-40"
          style={{
            background:
              'radial-gradient(circle, rgba(224, 184, 90, 0.18) 0%, transparent 70%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-6 bottom-40 h-36 w-36 rounded-full opacity-35"
          style={{
            background:
              'radial-gradient(circle, rgba(74, 138, 138, 0.2) 0%, transparent 70%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-4 bottom-16 h-32 w-32 rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(circle, rgba(45, 74, 82, 0.45) 0%, transparent 70%)',
          }}
          aria-hidden
        />
      </>
    );
  }

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
