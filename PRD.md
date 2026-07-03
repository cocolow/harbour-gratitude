# Harbour Gratitude — Product Requirements Document

**Author:** Oak (Coco)  
**Version:** Phase 1 (locked)  
**Status:** Build in progress  
**Repo:** [cocolow/harbour-gratitude](https://github.com/cocolow/harbour-gratitude)  
**Last updated:** July 2026

> **Naming direction:** Harbour / Harbor / Gratitude theme. Working title *Harbour Gratitude*; legacy docs may reference “Personal Achievement Tracker.”

---

## 1. Vision

Most of us only think to journal when we feel bad. By the time we open a notebook, we are already in the dip — looking back over a story where nothing has worked and we are not good enough. **Harbour Gratitude** is the opposite tool: a calm, phone-first PWA that pulls me toward noticing wins when things are neutral or going well, and gives me something tangible to return to on the days when my mood says everything is broken.

**North star:** When I open this app on a low day, I should immediately feel grounded, reassured, and reminded that every small step I have taken is still a step forward.

---

## 2. Problem statement

I tend only to journal when I am in a bad mood. The act of reflecting is therefore biased toward distress, and my historical record skews negative. I have no easy way to look back and see all the small and meaningful things I have done. On low days I lack evidence of my own progress and underestimate how much I am actually doing.

**The product must:**

- Encourage capture of wins in real time, even on neutral or good days.
- Give me something to return to when I feel low — re-read evidence of my own progress.
- Visualise progress in a way that feels calm and reassuring, not performative.
- Connect digital tracking to a physical reward so my offline self also feels the win.

**Deferred (not Phase 1):** Themes and patterns surfacing, cross-device sync, social features.

---

## 3. User

**Primary and only user:** Coco / Oak — PM, mobile-first, sometimes prone to underestimating own progress.

Build is for personal use; success measured by own usage and emotional outcomes over a structured longitudinal experiment (see §12). Portfolio artifact for [cocolow.github.io](https://cocolow.github.io).

---

## 4. Design principles

| Principle | Meaning |
|-----------|---------|
| **Re-reading first, capture second** | Returning to past entries is the primary experience; capture feeds it. |
| **Calm and grounded** | Palette, copy, animations, and reminders should leave me more settled, not wound up. |
| **Friction-free capture** | Logging takes under 10 seconds. No title, no rating, no mandatory category. |
| **No streaks, no shame** | Empty days are never marked red. Quiet stretches are not punished. |
| **Wins-primary, venting allowed** | Space is optimised for positive evidence. Negative or venting entries are **not blocked** — a compassionate follow-up surfaces past wins instead of preaching. |
| **Self-correcting signals** | “Big wins” require both intent (star) and behaviour (re-reads in bad-day mode). |
| **Physical reward loop** | Digital progress connects to an offline treat (default: bubble tea). Reward lives in the real world. |
| **Jar-only progress (Phase 1)** | No 12-week guilt heatmap. One primary progress visual avoids competing guilt surfaces. |

---

## 5. Success metrics

### Behavioural (passively tracked via local event log)

| Metric | Target / use |
|--------|----------------|
| Entries per week | ≥ 3 once habit established |
| Active days per week | ≥ 2 |
| Re-read events per week | Entries opened in bad-day full-screen view |
| Jar redemptions | `redemption` events; avg days per cycle |
| First-cycle time-to-reward | Days to first redemption (8-entry cycle) |
| Categorization % | Entries with category / total |
| Big-win pool growth | `starred && reReadCount >= 2` |

### Subjective (self-reported, periodic)

- “When I open this app, I feel calm.” (1–5)
- “On bad days, this app helps me feel less harsh on myself.” (1–5)
- “I am capturing more wins than I would otherwise have noticed.” (1–5)

### Anti-metrics (explicitly not optimised)

- Time spent in app
- Push notification opt-in
- Streak length
- Daily active use as a checkbox habit

---

## 6. Phase 1 scope (MVP — locked)

### 6.1 Platform

- **Phone only** — mobile-first PWA, optimised for iOS Add to Home Screen.
- No desktop-specific layouts.
- Offline-capable; static hosting (GitHub Pages or Netlify).

### 6.2 Capture

- Single text box; **no title**.
- Date and time auto-tagged on save.
- Optional category chips (six presets; skippable).
- Optional star (candidate big win).
- Save in under 10 seconds.
- **Negative / venting:** no hard block. Lightweight heuristic after save → navigate to compassionate follow-up (“It’s ok to not feel ok”) + surface **2–3 past wins** (recent or random). Calm copy, no preaching.

**Preset categories only (Phase 1):** Work, Health, Relationships, Creative, Personal Growth, Small Joys. No rename, reorder, or custom categories until v1.1.

### 6.3 Home screen

- **Jar as primary progress** — organic jar silhouette with fill animation. Copy: first cycle `X / 8 until {rewardLabel}`; later cycles `X / 15 until …` (or user `jarSize` from Settings, default 15).
- **Recent feed** — last 5 entries, reverse-chronological.
- **Bad-day CTA** — one tap to bad-day mode.
- **FAB** — large, thumb-friendly capture button (teal in Design D).
- **Quiet banner** — on app open if **no entry in 7+ days** (not 4). One banner per quiet stretch; dismissible; clears on next entry. Varied encouraging messages.
- **No 12-week heatmap** in Phase 1.

### 6.4 Bad-day mode

- One tap from home; full-screen focused view.
- **Carousel:** big wins (`starred && reReadCount >= 2`), most recent first.
- **Empty / thin pool:** encouraging line + **random past win**; fallback to recent starred if no big wins yet.
- **Zero entries:** “Looking forward to seeing your wins here” (or similar).
- `reReadCount` increments **only** when entry opened in this full-screen carousel — not from home feed.
- **Not in Phase 1:** themes summary carousel panel, random-win as separate swipe section (Phase 2).

### 6.5 Big-win logic

```
big_win = (starred = true) AND (re_read_count ≥ 2)
```

Re-read count increments only in bad-day full-screen view.

### 6.6 Adaptive jar & redemption

| Cycle | Target | Notes |
|-------|--------|-------|
| First (before any redemption) | **8 entries** | Early win; `redemptionCount === 0` |
| After first redemption | **15 entries** (default) | Configurable `jarSize` in Settings |

- Persist `redemptionCount`, `redemptionDates`, `currentCount` in IndexedDB.
- On hitting current target → **celebration screen** → user taps **“Redeemed”** or **“Treat yourself”** → counter resets to 0, redemption date recorded.
- **No sound** in MVP.
- Configurable in Settings: `jarSize` (default 15), `rewardLabel` (default “bubble tea”).

### 6.7 Reminders

- **In-app banner only** — no push notifications in Phase 1.
- Trigger: 7+ days without capture (see §6.3).
- Calm, varied copy; dismissible.

### 6.8 Data, storage & backup

- **IndexedDB** local only — stores: `entries`, `settings`, `jar`, `events`.
- **JSON export** — one tap in Settings; downloads backup.
- **Soft backup nudge** — periodic gentle prompt; CTA runs same JSON export immediately.
- **No import** in Phase 1.
- **No accounts, no backend, no cloud sync.**

### 6.9 Event logging (portfolio metrics)

Lightweight append-only `events` store from day 1:

```ts
type EventType =
  | 'capture'
  | 're_read'
  | 'bad_day_open'
  | 'jar_fill'
  | 'redemption'
  | 'export'
  | 'banner_dismiss';
```

Each row: `{ id, type, timestamp, meta? }`. No analytics SDK; data stays on device. Export may include events later for case study.

### 6.10 Visual design (Phase 1)

**Chosen direction: Design D — Gentle Words** (see `DESIGN.md`, `CLAUDE_DESIGN_PROMPT.md`).

- Peach washes, terracotta accent, mustard jar fill, deep teal FAB.
- Typography: **Caveat** (display, quotes, CTAs) + **Outfit** (UI chrome).
- Organic shapes: blob washes, irregular radii, wavy dividers, subtle card rotation.
- Design explorer archive retained at `/design/*` for A/B/C/D reference.

---

## 7. Deferred scope

### Phase 2 / MVP+

- Bad-day full carousel (themes summary as third panel)
- Insights / Themes view (category bars, monthly line, top starred/re-read)
- Optional minimal non-guilt activity indicator (e.g. 7 neutral dots) — only if explicitly wanted after jar ships
- JSON import

### v1.1

- Category rename, reorder, up to 3 custom categories
- Play / Quick capture mode (60s timer, auto-save, opt-in)
- Experiment dashboard in Settings
- Friction rating per entry
- Celebration sound
- Push notifications (conservative triggers, if ever)

### Out of scope (non-goals)

- Streaks and streak warnings
- 12-week GitHub-style heatmap (rejected for Phase 1; guilt surface)
- Social / sharing / leaderboards
- AI categorisation, summaries, rewriting
- Mood tracking
- Title field on entries
- Comparisons / “vs last month” guilt framings
- Hard block on negative entries

---

## 8. User flows

### 8.1 Capture (default)

Home → FAB → text box → type → (optional) category → (optional) star → Save → jar increments → home. If venting heuristic fires → follow-up with past wins.

### 8.2 Bad-day mode

Home → Bad Day → big-wins carousel (swipe) → optional random win in empty states → Back → home.

### 8.3 Jar redemption

Save entry that fills jar → celebration → “Redeemed” / “Treat yourself” → jar resets → home.

### 8.4 Quiet-day banner

Open app after 7+ days idle → soft banner → tap → capture → save → banner clears for stretch.

### 8.5 Backup nudge

Settings or soft nudge → Export JSON → file saved locally / shared to iCloud etc.

---

## 9. Routes (implemented)

| Route | Purpose |
|-------|---------|
| `/` | Home — jar, recent feed, quiet banner, bad-day CTA |
| `/capture` | Log a win |
| `/bad-day` | Big-wins carousel |
| `/settings` | Reward label, jar info, JSON export |
| `/celebration` | Jar full — redeem reward |
| `/follow-up` | Compassionate moment after venting-style entries |
| `/design` | Design explorer hub (archive) |
| `/design/a`–`/design/d` | Full mocks per direction |

---

## 10. Technical approach

| Area | Choice |
|------|--------|
| Type | PWA — installable, offline, full-screen on home screen |
| Stack | React 19 + TypeScript + Vite + Tailwind CSS 4 |
| Storage | IndexedDB via `idb` |
| Hosting | Static (GitHub Pages target: `cocolow/harbour-gratitude`) |
| Offline | Service worker (`vite-plugin-pwa`) |
| Fonts | Google Fonts: Caveat, Outfit |

---

## 11. Decision rationale (PM considerations)

### Re-reading first

Most apps optimise capture. Hypothesis: emotional value sits in **returning** on a low day. Drives home feed, bad-day as first-class surface, and compound big-win signal.

### Streak rejection

Streak mechanics create the “I’m not good enough” feeling this product counters. Load-bearing principle — unlikely to revisit.

### Heatmap rejected (Phase 1)

Standard activity heatmaps punish empty days visually — same anti-pattern as streaks. **Jar-only** keeps one calm progress story. User leans jar-first; two competing visuals risk guilt and confusion.

### Adaptive jar (8 → 15)

Open question in original PRD — **resolved:** first cycle 8 entries for early tangible reward; 15 thereafter for sustained effort. Persist redemption state across refresh.

### Wins-primary, not wins-only

Original PRD excluded negative entries entirely. **Updated:** no hard block; compassionate redirect preserves honesty without collapsing into a generic journal.

### Compound big-win signal

Star alone degrades over time. Star + re-read behaviour self-corrects toward entries that genuinely resonate.

### Physical reward loop

Digital rewards are abstract; bubble-tea jar ties pixels to offline treat. Jar metaphor pairs naturally with redemption.

### In-app banner over push

PWAs on iOS have push complexity; banners align with calm principle — greet when user arrives, don’t fight for attention. **7 days** (not 4) reduces noise for infrequent-but-intentional use.

### Local-first IndexedDB

Single user, privacy, offline, no backend cost. JSON export is critical insurance against browser data loss.

### Lightweight event log

~Few hours to implement vs manual spreadsheet tracking; enables portfolio metrics without third-party analytics.

---

## 12. Validation methodology

**n = 1** personal experiment. Sequential longitudinal design (not A/B):

| Phase | Window | Focus |
|-------|--------|-------|
| Phase 1 | Weeks 1–4 | MVP baseline — capture, re-read, jar, banner |
| Phase 2 | Weeks 5–8 | MVP+ features if shipped |
| Phase 3 | Weeks 9–12 | Stable state — honest long-term pattern |

**Hypotheses (v1.1 Play mode — deferred):**

- H1: Play mode increases capture frequency ≥ 20% vs baseline
- H2: Play mode entries feel more vivid on re-read (subjective)
- H3: Play mode preferred for Small Joys / Creative vs Personal Growth

**Caveats:** novelty effect, no blinding, single user, life circumstances vary. Report as exploratory personal experiment.

---

## 13. Portfolio & documentation

| Doc | Purpose |
|-----|---------|
| `PRD.md` | This document — consolidated product spec |
| `DECISIONS.md` | Locked Phase 1 decision log |
| `DESIGN.md` | Visual direction exploration + chosen system |
| `CLAUDE_DESIGN_PROMPT.md` | Implementation prompt for Design D |
| `PORTFOLIO.md` | Case study screenshots, metrics, story beats |

---

## 14. Glossary

| Term | Definition |
|------|------------|
| **PWA** | Progressive Web App — installs to home screen, offline-capable |
| **IndexedDB** | Browser-native structured storage; persists until cleared |
| **Big win** | Starred entry re-read ≥ 2 times in bad-day mode |
| **Adaptive jar** | 8-entry first cycle, then 15 (or configured size) |
| **Quiet banner** | In-app nudge after 7+ days without capture |

---

## 15. Resolved open questions (from original PRD)

| Question | Resolution |
|----------|------------|
| Adaptive jar? | **Yes** — 8 first cycle, 15 after first redemption |
| Cross-device sync? | Defer to v2 |
| Backup automation? | **Yes** — soft nudge + one-tap JSON export |
| Heatmap → garden metaphor? | **Dropped** for Phase 1; jar-only |
| Which visual direction? | **Design D — Gentle Words** |
| Negative entries? | **Allow** with compassionate follow-up (revised from wins-only) |
| Quiet banner threshold? | **7 days** (revised from 4) |
