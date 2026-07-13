---
name: feature-flags
description: "Crew convention for feature flags: the two-tier model (app-level + infra-level), precedence, and the flag lifecycle. Provider-agnostic — use whatever your project already has. Read before gating any new feature."
---

# Feature Flags — Crew Convention

> *"A flag is a promise you can keep or break without a redeploy. Build the switch before you build the room behind it."* — Kael

This is how Sal's crew ships features behind flags. It is a convention, not a library: gate through **whatever your project already uses** (env vars, a config table, a flags service like LaunchDarkly or PostHog, a per-tenant DB column). The principles below hold regardless of the mechanism.

## Why

Flags let you ship dark, roll out gradually, and kill a feature without a deploy. Two kinds of control matter, and a project should be able to support **either or both**:

- **App-level ("top-level") flags**: owned inside one app. The unit of control is something the app already models: a project, a workspace, a user. Stored in the app's own data (a DB column, a config row).
- **Infra-level flags**: an env/config-driven set that spans deployments. The unit of control is the *deployment / environment*. This is the rollout gate and the kill-switch ops reaches for when something is on fire.

## One flag helper, not scattered checks

Route every check through a single helper so precedence is consistent. Do **not** hand-roll flag checks (`project.enableX !== false` scattered through the code); a lone helper that reads your project's flag source keeps the rule in one place and makes cleanup a one-line change.

Keep a small registry per app: each flag declares a `key`, a `tier` (`app` / `infra` / `both`), a `default`, and an `owner`. Whatever backs it (env, DB, a provider SDK) sits behind that helper, so swapping the backing store is invisible to call sites.

## Choosing a Tier

Pick by asking *who decides whether this is on*:

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
- The other tier can only **veto** (force OFF / kill-switch); it can never force a flag ON.

Consequences worth internalizing:
- An **infra kill-switch always wins.** Turning a flag off at the infra tier hides the feature everywhere, whatever a project set.
- Infra saying **ON means "allowed," not "forced."** A project that opted out stays out.
- A **`both` flag with `default: false` stays off until infra opens the gate**, then each app unit opts in. That's the safe rollout shape for unfinished work.

## Env Conventions

When the backing store is env vars, a predictable naming scheme keeps ops sane:

- Server: `FLAG_<SCREAMING_SNAKE_KEY>` (e.g. `FLAG_ENABLE_WIKI=off`).
- Browser (a bundler like Vite): mirror it with the bundler's public prefix (e.g. `VITE_FLAG_<KEY>`) when a user-facing feature needs the client to reflect an infra kill-switch.
- Truthy: `on|true|1|enabled|yes`. Falsy: `off|false|0|disabled|no`. Anything else = abstain (fall back to `default`).

## Flag Lifecycle

Every flag is a temporary object with an owner and an exit plan. Kael owns implementation; Sal tracks rollout and cleanup through the pipeline.

1. **Add**: declare it in the app's registry with a `tier`, `default`, `owner`, and description. Document it with the spec template (`shared/templates/feature-flag-spec.md`).
2. **Gate**: wrap the new behavior behind the flag helper. New user-facing behavior ships gated by default (default off for `both`/`infra` until rollout).
3. **Roll out**: flip the infra gate / per-app opt-in per the rollout plan. Sal notes flag state at `ship`.
4. **Clean up**: once a flag is fully rolled out and stable, remove the flag and the dead branch. A flag that outlives its rollout is tech debt with a switch on it. Sal surfaces stale flags at `ship`.

## Anti-patterns

- ❌ Inline flag checks that bypass the helper (`project.enableX !== false`).
- ❌ A flag with no `owner` or no cleanup criteria; it will live forever.
- ❌ Using an app-level flag as a kill-switch. Ops can't reach a per-tenant column in an incident. Kill-switches are infra-tier.
- ❌ Branching on a flag deep in the stack when the decision belongs at a boundary (route, page, feature entry).

## References

- Spec template: `shared/templates/feature-flag-spec.md`
- Record the choice of flag provider in an ADR when it's more than env/config.
