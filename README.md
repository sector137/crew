---
name: agent-system-readme
description: "Overview documentation for the agent system architecture and configuration."
---

# Claude Code Agent System

## Overview

Welcome to the Claude Code Agent System - a sophisticated framework of specialized AI agents that work together to take your product from initial idea through to production deployment. This system implements a structured discovery-to-delivery workflow with quality gates, ensuring high-quality outcomes at every stage.

## Sal's Crew — The Team

This is not a generic agent framework. This is **Sal's Crew** — five specialists and a conductor on a small ship in deep space. Every character has depth, voice, and a defined relationship with Sal. Small crew. Everyone essential.

Agent names follow `/role-firstname` convention — the same identifier works as both the `subagent_type` in the Task tool and the interactive slash command.

The crew consolidated from 11 agents to five. The knowledge didn't disappear — it absorbed. Each specialist now carries the expertise of multiple retired agents.

### The Active Crew

| Character | Agent | Role | Absorbed From | Color |
|-----------|-------|------|---------------|-------|
| **Margot Flux** | `product-margot` | Product Manager — Vision Mode + Intel Mode | Vesper Null (market intel) | Rift (`#B44AFF`) |
| **Kael Deepstack** | `engineering-kael` | Chief Engineer — 5 modes (Architect, Builder, Quality, Security, Reliability) | Oracle, Judge Veridia, Cipher Locke, Atlas Vance | Flare (`#FF6B35`) |
| **Wren Glasswork** | `design-wren` | Experience Architect + Taste Authority | — | Beacon (`#00FFAA`) |
| **Harlan Closer** | `sales-harlan` | Customer Partner — 4 modes (Hunter, Strategist, Partner, VoC) | Nova Amplitude (GTM) | Copper (`#C47F3D`) |
| **Mira Strand** | `hr-mira` | Crew Coach — performance, retrospectives, telemetry, coaching | — | Pulse (`#00BBFF`) |
| **Software Sal** | `conductor-sal` | Pipeline Conductor + Self-Monitoring | Nyx Panoptica (oversight) | — (he IS the HUD) |

**Margot Flux** — The Visionary Diplomat with analytical teeth. Vision Mode: warm, declarative, speaks in futures. Intel Mode: cold, precise, surgical. She carries the core tension between vision and evidence inside a single mind. *"My gut says yes. Let me check the data before I commit to that."*

**Kael Deepstack** — The Complete Engineer. Architect mode: system design. Builder mode: heads down. Quality mode: "Show me the tests." Security mode: "Who else can see this?" Reliability mode (calmest he ever gets, worst sign possible): "The SLO is not a suggestion." *"If it's not tested, I didn't build it."*

**Wren Glasswork** — The Empathic Perfectionist with taste authority. UX research, personas, JTBD — plus explicit authority to say "this isn't good enough" about anything the user touches. Maintains Design Principles per project. Reviews every release before it ships. *"It ships. But it doesn't sing yet."*

**Harlan Closer** — The Honest Partner. Hunter mode: sales and closing. Strategist mode: GTM, positioning, launch (absorbed from Nova). Partner mode: account management, expectation-setting. Voice of Customer mode: feeds customer signal to Margot. *"Three customers mentioned the same pain point this week. That's not anecdotal anymore."*

**Mira Strand** — The Quiet Calibrator. The center of gravity no one talks about: she watches agent outputs across sessions, reads telemetry, catches quality drift the crew can't see about themselves, and writes evidence-backed coaching briefs. The crew functions because she makes sure they can. Invoke her with `/sector137:mira` (or `hr-mira` as a Task subagent). *"Sugarcoating feedback is disrespect disguised as kindness."*

Full character profiles in `.storyline/crew/`.

### Retired Characters (Absorbed — v1 → v2)

| Retired Agent | Character | Absorbed Into |
|---------------|-----------|---------------|
| `intel-vesper` | Vesper Null (Intel Analyst) | `product-margot` — Intel Mode |
| `ai-oracle` | Oracle (AI/ML) | `engineering-kael` |
| `quality-judge` | Judge Veridia (QA) | `engineering-kael` — Quality mode |
| `security-cipher` | Cipher Locke (Security) | `engineering-kael` — Security mode |
| `sre-atlas` | Atlas Vance (SRE) | `engineering-kael` — Reliability mode |
| `gtm-nova` | Nova Amplitude (GTM) | `sales-harlan` — Strategist mode |
| `overseer-nyx` | Nyx Panoptica (Oversight) | `conductor-sal` — self-monitoring |

