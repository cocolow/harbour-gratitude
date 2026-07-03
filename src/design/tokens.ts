export interface DesignTokens {
  id: 'a' | 'b' | 'c' | 'd';
  name: string;
  tagline: string;
  colors: {
    bg: string;
    bgElevated: string;
    surface: string;
    text: string;
    textMuted: string;
    accent: string;
    accentMuted: string;
    jarFill: string;
    jarEmpty: string;
    chip: string;
    chipActive: string;
    fab: string;
    badDay: string;
  };
  fonts: {
    body: string;
    display: string;
    quote: string;
  };
  radius: {
    card: string;
    button: string;
    chip: string;
  };
  spacing: string;
  shadow: string;
}

export const DESIGN_A: DesignTokens = {
  id: 'a',
  name: 'Sage Garden',
  tagline: 'Soft sage, mint, and cream — the PRD default',
  colors: {
    bg: '#f7f5f0',
    bgElevated: '#ffffff',
    surface: '#e8f0e6',
    text: '#3d4a3a',
    textMuted: '#6b7a66',
    accent: '#8fa88a',
    accentMuted: '#c5d4c0',
    jarFill: '#9bc4a4',
    jarEmpty: '#e8e6e1',
    chip: '#ebe8e0',
    chipActive: '#d4e8d8',
    fab: '#8fa88a',
    badDay: '#a8b8a3',
  },
  fonts: {
    body: "'DM Sans', system-ui, sans-serif",
    display: "'DM Sans', system-ui, sans-serif",
    quote: "'Fraunces', Georgia, serif",
  },
  radius: { card: '1rem', button: '9999px', chip: '9999px' },
  spacing: 'Generous — 16px base, 24px section gaps',
  shadow: '0 2px 12px rgba(61, 74, 58, 0.06)',
};

export const DESIGN_B: DesignTokens = {
  id: 'b',
  name: 'Warm Dusk',
  tagline: 'Cream canvas with terracotta warmth',
  colors: {
    bg: '#faf6f1',
    bgElevated: '#fffdf9',
    surface: '#f3ebe3',
    text: '#4a3f38',
    textMuted: '#8a7a6e',
    accent: '#c67b5c',
    accentMuted: '#e8c4b0',
    jarFill: '#d4956a',
    jarEmpty: '#ebe4dc',
    chip: '#efe6dc',
    chipActive: '#f5ddd0',
    fab: '#c67b5c',
    badDay: '#a89080',
  },
  fonts: {
    body: "'Source Sans 3', system-ui, sans-serif",
    display: "'Libre Baskerville', Georgia, serif",
    quote: "'Libre Baskerville', Georgia, serif",
  },
  radius: { card: '1.25rem', button: '0.875rem', chip: '0.5rem' },
  spacing: 'Cozy — 14px base, 20px section gaps, softer corners on chips',
  shadow: '0 4px 16px rgba(74, 63, 56, 0.08)',
};

export const DESIGN_C: DesignTokens = {
  id: 'c',
  name: 'Mist & Stone',
  tagline: 'Cool gray-blue, minimal and spa-like',
  colors: {
    bg: '#f0f3f5',
    bgElevated: '#ffffff',
    surface: '#e4eaee',
    text: '#3d4a52',
    textMuted: '#7a8a94',
    accent: '#6b8a9a',
    accentMuted: '#b8ccd6',
    jarFill: '#8aaab8',
    jarEmpty: '#dce4e8',
    chip: '#e8ecef',
    chipActive: '#d4e0e6',
    fab: '#5a7d8c',
    badDay: '#9aa8b0',
  },
  fonts: {
    body: "'Inter', system-ui, sans-serif",
    display: "'Inter', system-ui, sans-serif",
    quote: "'Cormorant Garamond', Georgia, serif",
  },
  radius: { card: '0.5rem', button: '0.375rem', chip: '0.25rem' },
  spacing: 'Tight-minimal — 12px base, 32px section gaps, hairline borders over shadows',
  shadow: 'none — 1px border #dce4e8 instead',
};

export const DESIGN_D: DesignTokens = {
  id: 'd',
  name: 'Gentle Words',
  tagline: 'Morgan Harper Nichols — peach washes, script + sans, imperfect warmth',
  colors: {
    bg: '#f8ede4',
    bgElevated: '#fff9f4',
    surface: '#edd5c8',
    text: '#2d4a4a',
    textMuted: '#6b7f7a',
    accent: '#c4725a',
    accentMuted: '#e8c4bc',
    jarFill: '#d4a84b',
    jarEmpty: '#f0e4d8',
    chip: '#f3e0d8',
    chipActive: '#c5d4b8',
    fab: '#3d6b6b',
    badDay: '#5a7a7a',
  },
  fonts: {
    body: "'Outfit', system-ui, sans-serif",
    display: "'Caveat', cursive",
    quote: "'Caveat', cursive",
  },
  radius: { card: '1.5rem', button: '2rem', chip: '1rem' },
  spacing: 'Breathing room — 18px base, 28px section gaps, organic radii',
  shadow: '0 4px 24px rgba(45, 74, 74, 0.08)',
};

/** Night-sky variant — deep teal wash, warm terracotta accents, muted peach glows */
export const DESIGN_D_DARK: DesignTokens = {
  ...DESIGN_D,
  colors: {
    bg: '#1a2f35',
    bgElevated: '#243d44',
    surface: '#2d4a52',
    text: '#e8ddd4',
    textMuted: '#9ab0ab',
    accent: '#d4896f',
    accentMuted: '#5c4842',
    jarFill: '#e0b85a',
    jarEmpty: '#354850',
    chip: '#354850',
    chipActive: '#3d5a50',
    fab: '#4a8a8a',
    badDay: '#4a6a6a',
  },
  shadow: '0 4px 24px rgba(0, 0, 0, 0.28)',
};

export const ALL_DESIGNS = [DESIGN_A, DESIGN_B, DESIGN_C, DESIGN_D] as const;
