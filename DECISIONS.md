# Product decisions (locked for Phase 1 build)

Status: **Phase 1 build in progress** — Design **D (Gentle Words)** chosen. See `DESIGN.md`.

---

## Scope

| Topic | Decision |
|-------|----------|
| Version | **Phase 1 only** — no Phase 2 / v1.1 features (random win, themes summary, category rename/reorder/custom, import, accounts, push) |
| Platform | **Phone only** — mobile-first PWA, optimize for iOS Add to Home Screen; no desktop-specific layouts |

---

## Jar & rewards

| Topic | Decision |
|-------|----------|
| Adaptive jar | **First cycle: 8 entries** before any redemption. **After first redemption: 15** (or `jarSize` from Settings, default 15). |
| Persistence | Store `redemptionCount` (or `hasCompletedFirstRedemption`) in IndexedDB so refresh preserves cycle behavior. |
| UI copy | First cycle: `X / 8 until {rewardLabel}`. Later: `X / 15 until …`. |
| Celebration | On hitting **current** cycle target → celebratory screen → user taps **"Redeemed"** or **"Treat yourself"** → counter resets to 0, redemption date recorded. |
| Sound | **None** in MVP |

---

## Home & progress visuals

| Topic | Decision |
|-------|----------|
| Heatmap vs jar | **Recommendation: drop 12-week GitHub-style heatmap from Phase 1.** User leans **jar-only**; two competing progress visuals risk guilt and confusion. |
| Phase 1 implementation | **Jar as primary progress.** No heatmap. Optional later: minimal non-guilt “activity” (e.g. 7 neutral dots for “had an entry”) — **not** in Phase 1 unless explicitly added after jar ships. |
| Recent feed | Last **5** entries, reverse-chronological |
| Quiet banner | Show on app open if **no entry in 7+ days** (not 4). One banner per quiet stretch; dismissible; clears on next entry. No push notifications. |

---

## Capture & entries

| Topic | Decision |
|-------|----------|
| Capture | Single text box, no title; auto date/time on save; optional category chips; optional star; &lt;10s friction |
| Categories | **Six presets only** for MVP — Work, Health, Relationships, Creative, Personal Growth, Small Joys. No rename/reorder/custom until v1.1 |
| Negative / venting | **No hard block.** Optional lightweight heuristic after save → compassionate follow-up (“It’s ok to not feel ok”) + surface **2–3 past wins** (recent or random). Calm copy, no preaching. |
| `reReadCount` | Increments **only** when entry opened in **bad-day full-screen** view — not from home feed |
| `big_win` | `starred && reReadCount >= 2` |
| Bad-day mode | Carousel of big wins, most recent first; empty state: encouraging line + **random past win**; zero entries: “Looking forward to seeing your wins here” (or similar). Fallback: recent starred if no big wins yet. |

---

## Data & backup

| Topic | Decision |
|-------|----------|
| Storage | **IndexedDB** local only |
| Export | JSON export in Settings |
| Import | **No** import in Phase 1 |
| Backup nudge | Soft periodic nudge to export; CTA runs **same JSON export** immediately |
| Accounts / backend | **None** |

---

## Analytics — event logging (Q9)

**Question:** How much effort to log portfolio metrics?

**Answer:** **Low effort — recommend lightweight local event log from day 1.**

- IndexedDB is already required for entries.
- Add an append-only `events` store, e.g. `capture`, `re_read`, `bad_day_open`, `jar_fill`, `redemption`, `export`, `banner_dismiss`.
- Rough estimate: **~few hours** vs manual spreadsheet tracking.
- No analytics SDK; data stays on device; export can include events later if needed for case study.

---

## Design system

| Topic | Decision |
|-------|----------|
| Visual direction | **Design D — Gentle Words** (Morgan Harper Nichols inspired): peach washes, Caveat + Outfit, organic shapes, teal FAB. Design explorer kept at `/design/*` for reference. |

---

## Deferred to Phase 2 / v1.1

- Random win, themes summary in bad-day mode  
- Category rename, reorder, up to 3 custom categories  
- JSON import  
- Push notifications  
- Celebration sound  
- 12-week heatmap (if ever) — only if user explicitly wants after jar-only ships  