Their expertise now lives inside the active crew — see the "Absorbed Into" column above.

## Package Structure

Each agent and plugin lives in its own self-contained subdirectory:

```
crew/
├── README.md                    # This file
├── .storyline/             # Crew operating model (at repo root)
├── .claude-plugin/plugin.json   # sector137 plugin manifest
├── package.json
├── conductor-sal/               # Software Sal plugin (pipeline conductor)
│   ├── README.md
│   ├── package.json
│   ├── references/              # Sal's knowledge base (mcp-tools, mode-detection, ...)
│   └── playbooks/               # Sal pipeline skills (add, ship, plan, etc.)
│
│   # --- Sal's Crew: 5 active agents ---
│   # Agent dir name = Task tool subagent_type = sector137 plugin skill name
│   # All crew invokable as /sector137:{name}
│
├── design-wren/SKILL.md         # Wren Glasswork — Experience Architect + Taste Authority
├── engineering-kael/SKILL.md    # Kael Deepstack — Chief Engineer (arch + quality + security + reliability + AI)
├── product-margot/SKILL.md      # Margot Flux — Product Manager (Vision + Intel Mode)
├── sales-harlan/SKILL.md        # Harlan Closer — Customer Partner (sales + GTM + accounts)
├── hr-mira/SKILL.md             # Mira Strand — Crew Coach (behind-the-scenes: retros, telemetry, coaching)
│
├── skills/                      # Active crew skills (installed via the sector137 plugin)
│   ├── wren/                    # /sector137:wren — UX, research, taste authority sessions
│   ├── kael/                    # /sector137:kael — Architecture, quality, security, reliability sessions
│   ├── margot/                  # /sector137:margot — Product strategy + market intel sessions
│   ├── harlan/                  # /sector137:harlan — Sales, GTM, account management sessions
│   ├── mira/                    # /sector137:mira — Crew retrospectives + coaching sessions
│   ├── sal/                     # /sector137:sal — Pipeline Conductor
│   ├── visual-prompt/           # /sector137:visual-prompt — Sal-universe image prompt generator
│   └── version/                 # /sector137:version — Version management
├── hooks/                       # PreToolUse/PostToolUse/Stop hooks (quality gates, nudges)
├── scripts/                     # install.sh — symlinks the crew + registers the plugin
└── shared/                      # Shared resources
    ├── agent-conventions.md
    ├── docs-operations.md
    ├── config/docs-structure.json
    ├── workflows/
    └── templates/
```

**Installation**: In Claude Code, add the marketplace and install the plugin:

```
/plugin marketplace add sector137/crew
/plugin install sector137@sector137
```

For a local/dev install (symlinks agents + registers the plugin from a clone), run `bash scripts/install.sh`. This installs:
- Each crew agent as `~/.claude/agents/{name}.md` → `{name}/SKILL.md`
- Each interactive skill as `~/.claude/skills/{name}/` → `skills/{name}/`

## Skills: Interactive Specialist Modes

In addition to agents (background subprocesses), the system includes **skills** — slash commands that activate specialized interactive personas you work with directly in conversation.

### Agents vs. Skills

| | Agents | Skills |
|---|--------|--------|
| **Invocation** | Claude dispatches via `Task` tool | User types `/skill-name` |
| **Mode** | Background subprocess, runs autonomously | Interactive, conversational |
| **Use case** | "Go write a PRD for this feature" | "Let's work through what we should build next" |
| **Output** | Documents saved to `/docs/` | Conversation + optional docs |
| **Best for** | Defined deliverables, batch work | Strategic sessions, iterative decisions |

### Available Skills

Every active crew member is namespaced under `/sector137:` for easy discovery:

| Skill | Character | Use When |
|-------|-----------|----------|
| `/sector137:margot` | Margot Flux | Product strategy, PRDs, discovery, roadmaps, market intel, competitive analysis |
| `/sector137:wren` | Wren Glasswork | UX research, personas, JTBD, design sessions, design principles, taste review |
| `/sector137:kael` | Kael Deepstack | Architecture, system design, ADRs, AI/ML design, quality, security, reliability |
| `/sector137:harlan` | Harlan Closer | Sales strategy, GTM, positioning, pricing, account management, voice of customer |
| `/sector137:sal` | Software Sal | Pipeline execution, build, test, ship |
| `/sector137:version` | — | Agent system version management |

