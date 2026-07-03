import type { CSSProperties } from 'react';
import type { DesignTokens } from '../design/tokens';

export const HEADER_ICON_CHIP_CLASS =
  'flex h-11 w-11 shrink-0 items-center justify-center';

export function headerIconChipStyle(
  t: DesignTokens,
  rotateDeg: number,
): CSSProperties {
  return {
    backgroundColor: t.colors.surface,
    borderRadius: '60% 40% 30% 70% / 55% 35% 65% 45%',
    color: t.colors.textMuted,
    transform: `rotate(${rotateDeg}deg)`,
  };
}
