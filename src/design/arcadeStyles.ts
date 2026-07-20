import type { DesignTokens } from './tokens';

/** Chunky offset shadow — 90s arcade card treatment */
export function arcadeShadow(text: string, offset = 5): string {
  return `${offset}px ${offset}px 0 ${text}`;
}

/** Solid chunky border */
export function arcadeBorder(text: string, width = 3): string {
  return `${width}px solid ${text}`;
}

export function arcadeCardStyle(t: DesignTokens) {
  return {
    backgroundColor: t.colors.bgElevated,
    border: arcadeBorder(t.colors.text),
    borderRadius: t.radius.card,
    boxShadow: arcadeShadow(t.colors.text),
  } as const;
}

export function arcadeChipStyle(t: DesignTokens) {
  return {
    border: arcadeBorder(t.colors.text, 2),
    borderRadius: t.radius.chip,
  } as const;
}

/** Category chip — Caveat label per Direction B */
export function arcadeCategoryChipStyle(t: DesignTokens) {
  return {
    ...arcadeChipStyle(t),
    fontFamily: t.fonts.display,
    fontSize: '16px',
    lineHeight: 1,
    padding: '3px 12px 4px',
    color: t.colors.text,
  } as const;
}

export function arcadePrimaryButton(t: DesignTokens, bg: string, color: string) {
  return {
    backgroundColor: bg,
    color,
    border: arcadeBorder(t.colors.text),
    borderRadius: t.radius.button,
    boxShadow: arcadeShadow(t.colors.text, 4),
  } as const;
}

export function arcadeFabStyle(t: DesignTokens) {
  return {
    backgroundColor: t.colors.fab,
    color: '#fff',
    border: arcadeBorder(t.colors.text),
    borderRadius: '12px',
    boxShadow: arcadeShadow(t.colors.text, 4),
  } as const;
}

export function arcadeIconChipStyle(t: DesignTokens) {
  return {
    backgroundColor: t.colors.surface,
    color: t.colors.textMuted,
    border: arcadeBorder(t.colors.text, 2),
    borderRadius: '8px',
  } as const;
}

export function arcadeInputStyle(t: DesignTokens) {
  return {
    backgroundColor: t.colors.bgElevated,
    border: arcadeBorder(t.colors.text, 2),
    borderRadius: t.radius.card,
    color: t.colors.text,
  } as const;
}

export function arcadeGhostButton(t: DesignTokens) {
  return {
    backgroundColor: 'transparent',
    border: arcadeBorder(t.colors.text, 2),
    borderRadius: t.radius.button,
    color: t.colors.textMuted,
  } as const;
}
