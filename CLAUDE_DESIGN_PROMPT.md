# Design implementation prompt — Gentle Words (D)

Use this prompt when extending UI, adding screens, or refining the Harbour Gratitude PWA. **Design D — Gentle Words** is the locked visual direction.

---

## Product context

**Harbour Gratitude** is a phone-first PWA for capturing personal wins, revisiting them on hard days, and earning symbolic offline rewards via an adaptive jar. Emotional target: **calm and grounded** — never guilt, streaks, or performative engagement.

**Platform:** Mobile only (~390px logical width). iOS Add to Home Screen primary. Single-column, thumb-zone FAB.

**Repo:** `cocolow/harbour-gratitude`

---

## Visual direction: Gentle Words

Inspired by Morgan Harper Nichols — hand-painted card energy: peach washes, imperfect warmth, breathing room. The app should feel like an **illustrated companion**, not a corporate tracker.

### Color palette (use exactly)

```
bg:           #f8ede4   /* peach wash — page background */
bgElevated:   #fff9f4   /* cards, banners */
surface:      #edd5c8   /* dusty rose panels */
text:         #2d4a4a   /* deep teal ink */
textMuted:    #6b7f7a   /* labels, metadata */
accent:       #c4725a   /* terracotta — display headings, emphasis */
accentMuted:  #e8c4bc   /* dashed borders, soft highlights */
jarFill:      #d4a84b   /* mustard — reward sunlight */
jarEmpty:     #f0e4d8   /* unfilled jar */
chip:         #f3e0d8   /* inactive category chip */
chipActive:   #c5d4b8   /* active category — muted sage */
fab:          #3d6b6b   /* deep teal FAB */
badDay:       #5a7a7a   /* bad-day CTA */
```

**Never:** pure red, alarm orange, GitHub-green heatmap guilt, high-contrast warning yellow.

### Dark mode palette (use exactly)

Night-sky variant — same Gentle Words mood, not a gray inversion. Deep teal wash, warm cream text, terracotta accents, golden jar glow.

```
bg:           #1a2f35   /* night-sky teal — page background */
bgElevated:   #243d44   /* cards, banners */
surface:      #2d4a52   /* panels, settings chip */
text:         #e8ddd4   /* warm cream ink */
textMuted:    #9ab0ab   /* labels, metadata */
accent:       #d4896f   /* terracotta — display headings, emphasis */
accentMuted:  #5c4842   /* dashed borders, soft highlights */
jarFill:      #e0b85a   /* golden sunlight — reward glow */
jarEmpty:     #354850   /* unfilled jar */
chip:         #354850   /* inactive category chip */
chipActive:   #3d5a50   /* active category — muted sage-teal */
fab:          #4a8a8a   /* teal FAB */
badDay:       #4a6a6a   /* bad-day CTA */
```

**Dark-mode decoration:** wash blobs use muted terracotta, gold, and teal glows at low opacity — same organic layering as light, different hues. Shadow: `0 4px 24px rgba(0, 0, 0, 0.28)`.

**Theme switching:** Settings → **Appearance** — System (default) / Light / Dark, persisted in IndexedDB (`settings.themeMode`). `ThemeManager` sets `data-theme` on `<html>`; CSS vars in `src/index.css` follow `:root`, `[data-theme="dark"]`, and `@media (prefers-color-scheme: dark)` on `:root:not([data-theme="light"])`.

**Scope:** all production routes (`/`, capture, bad-day, settings, celebration, follow-up). Design explorer (`/design/*`) stays light-only.

### Typography

- **Display / quotes / celebration:** `'Caveat', cursive` — script, warm, human
- **Body / UI chrome:** `'Outfit', system-ui, sans-serif` — clean, readable

**Rules:**

- Caveat for: page titles (“your wins”), bad-day quotes, celebration headlines, compassionate follow-up lead lines
- Outfit for: dates, category labels, button labels (when not display), metadata, settings copy
- Display headings: ~2–2.25rem on home; bad-day quotes ~1.5–1.75rem; always check legibility on 375px width
- Line-height generous (1.2–1.4 on display; 1.5+ on body)

### Shape & decoration

- **Organic blob washes:** layered `radial-gradient` circles at low opacity (peach, terracotta, teal, mustard) — pointer-events none, absolute positioned
- **Irregular radii:** prefer asymmetric `border-radius` (e.g. `1.25rem 1.5rem 1.25rem 1.75rem`, blob settings pill)
- **Wavy dividers:** SVG wave between sections (teal ink at ~15% opacity)
- **Dashed borders:** `1.5px dashed` using `accentMuted` for quiet banner, secondary cards
- **Subtle rotation:** ±0.9° to ±1.2° on entry cards and decorative elements — never on primary tap targets
- **Shadow:** `0 4px 24px rgba(45, 74, 74, 0.08)` — soft, teal-tinted
- **Card radius:** `1.5rem` default; chips `1rem`; buttons `2rem` pill