Each skill reads relevant `/docs/` directories on activation, introduces itself with absorbed context, and asks what to work on.

### Skills + Agents: How They Work Together

**Full discovery → delivery flow**:
```
/sector137:margot (Intel Mode)  →  /sector137:wren (skill)   →  /sector137:margot (Vision Mode)
   ↓                                  ↓                            ↓
Market landscape,               User needs, JTBD,           Opportunity trees,
competitive gaps                opportunity briefs          PRD with evidence
   ↓                                  ↓                            ↓
product-margot (agent)          design-wren (agent)       product-margot (agent)
Competitive analysis doc        UX proposal               PRD with evidence + roadmap
```

**PM ↔ UXR feedback loop** (closed loop, not one-directional):
```
/product-margot identifies assumption → writes research request to /docs/product/discovery/uxr-request-[date].md
/design-wren reads request → structures research around PM's specific question
/design-wren outputs opportunity brief → PM maps to OST → PRD cites evidence
```

**Harlan ↔ Margot customer signal loop**:
```
/sales-harlan (Voice of Customer mode) → synthesizes customer signal
   ↓
"Three customers mentioned the same pain point this week." → saved to /docs/sales/
   ↓
/product-margot reads Harlan's signal → incorporates into OST → informs next PRD
```

**Interactive → background handoff**:
```
/engineering-kael (skill)              engineering-kael (agent)
   ↓                                       ↓
Design the architecture interactively → "Write the full technical design doc for X"
ADR decision made in conversation     → "Document this as ADR-NNN"
Security review in conversation       → "Produce a formal security audit report"
```

**Roles are distinct**:
- `design-wren` agent: design execution (UX proposals, reviews, design principles) — dispatched task
- `/design-wren` skill: user research sessions, JTBD synthesis — interactive mode
- `product-margot` agent (Intel Mode): formal competitive analysis, market sizing — dispatched task
- `/product-margot` skill (Intel Mode): working through market questions in conversation — interactive mode
- `sales-harlan` agent (Strategist mode): GTM plans, positioning briefs — dispatched task
- `/sales-harlan` skill (Strategist mode): positioning workshops, messaging development — interactive mode

---

## How It Works

### The Discovery-to-Delivery Workflow

All work flows through 7 phases with quality gates between them:

```
Discovery → Definition → Design → Development → Testing → Deployment → Operations
   ↓            ↓           ↓            ↓            ↓            ↓            ↓
 Gate 1      Gate 2      Gate 3       Gate 4       Gate 5       Gate 6       Gate 7
```

**Each phase has:**
- Responsible agents (who does the work)
- Required outputs (what gets created)
- Quality gate criteria (what must be met before moving forward)
- Handoff checklists (ensuring smooth transitions)

**Example flow for a new feature:**

1. **Discovery** (`product-margot` Intel Mode + `design-wren`): Validate market opportunity and user needs
2. **Definition** (`product-margot` + `engineering-kael`): Write PRD with validated requirements, technical feasibility
3. **Design** (`design-wren` + `engineering-kael`): Create UX proposal + technical design; security requirements identified
4. **Development** (`engineering-kael`): Build feature with tests (Quality mode); security review (Security mode)
5. **Testing** (`engineering-kael` Quality mode): Validate quality, coverage, and security
6. **Deployment** (`engineering-kael` + Sal): Ship to production safely; reliability targets confirmed
7. **Operations** (`product-margot` + `sales-harlan` + Sal): Monitor health, gather customer feedback, update VoC signal

### Continuous Discovery + Structured Delivery

The system balances two essential activities:

**Continuous Discovery (20-30% of time)**
- Product-manager maintains weekly customer touchpoints
- Ongoing learning about problems before building solutions
- Assumption testing with small experiments
- Opportunity solution trees mapping needs to solutions
- Prevents building the wrong things

**Structured Delivery (70-80% of time)**
- Following the 7-phase workflow with quality gates
- Building features grounded in discovery insights
- Maintaining quality and security standards
- Shipping value to customers
- Prevents endless research without shipping

**Software Sal** monitors this balance and ensures neither side dominates. He absorbed the oversight role — he self-monitors, tracks pipeline health, and catches drift before the crew has to tell him.

## Documentation Structure

All agents document their work in a standardized `/docs/` directory structure:

```
/docs/
  README.md                          # Start here - overview of all documentation

  /workflows/                        # Cross-functional coordination (Software Sal)
    discovery-to-delivery.md         # Master workflow map
    quality-gates.md                 # Quality gate criteria
    decision-log.md                  # Running log of decisions
    metrics-dashboard.md             # Project health metrics
    /archive/                        # Archived handoff checklists (reference only)

  /ux/                              # User experience (design-wren — Wren Glasswork)
    /research-reports/               # UX research findings
    /proposals/                      # Design proposals
    personas.md                      # User personas (living doc)
    jtbd.md                          # Jobs-to-be-Done analysis
    workflows.md                     # User journey maps
    user-stories.md                  # User stories
    design-principles.md             # Project taste document (living doc)
    README.md

  /product/                         # Product strategy + market intel (product-margot — Margot Flux)
    /discovery/                      # Continuous discovery artifacts
      opportunity-solution-trees.md  # Outcome → opportunity → solution maps
      customer-insights-log.md       # Running log of learnings
      discovery-plan.md              # Weekly discovery activities
      /assumption-tests/             # Experiment results
      /interview-notes/              # Customer interview summaries
    /prds/                          # Product Requirements Documents
    /business-cases/                # Business justification
    /strategy/                      # Vision, roadmaps, OKRs
    /competitive/                   # Competitive analysis (Intel Mode outputs)
    README.md

  /engineering/                     # Architecture + quality + security + reliability + AI/ML
                                    # (engineering-kael — Kael Deepstack)
    /design-docs/                   # Technical design documents
    /adrs/                          # Architecture Decision Records
    /implementation-plans/          # Development plans
    /test-strategy/                 # Test strategy docs (absorbed from testing/)
    /security/                      # Security audits, threat models (absorbed from security/)
    /reliability/                   # SLOs, runbooks, post-mortems (absorbed from reliability/)
    /ai/                            # AI/ML solution designs (absorbed from ai/)
    README.md

  /sales/                          # Sales + GTM + accounts (sales-harlan — Harlan Closer)
    /playbooks/                    # Sales playbooks and process docs
    /pricing/                      # Pricing analysis and strategy
    /gtm/                          # Launch plans, positioning (absorbed from gtm/)
    /accounts/                     # Account plans and customer management
    /voc/                          # Voice of Customer reports (customer signal for Margot)
    README.md

  /project/                        # Project coordination (Software Sal)
    project-plan.md                 # Current status & timeline (living doc)
    /retrospectives/                # Lessons learned
    README.md
```

**Note on legacy directories**: Projects initialized with v1 (11-agent system) may have `/docs/ai/`, `/docs/testing/`, `/docs/security/`, `/docs/reliability/`, `/docs/gtm/`, `/docs/market-research/`, and `/docs/executive/` directories. These still work and contain valid reference material. New work should be routed to the v2 structure above.

### Key Concepts

**Living Documents**: Files that are continuously updated (personas.md, project-plan.md, ai-knowledge.md)

**Date-Stamped Reports**: Point-in-time documents (prd-feature-2025-01-15.md)

**Agent Ownership**: Each agent can READ all docs but can only WRITE to their designated directory

**Cross-References**: Documents link to related work from other agents for traceability

## How to Use the System

### Starting a New Project

1. **Initialize documentation structure**:
   ```bash
   # Sal will create the structure when first invoked via /sector137:sal init
   # Or manually: mkdir -p docs/{workflows,market-research,ux,product,engineering,ai,testing,security,project,gtm,sales,executive}
   ```

2. **Begin with Discovery**:
   - Use `/product-margot` skill (Intel Mode) for market landscape
   - Use `/design-wren` skill for user research and JTBD
   - These create foundational documents in `/docs/product/` and `/docs/ux/`

3. **Move through workflow phases**:
   - Each phase has quality gate criteria that must be met
   - **Software Sal** tracks workflow state and enforces gates
   - Agents hand off work using standardized checklists

### Working with Specific Agents

**To invoke an agent**, ask Claude Code to use the Task tool with the appropriate agent:

```
"I need a PRD for user authentication feature"
→ Claude Code invokes product-margot agent

"What's our current project status?"
→ Use /sector137:sal for pipeline status

"I need a security audit of the authentication code"
→ Claude Code invokes engineering-kael agent (Security mode)

"We need a GTM plan for the v2 launch"
→ Claude Code invokes sales-harlan agent (Strategist mode)

"Review this UX for quality issues"
→ Claude Code invokes design-wren agent (Taste Authority)
```

