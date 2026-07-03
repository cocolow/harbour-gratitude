# Design system — Harbour Gratitude

Four calm, **phone-first** visual directions were explored for the product (working title *Harbour Gratitude* / Personal Achievement Tracker). **Design D — Gentle Words** is the **chosen and implemented** direction for Phase 1.

---

## Chosen direction: D — Gentle Words

**Status:** Locked and applied in production UI (`src/index.css`, `src/theme/tokens.ts` → `APP_THEME`).

**Mood:** Personal, imperfect but good — like a hand-painted card from Morgan Harper Nichols. Gentle, reflective, breathing room.

| Token | Value | Role |
|-------|-------|------|
| Background | `#f8ede4` | Peach wash page bg |
| Elevated | `#fff9f4` | Cards, banners |
| Surface | `#edd5c8` | Dusty rose panels |
| Text | `#2d4a4a` | Deep teal ink |
| Text muted | `#6b7f7a` | Metadata, labels |
| Accent | `#c4725a` | Terracotta — headings, emphasis |
| Accent muted | `#e8c4bc` | Dashed borders, soft highlights |
| Jar fill | `#d4a84b` | Mustard — sunlight reward, not gamification |
| Jar empty | `#f0e4d8` | Unfilled jar |
| Chip | `#f3e0d8` / active `#c5d4b8` | Category pills |
| FAB | `#3d6b6b` | Deep teal capture button |
| Bad-day | `#5a7a7a` | Bad-day CTA tone |

**Typography:**

- **Caveat** — script for headings, quotes, celebration copy, bad-day cards
- **Outfit** — clean sans for labels, metadata, body UI

**Shape language:**

- Organic blob washes (CSS radial gradients via `WashBackground`)
- Irregular border-radii (e.g. `60% 40% 30% 70% / 55% 35% 65% 45%`)
- Wavy SVG dividers (`WavyDivider`)
- Dashed borders on quiet banner and secondary surfaces
- Subtle card rotation (±1°) on entry cards and settings chip
- Soft shadow: `0 4px 24px rgba(45, 74, 74, 0.08)`

**Jar:** Soft organic silhouette (`OrganicJar`) with mustard fill — reward feels like sunlight, not a KPI bar.

**Rationale for choosing D:**

- Most emotionally personal direction — journal-like, art-forward, distinct from typical wellness apps
- Product story is “gentle witness to your wins” rather than “track your habits”
- Pairs well with harbour/gratitude naming and compassionate copy (bad-day mode, follow-up)
- Portfolio-distinct without the cool distance of C or the generic warmth of A

**Tradeoffs accepted:**

- Script headings need size discipline on small screens
- Organic shapes must stay subtle — avoid chaotic UI
- Less conventionally “app-like,” more illustrated companion

---

## Explored alternatives (archive)

Design explorer mocks remain at `/design` and `/design/a`–`/design/d` for portfolio process documentation.

### A — Sage Garden

**Mood:** Fresh, grounded — “quiet garden after rain.”  
**Palette:** Cream `#f7f5f0`, sage `#8fa88a`, mint fill `#9bc4a4`, ink green `#3d4a3a`.  
**Type:** DM Sans + Fraunces.  
**Jar:** Mint-green fill.

**Fit:** Closest to original PRD palette; approachable wellness without spa cliché.  
**Passed over:** Less distinctive in a portfolio grid; reads as “another gratitude app.”

### B — Warm Dusk

**Mood:** Cozy, end-of-day reflection.  
**Palette:** Warm cream `#faf6f1`, terracotta `#c67b5c`, amber jar `#d4956a`.  
**Type:** Source Sans 3 + Libre Baskerville.  
**Jar:** Terracotta/amber — reward as treat.

**Fit:** Strong celebration / “treat yourself” association for bubble-tea loop.  
**Passed over:** Terracotta must stay muted to avoid guilt vibes; overlaps partially with D’s warmth without D’s art-forward personality.

### C — Mist & Stone

**Mood:** Minimal, spa-like, emotionally neutral.  
**Palette:** Cool mist `#f0f3f5`, stone blue-gray `#6b8a9a`, hairline borders.  
**Type:** Inter + Cormorant Garamond.  
**Jar:** Cool blue-gray — progress without gamified heat.

**Fit:** Most portfolio-“designed”; calm restraint.  
**Passed over:** Can feel cool/distant for first-time users; jar reads less “fun reward.”