### Jar component

- Organic jar silhouette (not a rectangle progress bar)
- Mustard `#d4a84b` fill animates gently upward
- Empty state `#f0e4d8`
- Label below: Outfit, muted — e.g. `5 / 8 until bubble tea`
- First cycle: 8 target; later: 15 (or user setting)

### Key screens (patterns to match)

**Home**

- Header: Caveat “your wins” in terracotta, slight `-1deg` rotation; date in Outfit muted
- Jar hero centered with progress label
- Quiet banner (7+ days): elevated bg, dashed border, dismiss ×, encouraging copy
- Bad-day CTA: full-width, `badDay` tone, one tap
- Recent feed: 5 entries, `EntryCard` with subtle tilt
- Teal FAB bottom-center for capture

**Capture**

- Large text area on elevated surface
- Optional category chips (pill row, sage active state)
- Optional star toggle
- Save button: terracotta or teal — consistent with existing pages

**Bad-day mode**

- Full-screen quote card: entry text in Caveat, large, generous padding
- Swipe/carousel for big wins; empty state shows encouraging line + random win
- Zero entries: “Looking forward to seeing your wins here”
- Back link: Outfit, muted

**Celebration**

- Caveat headline — playful but soft (“time for a treat!”)
- Buttons: “Redeemed” / “Treat yourself” — pill, warm
- No confetti overload; no sound in MVP

**Follow-up (venting)**

- Caveat: “It’s ok to not feel ok”
- Outfit body: compassionate, no preaching
- Surface 2–3 past win cards below

**Settings**

- Outfit labels; organic settings chip area on home — **sun/moon quick toggle** (light ↔ dark) beside gear icon
- **Appearance:** segmented System / Light / Dark toggle in Settings (above export); home toggle sets explicit light or dark
- Export JSON — clear, calm, no urgency

---

## UX constraints (non-negotiable)

- No streaks, no heatmap, no mood picker, no push notifications
- No red empty-day markers
- No hard block on negative text — compassionate redirect only
- Capture friction: <10s, no title field
- FAB minimum 56px touch target
- `prefers-reduced-motion`: disable rotation and reduce animation

---

## Code conventions

- Theme tokens: `DESIGN_D` (light) and `DESIGN_D_DARK` in `src/design/tokens.ts`; re-exported as `APP_THEME` / `APP_THEME_DARK` from `src/theme/tokens.ts`
- **Always use `useAppTheme()`** in production components — returns `{ tokens, resolved, isDark }` with the correct palette for light/dark/system
- Tailwind `@theme` vars in `src/index.css` mirror light and dark token hex values
- `ThemeManager` (mounted in `App.tsx`) syncs `data-theme` and PWA `theme-color`
- Reuse: `AppShell`, `OrganicJar`, `WashBackground`, `WavyDivider`, `EntryCard`, `Fab`
- Inline `style={{ fontFamily: t.fonts.display, color: t.colors.accent }}` pattern for token-driven one-offs
- Design archive at `/design/*` — do not change A/B/C mocks when editing production; production uses D only

---

## Example component snippet

```tsx
import { useAppTheme } from '../theme/tokens';

function PageTitle() {
  const { tokens: t } = useAppTheme();

  return (
    <h1
      style={{
        fontFamily: t.fonts.display,
        color: t.colors.accent,
        fontSize: '2.25rem',
        lineHeight: 1.1,
        transform: 'rotate(-1deg)',
      }}
    >
      your wins
    </h1>
  );
}
```

---

## When adding new UI

1. Pull colors and fonts from `useAppTheme().tokens` — do not invent new hex values; test in **both** light and dark
2. Add wash blobs behind main content, not over text; use `WashBackground` (theme-aware)
3. Prefer dashed or soft borders over harsh dividers
4. Test at 375×812 — script headings must not wrap awkwardly
5. Copy tone: gentle, second person, no exclamation spam, no “you broke your streak”
6. Match existing pages in `src/pages/` before introducing new layout patterns
7. Never hardcode light-only hex — if you must reference a color outside tokens, add it to both `DESIGN_D` and `DESIGN_D_DARK`

---

## Reference routes

| URL | Purpose |
|-----|---------|
| `/` | Production home (canonical) |
| `/design/d` | Full Design D mock explorer + token panel |
| `src/design/DesignDPreview.tsx` | Detailed D component patterns |

**Do not** revert to Sage Garden (A), Warm Dusk (B), or Mist & Stone (C) for production surfaces unless explicitly requested.