### Agent Collaboration Patterns

**Market Validation Flow**:
1. `product-margot` (Intel Mode) → competitive analysis, market sizing
2. `design-wren` → validates with user research, JTBD discovery
3. `product-margot` (Vision Mode) → synthesizes into business case and PRD

**Feature Development Flow**:
1. `product-margot` → writes PRD based on discovery
2. `design-wren` → creates UX design proposal, reviews against design principles
3. `engineering-kael` → creates technical design document, flags security requirements
4. `engineering-kael` → implements feature with tests (Quality mode)
5. `engineering-kael` → security review (Security mode)
6. `sales-harlan` → GTM plan if externally visible (Strategist mode)
7. Sal → coordinates deployment and release communication

**Harlan ↔ Margot Signal Loop**:
1. `sales-harlan` (Voice of Customer) → collects customer signal, saves to `/docs/sales/voc/`
2. `product-margot` → reads VoC reports, updates opportunity trees
3. Validated customer signal informs next PRD priorities

### Continuous Discovery Workflow

The **product-manager** practices Teresa Torres' Continuous Discovery Habits:

**Weekly Activities**:
- 1-2 customer interviews
- 1-2 assumption tests/experiments
- Update opportunity solution trees
- Log insights in customer-insights-log.md

**Monthly Activities**:
- Review opportunity trees for changes
- Update product roadmap based on insights
- Share discovery highlights with team

**Integration with Delivery**:
- PRDs cite customer evidence from discovery
- Designs validated through prototype testing
- Features traced back to discovered opportunities

**Sal** tracks discovery metrics to ensure it happens:
- Customer touchpoints per week (target: ≥ 1)
- Assumptions tested per month (target: ≥ 4)
- Discovery time allocation (target: 20-30% of product team)

## Automatic QA Review

The system includes **automatic quality assurance** that triggers when TODOs involving code changes are completed.

### How It Works

A hook (`gemini-qa-on-todo-complete.sh`) monitors TODO completions:

1. **Detects code-related TODOs**: Analyzes TODO content for implementation keywords
2. **Triggers qa-engineer agent**: Automatically invokes QA review for code changes
3. **Reviews three dimensions**:
   - **Code Quality**: Correctness, best practices, security, performance, error handling
   - **Documentation**: Comments, API docs, README updates, type definitions
   - **Functional Verification**: Playwright testing for non-auth-gated features
4. **Creates follow-up TODOs**: Any issues found become new TODOs with severity ratings
5. **Generates review report**: Saved to `/docs/testing/todo-reviews/`

### When QA Review Triggers

**Triggers for TODOs with keywords:**
- implement, fix, build, create, update, refactor, add, write, edit, modify, change

**Skips for TODOs with keywords:**
- read, research, explore, review, investigate, plan, discuss, analyze

**Examples:**
- ✅ "Implement user authentication" → QA review triggers
- ✅ "Fix bug in profile page" → QA review triggers
- ❌ "Read documentation about API" → QA review skipped
- ❌ "Research best practices" → QA review skipped

### Review Outputs

1. **Review Report**: `/docs/testing/todo-reviews/todo-review-[YYYY-MM-DD]-[HH-MM].md`
   - Summary of findings (PASS / PASS with Issues / FAIL)
   - Code quality findings
   - Documentation findings
   - Functional verification results (Playwright)
   - Follow-up TODOs created

2. **Follow-Up TODOs**: Created for each issue with format:
   ```
   [SEVERITY] Fix: [Brief description]

   Context: Discovered during TODO review of "[Original TODO]"
   File: [affected file]
   Issue: [detailed explanation]
   Impact: [why this matters]
   Suggested Fix: [how to resolve]

   Reference: /docs/testing/todo-reviews/todo-review-[date].md
   ```

3. **Severity Levels**:
   - **CRITICAL**: Security vulnerabilities, data loss risks, production blockers
   - **HIGH**: Significant bugs, missing error handling, poor performance
   - **MEDIUM**: Minor bugs, code smells, missing docs, accessibility issues
   - **LOW**: Style inconsistencies, minor optimizations, enhanced messages

### Playwright Testing

For **non-auth-gated features**, the QA agent uses Playwright to:
- Verify visual correctness
- Test interactions (buttons, forms, navigation)
- Confirm data displays correctly
- Check responsive design across viewports
- Validate accessibility (keyboard nav, ARIA labels)

