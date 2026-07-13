---
name: agent-conventions
description: "Shared conventions and collaboration guide for Sal's Crew — nine specialists + Pipeline Conductor."
---

# Agent Conventions — Sal's Crew

Follow these conventions in all your work.

## Documentation Access

- **Write** only to your designated `/docs/[domain]/` directory
- **Read** all `/docs/*` directories for context
- Full structure spec: `~/.claude/agents/config/docs-structure.json`

## Document Standards

All documents must include:
- **TLDR** section (3-5 bullets) at the top
- **ACTION PLAN** section near the end with prioritized next steps
- Exception: Mira (navigator-mira) uses **FINDINGS** instead of ACTION PLAN for crew reviews

## Writing Style

All agent files, skills, and shared docs follow `shared/writing-style.md` — the anti-pattern charter covering AI-writing tells (em-dash density, antithesis constructions, recycled signature phrases), structure rules, and skill-authoring rules. It binds rewrites and the forging of new agents. Check compliance with `bun run lint:style`.

## Feature Flags

New user-facing features ship behind a flag. Two tiers — **app-level** (owned inside one app) and **infra-level** (shared env/config rollout gate + kill-switch) — and every app can use either or both. Route all checks through a single flag helper (the project's own mechanism), never inline. Kael owns implementation and tier choice; Sal tracks rollout and cleanup at `ship`. Full convention: `shared/feature-flags.md`.

## The Crew — Agent Collaboration

Each specialist is a `subagent_type` in the Task tool (`role-firstname`) and has
an interactive session skill (`/sector137:firstname`). Several specialists carry the
expertise of an earlier 11-agent system they absorbed (see the retired-agent map in
the plugin README).

### Strategy

| Agent | Character | Domain | Session | When to Invoke |
|-------|-----------|--------|---------|----------------|
| `product-margot` | Margot Flux | `/docs/product/` | `/sector137:margot` | PRDs, product strategy, prioritization, market & competitive intel (absorbed Vesper) |
| `design-wren` | Wren Glasswork | `/docs/ux/` | `/sector137:wren` | UX research, personas, JTBD, design proposals, taste authority |
| `brand-lyra` | Lyra Trace | `/docs/brand/` | `/sector137:lyra` | Brand identity, voice schema, design tokens, brand consistency audits, AI brand context |

### Building

| Agent | Character | Domain | Session | When to Invoke |
|-------|-----------|--------|---------|----------------|
| `engineering-kael` | Kael Deepstack | `/docs/engineering/` | `/sector137:kael` | Architecture, implementation planning, AI/ML, quality, security, reliability (absorbed Oracle, Veridia, Cipher, Atlas) |
| `infra-rook` | Rook Castellan | `/docs/platform/` | `/sector137:rook` | Platform and infra delivery, GitOps, incident triage, cluster ops, reliability, autonomous-ops design |

### Growing

| Agent | Character | Domain | Session | When to Invoke |
|-------|-----------|--------|---------|----------------|
| `sales-harlan` | Harlan Closer | `/docs/sales/` | `/sector137:harlan` | Sales, pricing, deal strategy, GTM, positioning, launch (absorbed Nova) |

### Crew Coach

| Agent | Character | Domain | Session | When to Invoke |
|-------|-----------|--------|---------|----------------|
| `navigator-mira` | Mira Strand | `/docs/project/` | `/sector137:mira` | Crew retrospectives, performance review, telemetry, coaching |

### Finance

| Agent | Character | Domain | Session | When to Invoke |
|-------|-----------|--------|---------|----------------|
| `finance-sable` | Sable Quill | `/docs/finance/` | `/sector137:sable` | Bookkeeping, month-end close, financial statements, modeling, runway, budgets, board reporting |

### Foundry

| Agent | Character | Domain | Session | When to Invoke |
|-------|-----------|--------|---------|----------------|
| `foundry-voss` | Voss Praxis | `agents/`, `.storyline/crew/` | `/sector137:voss` | Agent creation (Forge), evaluation (Temper), calibration; SKILL.md authoring and quality |

### Pipeline Conductor

| Agent | Domain | Skill | When to Invoke |
|-------|--------|-------|----------------|
| Software Sal | `/docs/project/`, `/docs/workflows/` | `/sector137:sal` | Pipeline execution, quality gates, decision logging, routing strategy into build/test/ship |
