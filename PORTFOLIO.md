# Portfolio guide — Personal Achievement Tracker

For a PM case study on [cocolow.github.io](https://cocolow.github.io): position this as **behavior design for emotional resilience**, not a generic gratitude journal.

---

## Must-have screenshots

Capture these **after** design system is chosen and Phase 1 is built (use real device frames, iOS home-screen context where relevant).

| # | Screen | Why it matters |
|---|--------|----------------|
| 1 | **Emotional framing (before/after)** | Split or carousel: “bad day spiral” → “one tap to past wins” — story before UI chrome |
| 2 | **Home — jar primary** | Shows `5/8` or `12/15`, recent feed, FAB — proves jar-only progress (no guilt heatmap) |
| 3 | **Capture flow** | Empty → filled text → saved — under-10-second promise |
| 4 | **Bad-day mode** | Full-screen quote card, swipe/carousel — re-read mechanic visible |
| 5 | **Jar full + redemption** | Celebration + “Redeemed” / “Treat yourself” — physical reward loop |
| 6 | **Compassionate negative-entry moment** | Post-save gentle copy + 2–3 surfaced wins — shows empathy without blocking |
| 7 | **Export / backup nudge** | Settings export + soft nudge banner — data ownership story |
| 8 | **Mobile install** | Safari → Add to Home Screen → standalone icon on home screen |

Optional: **Design exploration** grid (A/B/C) to show process rigor.

---

## Metrics to cite (with caveats)

All metrics are **n=1** (personal dogfood). State methodology openly.

| Metric | Definition | Why PMs care |
|--------|------------|--------------|
| **Entries / week** | Count of saves per 7-day window | Engagement without streak pressure |
| **Re-read rate** | `bad_day_open` events where `re_read` fired / big-win pool size | Validates “re-reading wins” hypothesis vs capture-only |
| **Categorization %** | Entries with category / total entries | Optional friction vs structure tradeoff |
| **Jar cycles** | `redemption` count; avg days per cycle | Reward loop completion |
| **First-cycle time-to-reward** | Days to first redemption (8-entry cycle) | Adaptive jar UX outcome |
| **Star rate** | Starred / total | Intent to revisit |
| **Big-win pool growth** | Entries with `reReadCount >= 2` and starred | Compound signal for bad-day carousel |
| **Subjective 1–5** | Weekly: “Did this help on a hard day?” | Qualitative outcome tied to bad-day mode |

**Caveats to state in case study:** single user, no A/B, events stored locally, no statistical significance — framed as **exploratory personal experiment** and portfolio artifact.

---

## Story beats for the case study

1. **Problem:** Low moods erase memory of competence; capture-only journals don’t help on bad days.  
2. **Insight:** **Re-reading** past wins matters more than logging new ones when you feel awful.  
3. **Design choice — reject streaks:** No red heatmap, no streak counter — avoids guilt spiral (link to DECISIONS).  
4. **Compound “big win” signal:** Star + revisit (`reReadCount >= 2`) surfaces what actually resonated, not everything typed once.  
5. **Physical reward loop:** Adaptive jar (8 → 15) + symbolic redemption — ties digital wins to real treat (bubble tea).  
6. **Compassionate guardrails:** No block on negative text; gentle redirect to past wins.  
7. **Ship constraints:** Local-first, PWA, no backend — intentional scope for portfolio velocity.  
8. **What’s next (honest):** Phase 2 themes/random win; optional 7-day neutral dots if users miss temporal context.

---

## Suggested case study structure (1 page + appendix)

- **Hero:** Bad-day before/after + one metric (e.g. re-read rate)  
- **Process:** Design A/B/C thumbnail + chosen direction rationale  
- **Solution:** 3 screenshots (home, bad-day, jar redemption)  
- **Impact:** Small table of metrics + 1 quote from weekly 1–5  
- **Learnings:** What you’d test with n>1 (heatmap rejected, jar-first, etc.)  
- **Appendix:** Link to repo, `DECISIONS.md`, event schema  

---

## Event log schema (for metrics section)

When Phase 1 ships, document in README:

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

Each row: `{ id, type, timestamp, meta? }` — enables portfolio charts without third-party analytics.
