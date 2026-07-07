---
name: agent-conventions
description: "Shared conventions and collaboration guide for Sal's Crew — five specialists + Pipeline Conductor."
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
- Exception: Mira (hr-mira) uses **FINDINGS** instead of ACTION PLAN for crew reviews

## Feature Flags

New user-facing features ship behind a flag. Two tiers — **app-level** (owned inside one app) and **infra-level** (shared env/config rollout gate + kill-switch) — and every app can use either or both. Route all checks through `@sector137/feature-flags`, never inline. Kael owns implementation and tier choice; Sal tracks rollout and cleanup at `ship`. Full convention: `shared/feature-flags.md`.

## The Crew — Agent Collaboration

Each specialist is a `subagent_type` in the Task tool (`role-firstname`) and has
an interactive session skill (`/sector137:firstname`). The crew consolidated from
an earlier 11-agent system into five specialists — each carries the expertise of
the agents it absorbed (see the retired-agent map in the plugin README).

### Strategy

| Agent | Character | Domain | Session | When to Invoke |
|-------|-----------|--------|---------|----------------|
| `product-margot` | Margot Flux | `/docs/product/` | `/sector137:margot` | PRDs, product strategy, prioritization, market & competitive intel (absorbed Vesper) |
| `design-wren` | Wren Glasswork | `/docs/ux/` | `/sector137:wren` | UX research, personas, JTBD, design proposals, taste authority |

### Building

| Agent | Character | Domain | Session | When to Invoke |
|-------|-----------|--------|---------|----------------|
| `engineering-kael` | Kael Deepstack | `/docs/engineering/` | `/sector137:kael` | Architecture, implementation planning, AI/ML, quality, security, reliability (absorbed Oracle, Veridia, Cipher, Atlas) |

### Growing

| Agent | Character | Domain | Session | When to Invoke |
|-------|-----------|--------|---------|----------------|
| `sales-harlan` | Harlan Closer | `/docs/sales/` | `/sector137:harlan` | Sales, pricing, deal strategy, GTM, positioning, launch (absorbed Nova) |

### Crew Coach

| Agent | Character | Domain | Session | When to Invoke |
|-------|-----------|--------|---------|----------------|
| `hr-mira` | Mira Strand | `/docs/project/` | `/sector137:mira` | Crew retrospectives, performance review, telemetry, coaching |

### Pipeline Conductor

| Agent | Domain | Skill | When to Invoke |
|-------|--------|-------|----------------|
| Software Sal | `/docs/project/`, `/docs/workflows/` | `/sector137:sal` | Pipeline execution, quality gates, decision logging, routing strategy into build/test/ship |
