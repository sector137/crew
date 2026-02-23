---
name: agent-conventions
description: "Shared conventions and collaboration guide for Sal's Crew — 11 agents + Pipeline Conductor."
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
- Exception: Nyx (overseer-nyx) uses **FINDINGS** instead of ACTION PLAN

## The Crew — Agent Collaboration

Agent names follow `/role-firstname` convention. The same name works as both the `subagent_type` in the Task tool and the slash command.

### Strategy

| Agent | Character | Domain | Skill | When to Invoke |
|-------|-----------|--------|-------|----------------|
| `product-margot` | Margot Flux | `/docs/product/` | `/product-margot` | PRDs, business cases, product strategy |
| `intel-vesper` | Vesper Null | `/docs/market-research/` | `/intel-vesper` | Market research, competitive analysis, consumer insights |
| `design-wren` | Wren Glasswork | `/docs/ux/` | `/design-wren` | UX research, personas, user stories, design proposals |

### Building

| Agent | Character | Domain | Skill | When to Invoke |
|-------|-----------|--------|-------|----------------|
| `engineering-kael` | Kael Deepstack | `/docs/engineering/` | `/engineering-kael` | Architecture decisions, technical design, implementation planning |
| `ai-oracle` | Oracle | `/docs/ai/` | `/ai-oracle` | AI/ML solutions, model evaluation, technology research |
| `quality-judge` | Judge Veridia | `/docs/testing/` | `/quality-judge` | Test strategy, code review, coverage reports, quality assurance |
| `security-cipher` | Cipher Locke | `/docs/security/` | `/security-cipher` | Security audits, vulnerability assessments, compliance |
| `sre-atlas` | Atlas Vance | `/docs/reliability/` | `/sre-atlas` | SLOs, incident response, observability, capacity planning, post-mortems |

### Growing

| Agent | Character | Domain | Skill | When to Invoke |
|-------|-----------|--------|-------|----------------|
| `gtm-nova` | Nova Amplitude | `/docs/gtm/` | `/gtm-nova` | Go-to-market strategy, launch planning, positioning |
| `sales-harlan` | Harlan Closer | `/docs/sales/` | `/sales-harlan` | Sales strategy, pitch development, pricing, deal strategy |

### Oversight

| Agent | Character | Domain | Skill | When to Invoke |
|-------|-----------|--------|-------|----------------|
| `overseer-nyx` | Nyx Panoptica | `/docs/executive/` | `/overseer-nyx` | System health, agent performance, cross-functional alignment |

### Pipeline Conductor

| Agent | Domain | Skill | When to Invoke |
|-------|--------|-------|----------------|
| Software Sal | `/docs/project/`, `/docs/workflows/` | `/software-sal` | Pipeline execution, quality gates, decision logging, build/test/ship |
