# Harbour Gratitude — motion & interaction spec (implementation handoff)

Companion to `CLAUDE_DESIGN_PROMPT.md` (Gentle Words / Design D). This file captures the
animation + entry-card decisions made in the motion-study session. Design D remains the
locked visual direction; everything below layers motion and interaction on top of it.

Prototypes referenced:
- `Harbour Motion Study.dc.html` — interactive phone, A/B/C motion directions + theme + reduced-motion.
- `Jar Options.dc.html` — reward-vessel exploration (option **1b** chosen).
- `Entry Card Options.dc.html` — long-entry card exploration (option **1c** chosen).

---

## 1. Decisions at a glance

| Area | Decision |
|---|---|
| Motion personality (production) | **Direction A — Gentle Words** is the production baseline. B (90s) and C (abstract) are exploration/archive only, unless explicitly requested. |
| Reward vessel | **Bubble tea cup (option 1b)** — pastel ombre, gentle drift, black pearls. |
| Long entries on home | **Option 1c — uniform peek cards**: fixed 2-line clamp + "read full win →", tap opens a detail bottom-sheet. |
| Reduced motion | All drift / bob / particle / rotation disabled; quiet cross-fades only. |
| Palette | Gentle Words tokens (light + dark). Bubble-tea ombre uses pastel tints in the same family (below). |

---

## 2. Motion directions (from the study)

Three personalities were prototyped. **A is production.** B and C documented for the archive.

### A — Gentle Words (PRODUCTION)
- **Entrance:** soft rise + fade. `@keyframes gwRise { from { opacity:0; translateY(22px) } to { opacity:1; translateY(0) } }`
- **Easing:** `cubic-bezier(.2,0,0,1)` — no overshoot. Card entrance `0.7s`, staggered `0.09s` per card.
- **Jar fill:** liquid rise, `1.1s cubic-bezier(.2,0,0,1)`, breathing shine highlight (`blink 2.6s`).
- **Save ripple:** small mustard/terracotta dots rise from the jar and fade (see §5).
- **Cards:** upright (no tilt), dashed `1.5px` accentMuted border, soft teal-tinted shadow `0 5px 20px rgba(45,74,74,.09)`.
- **FAB:** gentle idle pulse `fabIdle 3.4s` (scale 1 → 1.06).

### B — 90s Arcade (archive / playful alt)
- Entrance: sticker-slam with overshoot `cubic-bezier(.34,1.56,.64,1)`, `0.5s`.
- Chunky offset shadows `5px 5px 0 <ink>`, 2–3px black borders, square-ish radii (`.45rem`).
- Spinning/blinking star stickers in the wash; star-burst particles on save.
- Uses the **bubble-tea vessel with chunky black outline** (see §4) — but with the calm 1b drift, NOT a bounce.

### C — Abstract Flow (archive / expressive alt)
- Entrance: blur-in `cBlur` (blur 16px→0 + slight scale).
- Morphing animated-gradient wash blobs (`cMorph` + `cGrad`).
- Shimmering gradient jar fill; particle bloom on save.

> NOTE: gradients/particles in B & C are exploration only. Production (A) stays within the
> Gentle Words "mechanical and brief" motion budget.

---

## 3. Global motion tokens (production / Direction A)

```
--ease-standard: cubic-bezier(0.2, 0, 0, 1);   /* the only easing in production */
duration.state:      120ms   /* toggles, chips */
duration.component:  200–340ms /* cards, sheets, capture slide-up */
duration.page:       320ms
```

- **Card entrance:** 700ms rise+fade, stagger 90ms.
- **Capture screen:** slides up `slideUp 0.34s cubic-bezier(.2,0,0,1)`.
- **Detail sheet:** slides up `0.34s` + backdrop fade `0.2s`.
- **Toast:** `toastIn 1.8s` (in / hold / out), auto-dismiss.
- **Never** overshoot, spring, or scale-pop in production surfaces.

---

## 4. Reward vessel — Bubble tea (option 1b) ✅

Replaces the plain mason jar as the hero progress vessel.

**Structure**
- Cup: trapezoid via `clip-path: polygon(6% 0, 94% 0, 82% 100%, 18% 100%)`, ~138×138.
- Domed lid (ellipse + band), tilted straw (~15°).
- Empty state = `jarEmpty` token; fill rises from the bottom.

**Fill = pastel ombre (horizontal bands)**
- `linear-gradient(to bottom, …)` — colors stack as horizontal ombre layers (NOT diagonal, NOT vertical streaks).
- Pastel stops (Gentle Words family + soft lavender nod to reference):
  `#d9cfe0` (lavender) · `#e8c4bc` (dusty rose) · `#c5d4b8` (sage) · `#b8cdc7` (soft teal) · `#ecd8a8` (soft mustard).
- Second layer reversed, `mix-blend-mode: soft-light`, opacity ~.48–.55, for depth.
- Extra optional stops for a "pour per win" effect: `#cdd3e0`, `#e0c2cd`, `#c9d6c2`.

**Motion — gentle drift (NO waves, NO bounce)**
- The tea slowly breathes vertically; nothing sloshes.
- `@keyframes drift  { 0%,100% { background-position:50% 30% } 50% { background-position:50% 70% } }`
- `@keyframes driftB { 0%,100% { background-position:50% 70% } 50% { background-position:50% 30% } }`
- `background-size: 100% 220%`.
- Layer 1: `drift 6s ease-in-out infinite`; Layer 2: `driftB 7.5s ease-in-out infinite`.
- Intensity target ≈ **2.5 / 5** (calm but clearly alive). Earlier 5/5 sloshing wave + spiral was rejected.

