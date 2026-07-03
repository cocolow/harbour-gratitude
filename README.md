# Personal Achievement Tracker

Phone-first PWA for capturing wins, revisiting them on hard days, and earning symbolic rewards via an adaptive jar.

**Visual direction:** Design D — Gentle Words (peach washes, script + sans typography).

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Routes

| URL | Screen |
|-----|--------|
| `/` | Home — jar progress, recent feed, quiet banner, bad-day CTA |
| `/capture` | Log a new win |
| `/bad-day` | Big-wins carousel for rough days |
| `/settings` | Reward label, jar info, JSON export |
| `/celebration` | Jar full — redeem reward |
| `/follow-up` | Compassionate moment after venting-style entries |
| `/design` | Design explorer archive (A/B/C/D mocks) |

## Docs in repo

- `DESIGN.md` — four visual directions (D chosen)  
- `DECISIONS.md` — Phase 1 scope and locked product decisions  
- `PORTFOLIO.md` — portfolio / PM case study guide  

## Build & PWA

```bash
npm run build
npm run preview
```

Install via Safari → Add to Home Screen. Manifest uses `favicon.svg` (no PNG icons yet).

## Data

All data stays on-device in IndexedDB (`entries`, `settings`, `jar`, `events`). Export JSON from Settings for backup.

Event types: `capture`, `re_read`, `bad_day_open`, `jar_fill`, `redemption`, `export`, `banner_dismiss`.
