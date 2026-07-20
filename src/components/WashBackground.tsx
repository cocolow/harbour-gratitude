import type { CSSProperties } from 'react';
import { useAppTheme } from '../theme/useAppTheme';
import { useReducedMotion } from '../theme/useReducedMotion';

const STAR_DECOR: Array<{
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: number;
  colorKey: 'jarFill' | 'accent' | 'textMuted';
  char: string;
  anim: string;
}> = [
  { top: '54px', left: '150px', size: 22, colorKey: 'jarFill', char: '★', anim: 'spinSlow 9s linear infinite' },
  { top: '130px', right: '26px', size: 20, colorKey: 'accent', char: '✦', anim: 'blink 2.4s ease-in-out infinite' },
  { top: '330px', left: '14px', size: 18, colorKey: 'accent', char: '★', anim: 'blink 3s ease-in-out infinite' },
  { bottom: '150px', right: '20px', size: 24, colorKey: 'jarFill', char: '✦', anim: 'spinSlow 12s linear infinite' },
  { bottom: '80px', left: '28px', size: 16, colorKey: 'textMuted', char: '★', anim: 'blink 2.8s ease-in-out infinite' },
  { top: '420px', right: '34px', size: 14, colorKey: 'jarFill', char: '★', anim: 'spinSlow 14s linear infinite' },
];

export function WashBackground() {
  const { tokens: t } = useAppTheme();
  const reducedMotion = useReducedMotion();

  return (
    <>
      {STAR_DECOR.map((star, i) => {
        const pos: CSSProperties = {
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: 0,
          fontSize: star.size,
          color: t.colors[star.colorKey],
          textShadow: '2px 2px 0 rgba(0, 0, 0, 0.12)',
          ...(star.top ? { top: star.top } : {}),
          ...(star.bottom ? { bottom: star.bottom } : {}),
          ...(star.left ? { left: star.left } : {}),
          ...(star.right ? { right: star.right } : {}),
          animation: reducedMotion ? undefined : star.anim,
        };
        return (
          <span key={i} style={pos} aria-hidden>
            {star.char}
          </span>
        );
      })}
    </>
  );
}