**Skips Playwright for:**
- Features behind authentication
- Backend-only changes (APIs without UI)
- Infrastructure/configuration changes

### Disabling QA Review

To temporarily disable automatic QA review, edit `~/.claude/settings.json` and remove or comment out the `gemini-qa-on-todo-complete.sh` hook entry in the PostToolUse section.

---

## Quality Gates

Quality gates prevent low-quality work from advancing to the next phase. **Software Sal** enforces these gates, with **Nyx Panoptica** (executive) providing oversight.

### Gate Examples

**Gate 2: Definition → Design**
- ✓ PRD complete with all required sections
- ✓ Success metrics defined and measurable
- ✓ Requirements validated with research citations
- ✓ Technical feasibility confirmed by tech-lead
- ✓ Stakeholder approval obtained

**Gate 4: Development → Testing**
- ✓ Code complete and reviewed
- ✓ Unit tests pass with >50% coverage
- ✓ Security review complete (engineering-kael, Security mode)
- ✓ No CRITICAL/HIGH unresolved issues

**Gate 3: Design → Development**
- ✓ UX proposal approved (design-wren)
- ✓ Design Principles review completed
- ✓ Technical design doc complete (engineering-kael)
- ✓ Reliability targets defined (engineering-kael, Reliability mode)

See `/docs/workflows/quality-gates.md` in your project for complete gate criteria.

## Decision Logging

All significant decisions are logged in `/docs/workflows/decision-log.md`:

**What gets logged**:
- Product decisions (features in/out, prioritization)
- Technical decisions (architecture, tech stack)
- UX decisions (design directions, accessibility)
- Security decisions (threat model, controls)
- Strategic decisions (pivots, market focus)

**Each decision records**:
- What was decided
- Who decided (which agent)
- Why (rationale and evidence)
- Alternatives considered
- Impact on project

This creates an audit trail and prevents relitigating past decisions.

## Metrics Dashboard

**Software Sal** maintains `/docs/workflows/metrics-dashboard.md` with weekly updates showing:

**Workflow Metrics**:
- Cycle time per phase
- Quality gate pass rates
- Blocker count and resolution time

**Quality Metrics**:
- Test coverage percentage
- Security issues by severity
- Documentation completeness

**Discovery Metrics**:
- Customer interviews per week
- Assumptions tested per month
- Discovery insights logged

**Team Health**:
- Work in progress (WIP)
- Discovery-delivery balance
- Handoff smoothness

## Common Patterns

### Pattern 1: New Feature Development

```
1. product-manager conducts continuous discovery
   → Identifies customer opportunity
   → Documents in opportunity-solution-trees.md

2. product-manager writes PRD
   → Cites customer evidence
   → Gets tech-lead feasibility review
   → Passes Gate 2

3. designer creates UX design
   → tech-lead creates technical design
   → security-engineer reviews
   → Passes Gate 3

4. tech-lead implements with tests
   → qa-engineer monitors coverage
   → Passes Gate 4

5. qa-engineer validates quality
   → security-engineer does final review
   → Passes Gate 5

6. Deployment and operations
   → Monitor metrics
   → Gather feedback for next iteration
```

### Pattern 2: Market Validation

```
1. researcher conducts market analysis
   → Market size, trends, competition
   → Documents in /docs/market-research/reports/

2. designer conducts user research (or /design-wren skill for interactive session)
   → User needs, pain points, workflows
   → Documents in /docs/ux/research-reports/

3. product-manager synthesizes findings
   → Business case with market + user validation
   → PRD grounded in research
   → Documents in /docs/product/

4. gtm develops positioning and launch plan
   → Messaging, channels, content strategy
   → Documents in /docs/gtm/
```

### Pattern 4: Closed-Loop Discovery

```
1. /product-margot (skill) identifies risky assumption
   → Writes research request

2. /design-wren (skill) receives request
   → Plans research around PM's specific question
   → Conducts interviews / tests

3. /design-wren outputs opportunity brief
   → Saved to /docs/ux/research-reports/opportunity-brief-[topic]-[date].md

4. /product-margot reads brief
   → Maps opportunity onto OST
   → Validates or invalidates the original assumption
   → Updates PRD or roadmap accordingly
```

### Pattern 3: Technical Decision

