# Docs Links — docs.sector137.io

Single source of truth for every docs URL the crew cites. Skills inline the literal
URL (no runtime file read); `bun run lint:links` verifies each one resolves and that
no file invents a docs URL that isn't in this table.

Routes are real paths on the docs site, which mounts at the site root (no `/docs`
prefix).

## Cited by the crew

| key | url | cited by |
|-----|-----|----------|
| claude-code | https://docs.sector137.io/claude-code | mode-detection (auth), update, README |
| getting-started | https://docs.sector137.io/getting-started | prototype, init, README |
| releases | https://docs.sector137.io/features/releases | release, ship |

## Available (not yet cited — real pages, safe to link)

| key | url |
|-----|-----|
| intro | https://docs.sector137.io/ |
| developer-guide | https://docs.sector137.io/developer-guide |
| roadmap | https://docs.sector137.io/features/roadmap |
| changelog | https://docs.sector137.io/features/changelog |
| kano-analysis | https://docs.sector137.io/features/kano-analysis |
| notifications | https://docs.sector137.io/features/notifications |
| integrations | https://docs.sector137.io/integrations |
| api | https://docs.sector137.io/api |
| api-authentication | https://docs.sector137.io/api/authentication |
| webhooks | https://docs.sector137.io/webhooks |

## Pages that do not exist yet

No docs page currently covers these crew concepts. Do NOT invent URLs for them —
publish the page on the docs site first, then add a row above. Until then, cite the
closest real page (noted in parentheses).

- Offline mode / `.sector137/roadmap.md` (cite `claude-code`)
- Prototypes / Studio (cite `getting-started`)
- Plugin install / update from the marketplace (cite `getting-started` / `claude-code`)
