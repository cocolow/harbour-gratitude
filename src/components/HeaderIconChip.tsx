import type { CSSProperties } from 'react';
import type { DesignTokens } from '../design/tokens';
import { arcadeIconChipStyle } from '../design/arcadeStyles';

export const HEADER_ICON_CHIP_CLASS =
  'flex h-11 w-11 shrink-0 items-center justify-center';

export function headerIconChipStyle(_t: DesignTokens, _rotateDeg: number): CSSProperties {
  return arcadeIconChipStyle(_t);
}
