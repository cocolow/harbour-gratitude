import { Link } from 'react-router-dom';
import { useAppTheme } from '../theme/useAppTheme';

export function Fab() {
  const { tokens: t, isDark } = useAppTheme();
  return (
    <Link
      to="/capture"
      className="fixed bottom-6 left-1/2 z-20 flex h-14 w-14 items-center justify-center text-2xl text-white"
      style={{
        backgroundColor: t.colors.fab,
        borderRadius: '60% 40% 50% 50% / 50% 50% 50% 50%',
        boxShadow: isDark
          ? '0 6px 24px rgba(0, 0, 0, 0.45)'
          : '0 6px 24px rgba(61, 107, 107, 0.35)',
        transform: 'translateX(-50%) rotate(-3deg)',
      }}
      aria-label="Add a win"
    >
      +
    </Link>
  );
}
