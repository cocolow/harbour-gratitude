import { Link } from 'react-router-dom';
import { arcadeFabStyle } from '../design/arcadeStyles';
import { useAppTheme } from '../theme/useAppTheme';
import { useReducedMotion } from '../theme/useReducedMotion';

export function Fab() {
  const { tokens: t } = useAppTheme();
  const reducedMotion = useReducedMotion();
  return (
    <Link
      to="/capture"
      className={`fixed bottom-6 z-20 flex h-[60px] w-[60px] items-center justify-center text-3xl text-white ${reducedMotion ? 'left-1/2 -translate-x-1/2' : 'animate-fab-idle left-1/2'}`}
      style={arcadeFabStyle(t)}
      aria-label="Add a win"
    >
      +
    </Link>
  );
}
