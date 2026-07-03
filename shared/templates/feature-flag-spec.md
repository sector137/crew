# Feature Flag Spec — `<flagKey>`

> One flag, one spec. A flag without an owner and an exit plan is tech debt with a switch on it.
> Convention: `shared/feature-flags.md`.

## TLDR

- **Key:** `<flagKey>` (camelCase; env form `FLAG_<SCREAMING_SNAKE>` / `VITE_FLAG_<SCREAMING_SNAKE>`)
- **Tier:** `app` | `infra` | `both`
- **Default:** `true` | `false`
- **Owner:** `<crew member / team>`
- **Status:** proposed | gated | rolling-out | full | retiring

## What it gates

<One or two sentences: what behavior turns on/off, and where the check lives (route / page / feature boundary).>

## Why this tier

<Who decides whether it's on — a tenant/project (app), the deployment (infra), or a gate-plus-opt-in (both). Reference the "Choosing a Tier" table.>

## Rollout plan

| Stage | Infra (`FLAG_...`) | App (per-unit) | Notes |
|-------|--------------------|----------------|-------|
| Dark | off | — | Merged, gated, off everywhere |
| Canary | on | opt-in for N units | Watch metrics/logs |
| GA | on | default on | |

## Kill-switch

<How ops turns this off in an incident. For anything user-facing, note the `VITE_FLAG_*` build var so the SPA reflects the lock.>

## Cleanup criteria

<The condition under which this flag and its dead branch get removed — e.g. "GA + 2 weeks stable, no rollback." Sal surfaces stale flags at `ship`.>

## Links

- Registry entry: `<app>/src/lib/flags.ts`
- Related issue / PRD / ADR:
