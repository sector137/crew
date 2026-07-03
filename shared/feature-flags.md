---
name: feature-flags
description: "Crew convention for feature flags — the two-tier model (app-level + infra-level), the shared @sector32/feature-flags package, and the flag lifecycle. Read before gating any new feature."
---

# Feature Flags — Crew Convention

> *"A flag is a promise you can keep or break without a redeploy. Build the switch before you build the room behind it."* — Kael

This is the canonical convention for how Sal's crew ships features behind flags. It travels with the plugin, so every project the crew works on inherits it. The reference implementation lives in this repo at `apps/app` (see `apps/app/src/lib/flags.ts` + `apps/app/client/src/hooks/use-flags.ts`).

## Why

Flags let us ship dark, roll out gradually, and kill a feature without a deploy. Two kinds of control matter, and every app must be able to support **either or both**:

- **App-level ("top-level") flags** — owned inside one app. The unit of control is something the app already models: a project, a workspace, a user. Stored in the app's own data (a DB column, a config row). Example: `projects.enableWiki` in `apps/app`.
- **Infra-level flags** — a shared, env/config-driven set that spans apps. The unit of control is the *deployment / environment*. This is the rollout gate and the kill-switch ops reaches for when something is on fire. Backed by env today; a DB or PostHog resolver can slot in later behind the same interface.

## The Package: `@sector32/feature-flags`

One provider-agnostic core resolves all tiers. Do **not** hand-roll flag checks (`project.enableX !== false` scattered through the code) — route every check through the package so precedence is consistent.

```ts
import { createFeatureFlags, envResolver, appResolver } from "@sector32/feature-flags";

const registry = {
  enableWiki: { key: "enableWiki", tier: "both", default: true, owner: "engineering-kael" },
};

export const flags = createFeatureFlags({
  registry,
  infra: envResolver(process.env),                                  // FLAG_ENABLE_WIKI
  app: appResolver((def, ctx) => (ctx.project as any)?.[def.key]),  // per-project column
});

flags.isEnabled("enableWiki", { project }); // boolean
```

Browser (Vite): `envResolver(import.meta.env, { prefix: "VITE_FLAG_" })`, or the React binding `@sector32/feature-flags/react` (`FeatureFlagsProvider`, `useFlag`).

### Pluggable providers

The infra tier is env-backed by default, but any tier accepts **any provider** — sync or async, duck-typed, no SDK dependency in the package. Stack a provider over env with `firstOf(...)` so a flag the provider doesn't know about falls back to `FLAG_*`:

```ts
infra: firstOf(
  posthogResolver(phClient, { distinctId: (ctx) => ctx.userId }),  // PostHog (async)
  envResolver(process.env),                                        // fallback
)
```

- `posthogResolver(client, { distinctId, flagKey? })` — PostHog (posthog-node async / posthog-js sync).
- `providerResolver(fn)` / `asyncProviderResolver(fn)` — adapt any sync / async source (LaunchDarkly, a flags service).
- Network-backed providers are **async**: resolve with `isEnabledAsync` / `getAllAsync`. The sync API throws rather than silently dropping a provider's opinion.

In `apps/app`, plug one in at bootstrap with **zero call-site changes** via `registerInfraProvider(...)` (see `apps/app/src/lib/flags.ts`). Choosing a provider is an engineering decision — record it in an ADR. The default stays env/config (deterministic, git-versioned) until there's a reason to reach for a service.

## Choosing a Tier

Each flag declares a `tier`: `app`, `infra`, or `both`. Pick by asking *who decides whether this is on*:

| Situation | Tier | Why |
|-----------|------|-----|
| Each tenant/project chooses for themselves | `app` | The app owns the toggle; ops can still kill-switch it. |
| One central rollout/kill-switch across the whole deployment | `infra` | Environment decides; individual tenants can't force it on. |
| Per-tenant opt-in **behind** a central rollout gate | `both` | Infra opens the gate, then each app unit opts in. |

## Resolution & Precedence (know this cold)

```
enabled = infraAllows(flag) AND appAllows(flag)
```

- The tier(s) named by `tier` are **authoritative** and fall back to `default` when their resolver abstains.
- The other tier can only **veto** (force OFF / kill-switch) — it can never force a flag ON.

Consequences worth internalizing:
- An **infra kill-switch always wins.** `FLAG_ENABLE_WIKI=off` hides Wiki everywhere, whatever a project set.
- Infra saying **ON means "allowed," not "forced."** A project that opted out stays out.
- A **`both` flag with `default: false` stays off until infra opens the gate** — then each app unit opts in. That's the safe rollout shape for unfinished work.

## Env Conventions

- Server: `FLAG_<SCREAMING_SNAKE_KEY>` (e.g. `FLAG_ENABLE_WIKI=off`).
- Browser (Vite): `VITE_FLAG_<SCREAMING_SNAKE_KEY>` — set this too when a user-facing feature needs the SPA to reflect an infra kill-switch (locked toggle, "managed at infra level").
- Truthy: `on|true|1|enabled|yes`. Falsy: `off|false|0|disabled|no`. Anything else = abstain.

## Flag Lifecycle

Every flag is a temporary object with an owner and an exit plan. Kael owns implementation; Sal tracks rollout and cleanup through the pipeline.

1. **Add** — declare it in the app's registry with a `tier`, `default`, `owner`, and description. Document it with the spec template (`shared/templates/feature-flag-spec.md`).
2. **Gate** — wrap the new behavior in `flags.isEnabled(key, ctx)`. New user-facing behavior ships gated by default (default off for `both`/`infra` until rollout).
3. **Roll out** — flip the infra gate / per-app opt-in per the rollout plan. Sal notes flag state at `ship`.
4. **Clean up** — once a flag is fully rolled out and stable, remove the flag and the dead branch. A flag that outlives its rollout is tech debt with a switch on it. Sal surfaces stale flags at `ship`.

## Anti-patterns

- ❌ Inline flag checks that bypass the package (`project.enableX !== false`).
- ❌ A flag with no `owner` or no cleanup criteria — it will live forever.
- ❌ Using an app-level flag as a kill-switch. Ops can't reach a per-tenant column in an incident. Kill-switches are infra-tier.
- ❌ Branching on a flag deep in the stack when the decision belongs at a boundary (route, page, feature entry).

## References

- Package: `packages/feature-flags/` (`@sector32/feature-flags`)
- Reference impl: `apps/app/src/lib/flags.ts`, `apps/app/client/src/hooks/use-flags.ts`
- Spec template: `shared/templates/feature-flag-spec.md`
- Project ADR (this repo): `docs/engineering/adrs/adr-001-feature-flags.md`