---

## Shared UX patterns (all four explorations)

- **Jar is primary progress** — no 12-week heatmap in Phase 1 (`DECISIONS.md`).
- **Mobile shell** — ~390px preview width, thumb-sized FAB, single-column.
- **No red, no streaks, no mood charts** in any direction.
- **Bad-day** — full-width CTA on home; quote-style win card in preview strip.

---

## Implementation map

| Asset | Location |
|-------|----------|
| Design tokens (A–D) | `src/design/tokens.ts` |
| Active theme | `src/theme/tokens.ts` → exports `DESIGN_D as APP_THEME` |
| Global CSS variables | `src/index.css` (`@theme` block) |
| D-specific preview mocks | `src/design/DesignDPreview.tsx` |
| Shared preview shell | `src/design/DesignPage.tsx`, `DesignPreview.tsx` |
| Hub thumbnails | `src/pages/DesignHub.tsx` |
| Organic jar | `src/components/OrganicJar.tsx` |
| Wash backgrounds | `src/components/WashBackground.tsx` |
| Wavy dividers | `src/components/WavyDivider.tsx` |
| PWA theme-color | `index.html` → `#f8ede4` |
| Google Fonts | Caveat + Outfit in `index.html` |

---

## How to preview

```bash
npm install
npm run dev
```

| Route | Content |
|-------|---------|
| `/` | **Live app** — Design D production UI |
| `/design` | Side-by-side hub (A/B/C/D thumbnails) |
| `/design/a` | Sage Garden — full mocks + token panel |
| `/design/b` | Warm Dusk — full mocks + token panel |
| `/design/c` | Mist & Stone — full mocks + token panel |
| `/design/d` | Gentle Words — full mocks + token panel |

Each full design page includes: **Home** (jar, recent feed, bad-day CTA, FAB), **bad-day quote card**, **capture mock**, and **token panel** (colors, type, spacing, elevation).

---

## Design guardrails (Phase 1)

- Never use red or alarm orange for empty states, quiet days, or errors
- No streak counters, flame icons, or guilt copy
- Animations: subtle — slow jar fill, soft celebration; no harsh bounce
- FAB always reachable; single-column layout; large tap targets
- Quote rendering in bad-day mode: generous whitespace, Caveat at readable size
- Organic effects: decorative only — must not reduce text contrast or touch targets

---

## Dark mode (Design D)

**Status:** Implemented for the live app (`/`, capture, bad-day, settings, celebration, follow-up).

| Token | Light | Dark | Role |
|-------|-------|------|------|
| Background | `#f8ede4` | `#1a2f35` | Page wash — peach (light) / night-sky teal (dark) |
| Elevated | `#fff9f4` | `#243d44` | Cards, banners |
| Surface | `#edd5c8` | `#2d4a52` | Panels, settings chip |
| Text | `#2d4a4a` | `#e8ddd4` | Primary ink — warm cream on dark |
| Text muted | `#6b7f7a` | `#9ab0ab` | Labels, metadata |
| Accent | `#c4725a` | `#d4896f` | Terracotta headings |
| Accent muted | `#e8c4bc` | `#5c4842` | Dashed borders |
| Jar fill | `#d4a84b` | `#e0b85a` | Mustard sunlight glow |
| Jar empty | `#f0e4d8` | `#354850` | Unfilled jar |
| Chip / active | `#f3e0d8` / `#c5d4b8` | `#354850` / `#3d5a50` | Category pills |
| FAB | `#3d6b6b` | `#4a8a8a` | Capture button |
| Bad-day | `#5a7a7a` | `#4a6a6a` | Rough-day CTA gradient |

**Mechanism:**

- CSS custom properties in `src/index.css` — `:root` / `[data-theme="dark"]` / `@media (prefers-color-scheme: dark)` on `:root:not([data-theme="light"])`
- Runtime tokens: `DESIGN_D_DARK` in `src/design/tokens.ts`; components use `useAppTheme()` hook
- **Settings → Appearance:** System (default) / Light / Dark — persisted in IndexedDB (`settings.themeMode`)
- `ThemeManager` syncs `data-theme` on `<html>` and PWA `theme-color` meta tag
- Dark wash blobs use muted terracotta, gold, and teal glows (not gray inversion)

Design explorer routes (`/design/*`) remain light-only previews of each direction.
