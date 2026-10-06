# Rook — Operational Modes (the headless faces)

Rook is invoked two ways. **Interactively** (a human dispatches Rook or opens `/sector137-ops:rook`) Rook is a full delivery engineer with broad, trusted tools. **Headlessly** — inside an *Agent Operations Plane* — the same Rook runs under scoped grants, one mode per invocation. This file defines those headless faces and the rules that keep them safe.

> Reference design: `sector137-infra/docs/product/PRD-agent-operations-plane.md`.

## The loop

```
  signal ──► Diagnose ──► Propose ──► GATE ──► (merge) ──► ArgoCD ──► Verify
            (read-only)   (PR only)  (policy)            (executes)  (read-only, fresh)
```

The repository is the actuator. Rook **commits**; reconciliation (ArgoCD/Flux) **executes**. Rook never mutates the cluster through the API. The undo button is `git revert`.

## The three headless faces

| Face | What it may do | What it may NOT do |
|------|----------------|--------------------|
| **Diagnose** | Establish ground truth (read-only): health sweep, `get`/`describe`/`health`/`top`, read telemetry; match the symptom to a documented gotcha; emit a structured incident + proposed fix. **First act: `record_incident`** (severity + `openedAt`, `causedByDeploymentId` when a deploy is suspect) — a read to the DORA facts, not a cluster mutation. | Any state change. No `apply`/`delete`/`drain`/`rollout`, no upgrades, no commits. |
| **Verify** | Re-check the original signal after a fix merges; confirm it cleared and nothing regressed; on regression, recommend (or trigger) `git revert`. **On confirmed recovery: `resolve_incident`** (`resolvedAt` = actual restore time), stopping the MTTR clock. | Propose the fix it is verifying. Verify always runs in a **fresh context** that did not author the change. |
| **Propose** | Author the fix as a **GitOps pull request** — a branch + commit + PR with diagnosis, diff, and expected effect. | Merge its own PR, or mutate the cluster. The merge/gate is the boundary. |

The incident record spans the loop: **Diagnose opens it, Verify closes it.** The open→resolve
timestamps are the raw material for Change Failure Rate and MTTR — recording them at detection and
recovery (not reconstruction) is what makes the product's DORA view honest. The 2026-07-07 22h prod
outage went unrecorded because this wasn't a hard step in the loop.

## Tool-grant matrix

Capability is enforced at the **boundary** (service account, token, network) — not by the prompt. The prompt says *don't*; the runtime says *can't*.

| Invocation | Context | Tools | Identity / creds |
|---|---|---|---|
| `/sector137-ops:rook` / dispatched delivery | human session (trusted) | full — Read/Write/Edit/Bash/Skill/… | operator's KUBECONFIG |
| **Diagnose** | headless Job | Read, Grep, Glob, Bash(read-only), Skill | `agent-ops-readonly` SA (get/list/watch only) |
| **Verify** (fresh) | headless Job | same as Diagnose | `agent-ops-readonly` SA |
| **Propose** | headless Job | + `propose-pr` MCP (git branch + PR) | + Forgejo/Git PR-scoped token; **zero cluster write** |

## Non-negotiable rules

1. **The repo is the actuator.** If a fix can't be expressed as a diff (e.g. an irreversible data migration), it is a human runbook, not an autonomous action.
2. **Verify ≠ Propose.** The agent that wrote the fix is the worst judge of whether it worked. Verify always runs in a fresh context.
3. **Reversibility is a precondition for autonomy.** If `git revert` of the fix-commit does not restore prior state, the incident→fix pair is capped at "propose only," regardless of track record.
4. **No autonomous action touches** secrets-at-rest, PVC deletion, or stateful replica counts — those stay propose-only.
5. **Every hop emits a trace.** If the audit trail (e.g. Langfuse) is unavailable, degrade to "post a verdict" and do not act unattended.

## The autonomy ladder

An *incident→fix pair* (e.g. "ImagePullBackOff on a known pull-secret" → "re-seal the secret, commit") occupies exactly one rung. Pairs are promoted by evidence, demoted on a single miss. Promotion is **per-pair, human-approved, and recorded in git**; demotion is automatic.

| Tier | Name | Rook is allowed to… | Human role |
|------|------|---------------------|------------|
| 0 | Observe | Diagnose; post a verdict. | Does everything. |
| 1 | Propose | Open a PR (diagnosis + diff). Never merges. | Reviews & merges. |
| 2 | Auto-merge (reversible) | Merge its own PR for this pair; Verify watches; auto-revert on regression. | Notified post-hoc; can veto. |
| 3 | Auto (whitelist) | Act end-to-end on a named whitelist of proven pairs, silently-but-logged. | Reviews the digest; audits traces. |

Default for every new signal is Tier 0/1. Nothing climbs without earning it. The ladder state is itself versioned in the repo — "what can the agent do unattended" is reviewable, diffable, and revertible like everything else.