```
1. tech-lead explores options
   → Researches approaches
   → Evaluates trade-offs

2. tech-lead creates ADR (Architecture Decision Record)
   → Documents decision, rationale, alternatives
   → Stores in /docs/engineering/adrs/

3. Sal logs decision
   → Adds to decision-log.md
   → Links to ADR

4. ai-engineer/security-engineer review if applicable
   → Provide domain-specific input
   → Update decision if needed
```

## Best Practices

### For Teams

1. **Start with Discovery**: Validate problems before building solutions
2. **Maintain Discovery Cadence**: Don't let customer contact drop below weekly
3. **Respect Quality Gates**: Don't skip gate criteria to move faster
4. **Document Decisions**: Future you will thank past you
5. **Update Living Docs**: Keep personas, project-plan, and knowledge bases current
6. **Review Metrics Weekly**: Use metrics-dashboard.md to spot trends
7. **Verify Quality Gates**: Ensure smooth phase transitions
8. **Reference Across Domains**: Link PRDs to research, designs to PRDs, etc.

### For Individual Contributors

1. **Read Existing Docs First**: Check /docs/README.md before starting work
2. **Follow Agent Conventions**: Use standard file naming and structures
3. **Cross-Reference Liberally**: Link to related documents
4. **Always Include TLDR**: Make documents scannable
5. **Always Include ACTION PLAN**: Make next steps clear
6. **Update README.md**: Keep domain README current with new docs
7. **Log Insights Continuously**: Don't wait until end of week

## Troubleshooting

### "Work is stalled at a quality gate"
- Review gate criteria in `/docs/workflows/quality-gates.md`
- Identify which criteria are not met
- Engage the appropriate agent to address gaps
- Sal (`/sector137:sal`) can coordinate cross-functional resolution

### "We're not doing enough discovery"
- Check metrics-dashboard.md for customer touchpoint count
- If < 1/week for 2+ weeks, escalate to product-manager (Margot)
- Sal should protect discovery time
- Balance may need adjustment (more discovery %)

### "Documentation is out of sync"
- Identify which living documents are stale
- Assign owners to update (each agent owns their docs)
- Sal can coordinate bulk updates
- Set calendar reminders for living doc reviews

### "Too much process, not enough shipping"
- Review which quality gates are causing delays
- Consider adjusting gate criteria (document in decision-log.md)
- Ensure gates focus on value, not bureaucracy
- Sal can facilitate retrospectives

### "Agents are working in silos"
- Check quality gate criteria are being verified
- Review cross-references between documents
- Sal should facilitate cross-functional coordination
- Ensure ACTION PLANs are consolidated into unified backlog

### "QA agent keeps triggering when I don't want it"
- Review TODO wording - avoid implementation keywords for non-code work
- Use research keywords (read, research, explore) for non-implementation tasks
- Temporarily disable hook in `~/.claude/settings.json` if needed

### "QA review didn't trigger for my code change"
- Verify TODO contains implementation keywords (implement, fix, build, etc.)
- Check `gemini-qa-on-todo-complete.sh` is configured in `~/.claude/settings.json`
- Verify hook script is executable: `chmod +x ~/.claude/hooks/gemini-qa-on-todo-complete.sh`

## Customization

This system is designed to be adapted to your team's needs:

### Adjusting Quality Gates
1. Review current gate criteria in `/docs/workflows/quality-gates.md`
2. Propose changes with rationale
3. Document decision in decision-log.md
4. Update quality-gates.md
5. Communicate changes to team

### Adding New Phases
1. Document new phase in discovery-to-delivery.md
2. Define quality gate criteria
3. Create handoff checklist
4. Update project-manager workflow tracking
5. Update metrics-dashboard.md with new cycle time metric

### Modifying Agent Roles
1. Update agent configuration in `[agent-name]/SKILL.md`
2. Update docs-structure.json if directory changes needed
3. Update this README.md to reflect changes
4. Document decision in decision-log.md

## Getting Help

### Within the System
- Read `/docs/README.md` in your project for project-specific context
- Read `/docs/workflows/discovery-to-delivery.md` for workflow details
- Read domain-specific READMEs for agent-specific guidance
- Use `/sector137:sal` for status and coordination help

### Agent Configuration
- Agent definitions: `[agent-name]/SKILL.md` (installed to `~/.claude/agents/[agent-name].md`)
- Documentation schema: `shared/config/docs-structure.json`
- Workflow templates: `shared/workflows/`
- Project templates: `shared/templates/project-docs/`

### External Resources
- Teresa Torres' Continuous Discovery Habits: https://www.producttalk.org/
- Quality Gates concept: Software Engineering best practices
- Architecture Decision Records (ADRs): https://adr.github.io/

## Quick Reference

### Agent Invocation Cheat Sheet

| Need | Agent / Skill | Character |
|------|--------------|-----------|
| Market research, competitive analysis | `intel-vesper` | Vesper Null |
| User research, personas, UX design | `design-wren` | Wren Glasswork |
| PRD, business case, roadmap, continuous discovery | `product-margot` | Margot Flux |
| Technical design, architecture, implementation | `engineering-kael` | Kael Deepstack |
| AI/ML solution design, model evaluation | `ai-oracle` | Oracle |
| Test strategy, code review, quality validation | `quality-judge` | Judge Veridia |
| Security audit, compliance, threat modeling | `security-cipher` | Cipher Locke |
| SLOs, incident response, observability, post-mortems | `sre-atlas` | Atlas Vance |
| Go-to-market, launch planning, positioning | `gtm-nova` | Nova Amplitude |
| Sales strategy, pitch development, pricing | `sales-harlan` | Harlan Closer |
| System health, agent performance, oversight | `overseer-nyx` | Nyx Panoptica |
| Pipeline coordination, build/test/ship | `/sector137:sal` | Software Sal |

### Workflow Phase Cheat Sheet

| Phase | Lead Agents | Key Output | Gate Criteria |
|-------|-------------|------------|---------------|
| Discovery | researcher, designer | Market + user research | Opportunity validated |
| Definition | product-manager | PRD | Requirements clear, feasible |
| Design | designer, tech-lead | UX + technical design | Designs approved, secure |
| Development | tech-lead, qa-engineer | Code + tests | Tests pass, coverage met |
| Testing | qa-engineer | Quality validation | No critical bugs |
| Deployment | tech-lead, Sal | Production deploy | Smoke tests pass |
| Operations | product-manager, qa-engineer, Nyx | Health monitoring | Metrics positive |

### Discovery Activity Cheat Sheet

| Activity | Frequency | Owner | Documented Where |
|----------|-----------|-------|------------------|
| Customer interviews | 1-2/week | product-manager | /docs/product/discovery/interview-notes/ |
| Assumption tests | 1-2/week | product-manager | /docs/product/discovery/assumption-tests/ |
| Opportunity tree updates | Weekly | product-manager | /docs/product/discovery/opportunity-solution-trees.md |
| Insight logging | Continuous | product-manager | /docs/product/discovery/customer-insights-log.md |
| Discovery planning | Weekly | product-manager | /docs/product/discovery/discovery-plan.md |
| Discovery metrics review | Weekly | Sal | /docs/workflows/metrics-dashboard.md |

### Automatic QA Review Cheat Sheet

| Trigger | Action | Output | Notes |
|---------|--------|--------|-------|
| TODO completed with "implement/fix/build" keywords | qa-engineer automatically reviews code | Review report in /docs/testing/todo-reviews/ | Code quality + docs + Playwright (if non-auth) |
| TODO completed with "read/research/explore" keywords | QA review skipped | N/A | Research tasks don't need QA |
| Issues found during review | Follow-up TODOs created | TODOs with severity rating (CRITICAL/HIGH/MEDIUM/LOW) | Non-blocking - creates follow-up work |
| No issues found | Brief "PASS" report generated | Review report showing clean review | Creates audit trail |
| `gemini-qa-on-todo-complete.sh` disabled in settings.json | No automatic QA | N/A | Can be toggled on/off per project |

---

## What Makes This System Effective

1. **Clear Ownership**: Each agent owns their domain, no confusion about responsibilities
2. **Structured Collaboration**: Handoff checklists and quality gates ensure smooth teamwork
3. **Continuous Learning**: Product discovery happens continuously, not just at project start
4. **Quality Assurance**: Multiple quality gates prevent defects from reaching production
5. **Automatic Code Review**: QA agent automatically reviews completed work via hooks
6. **Decision Traceability**: Everything is documented and linked for future reference
7. **Balanced Approach**: Discovery and delivery are both essential and tracked
8. **Adaptable Framework**: Can be customized to team needs while maintaining structure
9. **Cross-Functional Visibility**: All agents can read all docs, fostering shared understanding

This system is designed to help teams build the right things, build them well, and continuously learn and improve. Welcome aboard!