**Pearls**
- Solid **black** (`#000`) circles, 12–14px, clustered at the cup base.
- Appear with `pop 0.4s cubic-bezier(.34,1.56,.64,1)` staggered ~50ms on save.

**Outline variants**
- Production (Gentle Words): thin `2px accentMuted` outline, plain straw.
- 90s Arcade direction: **chunky `3px` black outline** on cup, `2px` black on lid + straw — but keep the calm 1b drift (no bob).

**Progress label** (Outfit, muted, below vessel)
- In progress: `fill the jar, earn yourself a bubble tea · 5/8`
- Complete: `full · 8/8 — enjoy your bubble tea`
- First cycle target 8; later cycles 15 (or user setting).

---

## 5. Fill & save flow

- On **save**, jar count increments; new entry animates into the feed (direction's entrance anim).
- Save fires a brief **particle ripple** from the jar (A: mustard/terracotta dots rising & fading; ~10 particles, `fxRise` 0.9–1.6s).
- Toast confirms: `saved ✓` (or `jar full ✓`).
- When the jar reaches target → **celebration** screen after ~0.95s:
  - Caveat headline "time for a treat!", soft copy, `celebIn 0.4s`.
  - Buttons: "treat yourself" / "maybe later". No confetti overload, no sound (MVP).
- Redeem resets the jar to empty.

---

## 6. Entry cards — long text (option 1c) ✅

Goal: home feed stays glanceable (see many wins at once) while long entries remain fully readable on demand.

**Card (peek state)**
- Uniform, tidy cards; body text clamped to **2 lines**:
  ```css
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ```
- Header row: category chip (left) + optional ★ (right).
- Category chip uses **Caveat** (script), ~16px, on `chip` token background, pill radius.
- When text overflows (~>78 chars): show affordance `read full win →` in `accent`, 12.5px, below the clamp.
- Whole card is tappable (`cursor: pointer`).

**Detail sheet (on tap)**
- Bottom sheet slides up (`slideUp 0.34s`), backdrop `rgba(45,74,74,.32)` fades in.
- Grab handle (40×4, accentMuted), category chip + ★, full entry text (Outfit 16px, line-height 1.6).
- "close" button (ghost, pill). Tap backdrop or close to dismiss.
- Sheet is theme-aware (uses bgElevated / tokens); chip/button pick up direction radius.

**Why 1c** (over the alternatives explored)
- 1a *expand-in-place*: good, but variable card heights make the feed jumpier.
- 1b *compact single-line rows*: densest, but loses the warm card feel.
- **1c** keeps an even, calm stack (every card same height) AND full readability — best fit for "calm and grounded".

---

## 7. Reduced motion (`prefers-reduced-motion`)

Non-negotiable per Design D. When active:
- Disable: jar drift, FAB pulse, card tilt/slam/blur, star spin/blink, all particle FX, wash-blob drift.
- Replace entrances with a quiet cross-fade (`rmFade 0.3s ease`).
- Fill still animates height but linearly and briefly (~0.3s); no shimmer.
- Detail sheet / capture may still slide (short) or be swapped for a fade — keep it minimal.

---

## 8. Palette reference (from Design D — do not invent hex)

**Light:** bg `#f8ede4` · bgElevated `#fff9f4` · surface `#edd5c8` · text `#2d4a4a` · textMuted `#6b7f7a` · accent `#c4725a` · accentMuted `#e8c4bc` · jarFill `#d4a84b` · jarEmpty `#f0e4d8` · chip `#f3e0d8` · chipActive `#c5d4b8` · fab `#3d6b6b` · badDay `#5a7a7a`

**Dark:** bg `#1a2f35` · bgElevated `#243d44` · surface `#2d4a52` · text `#e8ddd4` · textMuted `#9ab0ab` · accent `#d4896f` · accentMuted `#5c4842` · jarFill `#e0b85a` · jarEmpty `#354850` · chip `#354850` · chipActive `#3d5a50` · fab `#4a8a8a` · badDay `#4a6a6a`

**Bubble-tea ombre (pastel, both themes):** `#d9cfe0` · `#e8c4bc` · `#c5d4b8` · `#b8cdc7` · `#ecd8a8` (+ optional `#cdd3e0`, `#e0c2cd`, `#c9d6c2`). Pearls: `#000`.

Fonts: **Caveat** (display/quotes/chips) · **Outfit** (UI/body). Both already in Design D.

---

## 9. Implementation notes for the repo

- Extend `OrganicJar` → add a `BubbleTeaJar` variant (cup + lid + straw + pearls + ombre fill). Keep the
  progress API identical (`count`, `target`).
- `EntryCard`: add `clamp` (2-line) + `onOpen` handler; add a shared `EntryDetailSheet` component.
- Drive all timings/easings from motion tokens (add to `tokens.ts`): `motion.ease`, `motion.driftFast (6s)`,
  `motion.driftSlow (7.5s)`, `duration.*`.
- Gate every animation behind `useReducedMotion()`.
- Test at 375×812 in **both** light and dark; verify Caveat chips don't clip and clamp works on real long text.
