---
name: docs-operations
description: "Guide for documentation operations across agent domains."
---

# Documentation Operations Guide

This guide explains how Claude Code root instance and agents discover, read, write, and coordinate documentation across the standardized `/docs/*` structure.

## Table of Contents

1. [Overview](#overview)
2. [Root Instance Operations](#root-instance-operations)
3. [Agent Operations](#agent-operations)
4. [Documentation Discovery Protocol](#documentation-discovery-protocol)
5. [Cross-Agent Coordination](#cross-agent-coordination)
6. [Quality Assurance](#quality-assurance)
7. [Troubleshooting](#troubleshooting)

---

## Overview

### The Documentation System

This system implements a **standardized, agent-managed documentation structure** where:

- **8 specialized agents** each manage their own domain directory
- **Read-all, write-own** access model ensures collaboration without conflicts
- **Root instance** coordinates across agents and maintains awareness of the complete documentation landscape
- **Standardized structure** prevents ad-hoc folder creation and maintains consistency

### Key Principles

1. **Single Responsibility**: Each agent owns and maintains one domain directory
2. **Read Access**: All agents can read all documentation for context
3. **Write Restrictions**: Agents can ONLY write to their designated directories
4. **Root Coordination**: Root instance discovers and references documentation but delegates writing to agents
5. **Living Documents**: Core documents are updated in place rather than versioned
6. **Traceability**: All documents cross-reference related work across domains

---

## Root Instance Operations

### Before Delegating to Agents

When the root Claude Code instance receives a request, it should:

1. **Check for Existing Documentation**
   ```markdown
   1. Read `/docs/README.md` (if exists) to understand current documentation state
   2. Review relevant domain READMEs for context
   3. Check living documents for latest context (e.g., `/docs/ux/personas.md`)
   4. Review decision log for historical context (`/docs/workflows/decision-log.md`)
   5. Check metrics dashboard for project health (`/docs/workflows/metrics-dashboard.md`)
   ```

2. **Provide Context to Agents**
   - When delegating, inform agents about existing documentation
   - Reference related documents across domains
   - Highlight dependencies between domains (e.g., PRD → Design → Engineering)

3. **Example Discovery Flow**
   ```markdown
   User: "We need to add a new dashboard feature"

   Root:
   1. Reads `/docs/README.md` → Understands project structure
   2. Reads `/docs/product/prds/` → Checks for existing dashboard PRDs
   3. Reads `/docs/ux/user-stories.md` → Checks for related user stories
   4. Reads `/docs/engineering/adrs/` → Checks for relevant architecture decisions
   5. Delegates to product-manager with context: "I see we have personas defined
      in /docs/ux/personas.md and existing navigation patterns in
      /docs/engineering/adrs/adr-003-navigation-architecture.md. Please reference
      these when creating the dashboard PRD."
   ```

### During Task Execution

- **Monitor Progress**: Track which phase each work item is in (Discovery, Definition, Design, etc.)
- **Coordinate Handoffs**: Ensure proper handoffs between agents when phases transition
- **Flag Dependencies**: Alert agents when their work depends on other agents' deliverables

### Documentation Responsibilities

Root instance should:

- **Never write to `/docs/*` directly** - Delegate all documentation writing to appropriate agents
- **Read documentation** to provide context and coordinate work
- **Reference documentation** when explaining project state to users
- **Suggest documentation needs** when gaps are identified

---

## Agent Operations

### Agent Initialization

When an agent first works on a project:

1. **Check for Documentation Structure**
   ```bash
   if [ ! -d "/docs/{domain}" ]; then
     # Create complete directory structure
     mkdir -p /docs/{domain}/{subdirectories}
     # Create README.md
     # Initialize living documents (if applicable)
   fi
   ```

2. **Read Existing Documentation**
   - Read root `/docs/README.md` for project overview
   - Read related domain documentation for context
   - Check `/docs/workflows/` for current workflow state
   - Review `/docs/workflows/decision-log.md` for historical decisions

3. **Establish Patterns**
   - Create `/templates/` with reusable document templates
   - Create `/reference/` with methodologies and standards
   - Update domain `README.md` with document index

### During Work Execution

1. **Before Creating Documentation**
   - Verify you're writing to YOUR designated directory
   - Read related documentation from other domains
   - Check for existing documents that should be updated vs. new ones created

2. **When Writing Documentation**
   - Follow standardized format (TLDR, body, ACTION PLAN)
   - Include complete metadata (date, context, dependencies, links)
   - Cross-reference related documents from other domains
   - Use standard file naming conventions

3. **After Creating Documentation**
   - Update domain `README.md` with new document
   - Notify project-manager of completion
   - Update living documents if applicable
   - Create templates if establishing new patterns

### Access Control Enforcement

**✅ ALLOWED:**
```markdown
- ai-engineer reads `/docs/product/prds/` to understand AI requirements
- designer reads `/docs/market-research/reports/` for competitive UX analysis
- tech-lead reads `/docs/ux/proposals/` to understand UX constraints
- security-engineer reads `/docs/engineering/design-docs/` for security review
```

**❌ PROHIBITED:**
```markdown
- ai-engineer creates `/docs/ml-models/` (must use `/docs/ai/` instead)
- designer creates `/docs/design/` (must use `/docs/ux/` instead)
- tech-lead creates `/docs/apis/` (must use `/docs/engineering/` instead)
- Any agent creates folders outside their designated directory
```

---

## Documentation Discovery Protocol

### For Root Instance

When starting work on a project, follow this discovery sequence:

**Step 1: Project Overview**
```bash
1. Read /docs/README.md → Get structure overview
2. Read CLAUDE.md (if exists) → Get project-specific context
3. Read README.md (project root) → Understand project purpose
```

**Step 2: Current State**
```bash
4. Read /docs/project/project-plan.md → Current status, priorities, blockers
5. Read /docs/workflows/metrics-dashboard.md → Project health metrics
6. Read /docs/workflows/discovery-to-delivery.md → Workflow state
```

**Step 3: Domain-Specific Context**
```bash
Based on the task, read relevant domains:
- Product feature → Read /docs/product/, /docs/ux/, /docs/market-research/
- Technical work → Read /docs/engineering/, /docs/ai/, /docs/security/
- Testing → Read /docs/testing/, /docs/engineering/, /docs/product/
- Launch planning → Read /docs/product/, /docs/workflows/, /docs/testing/
```

**Step 4: Historical Context**
```bash
7. Read /docs/workflows/decision-log.md → Past decisions and rationale
8. Check relevant domain READMEs → Document index and recent work
9. Read living documents → Latest state (personas, test strategy, ai-knowledge, etc.)
```

### For Agents

When an agent begins work, follow this sequence:

**Step 1: Understand Assignment**
```bash
1. Read task description and requirements
2. Identify what deliverable is needed
3. Check which phase of workflow this work belongs to
```

**Step 2: Read Cross-Domain Context**
```bash
4. Read upstream documentation:
   - product-manager reads /docs/market-research/ and /docs/ux/
   - designer reads /docs/product/ and /docs/market-research/
   - tech-lead reads /docs/product/, /docs/ux/, /docs/ai/
   - qa-engineer reads /docs/engineering/, /docs/product/, /docs/ux/
```

**Step 3: Check Own Domain**
```bash
5. Read own domain README.md
6. Check for existing related documents
7. Read living documents in own domain
8. Review templates and reference docs
```

**Step 4: Verify Quality Gate Context**
```bash
9. Read /docs/workflows/quality-gates.md → Understand criteria for current phase
10. Check handoff checklist for current phase transition
```

---

## Cross-Agent Coordination

### Handoff Protocol

When completing work that another agent needs:

1. **Complete Deliverable**
   - Ensure all required sections present (TLDR, ACTION PLAN, metadata)
   - Save to correct directory with standard naming
   - Update domain README.md

2. **Complete Handoff Checklist**
   - Read `/docs/workflows/handoff-checklists/{phase-transition}.md`
   - Verify all checklist items completed
   - Document any open questions or dependencies

3. **Notify project-manager**
   - Inform project-manager work is complete
   - Provide link to deliverable
   - Flag any blockers for downstream agents

4. **Notify Downstream Agent** (via project-manager)
   - project-manager notifies downstream agent
   - Provides context on deliverable and dependencies
   - Coordinates timing for downstream work to begin

### Example Handoff Flow

```markdown
researcher completes market analysis
  ↓
1. Saves to /docs/market-research/reports/market-analysis-{topic}-{date}.md
2. Updates /docs/market-research/README.md with new report
3. Completes /docs/workflows/handoff-checklists/research-to-prd.md
4. Notifies project-manager: "Market research complete, ready for PRD creation"
  ↓
project-manager verifies quality gate
  ↓
5. Checks Gate 1 criteria in /docs/workflows/quality-gates.md
6. Verifies handoff checklist complete
7. Logs gate pass in /docs/workflows/decision-log.md
8. Updates /docs/project/project-plan.md workflow state
  ↓
project-manager notifies product-manager
  ↓
9. "Market research available at /docs/market-research/reports/...,
    please create PRD. Key findings: [summary]. Gate 1 passed."
  ↓
product-manager begins PRD creation
  ↓
10. Reads market research report
11. Reads /docs/ux/ for user insights
12. Creates PRD in /docs/product/prds/
```

### Cross-Referencing Best Practices

**When reading other domains:**
```markdown
✅ DO:
- Link to specific documents with file paths
- Cite findings in your own documentation
- Explain how other domain's work informs yours
- Acknowledge dependencies and assumptions

❌ DON'T:
- Copy content from other domains into yours
- Make assumptions without reading other domains
- Duplicate information that exists elsewhere
- Modify other agents' documentation
```

**Example Cross-References:**

```markdown
## UX Design Proposal (designer creates in /docs/ux/proposals/)

**Referenced Research:**
- Market positioning: `/docs/market-research/reports/competitive-analysis-2025-01-15.md`
- User needs: `/docs/ux/personas.md` (Primary: Power User persona)
- Product requirements: `/docs/product/prds/prd-dashboard-2025-01-10.md`

This proposal addresses the "data visualization" requirement from the PRD
by applying patterns identified in our competitive analysis, specifically
the card-based layout used by competitors A and B.
```

---

## Quality Assurance

### For Root Instance

Before delegating work:
- [ ] Have you read `/docs/README.md` to understand structure?
- [ ] Have you checked for existing documentation on this topic?
- [ ] Have you identified which agent should handle this?
- [ ] Have you provided context from related domains?

### For Agents

Before creating documentation:
- [ ] Am I writing to MY designated directory?
- [ ] Have I read upstream documentation for context?
- [ ] Have I checked for existing docs that should be updated?
- [ ] Does my document include TLDR, metadata, and ACTION PLAN?

After creating documentation:
- [ ] Have I updated my domain README.md?
- [ ] Have I cross-referenced related documents?
- [ ] Have I notified project-manager of completion?
- [ ] Have I completed any applicable handoff checklists?

### Documentation Quality Checklist

Every document must have:

**Required Sections:**
- ✅ **TLDR** (at top) - 3-5 critical bullets
- ✅ **Metadata** - Date, context, dependencies, links
- ✅ **Body** - Well-organized content
- ✅ **ACTION PLAN** (near end) - Specific next steps
- ✅ **Cross-references** - Links to related docs

**File Hygiene:**
- ✅ Correct directory (`/docs/{agent-domain}/`)
- ✅ Standard naming convention
- ✅ Indexed in domain README.md
- ✅ No duplicate information
- ✅ Living documents updated (not versioned)

---

## Troubleshooting

### Problem: Agent Creating Additional Top-Level Directories

**Symptom:** Agent creates `/docs/apis/` or `/docs/components/` or other non-standard directories

**Solution:**
1. Check agent's designated directory in `~/.claude/agents/config/docs-structure.json`
2. Remind agent of access restrictions in agent file
3. Move content to correct directory
4. Update cross-references
5. Delete unauthorized directory

**Prevention:**
- Agent files have explicit "PROHIBITED actions" section
- Root CLAUDE.md reminds agents of structure
- docs-structure.json defines all allowed directories

### Problem: Duplicate Information Across Domains

**Symptom:** Same information appears in multiple agent directories

**Solution:**
1. Identify the "source of truth" domain for that information
2. Keep information in source domain
3. Other domains link to source with cross-references
4. Remove duplicates from other domains

**Prevention:**
- Use cross-references instead of copying
- Link to existing documents rather than duplicating
- Each domain focuses on their specialty

### Problem: Agents Not Reading Other Domains

**Symptom:** Agent creates work without considering related documentation

**Solution:**
1. Root instance provides context when delegating
2. Agents follow documentation discovery protocol
3. Handoff checklists require reading upstream docs
4. Quality gates verify cross-domain awareness

**Prevention:**
- Root mentions relevant docs when delegating
- Agent instructions emphasize reading for context
- Handoff checklists mandate upstream doc review

### Problem: Living Documents Not Being Updated

**Symptom:** Old information in `personas.md`, `test-strategy.md`, `ai-knowledge.md`, etc.

**Solution:**
1. Agent responsible for that domain updates living docs
2. Include "update living docs" in ACTION PLANs
3. Handoff checklists verify living docs current
4. Regular review cycles for living docs

**Prevention:**
- Agent instructions emphasize updating living docs
- Handoff checklists include living doc updates
- ACTION PLANs explicitly call out living doc updates

---

## Summary

### Root Instance Quick Reference

```markdown
When delegating to agents:
1. ✅ Read /docs/README.md for structure
2. ✅ Check for existing documentation on topic
3. ✅ Provide cross-domain context to agent
4. ❌ Don't write to /docs/* yourself
5. ✅ Reference docs when explaining to user
```

### Agent Quick Reference

```markdown
Before starting work:
1. ✅ Read your own domain README.md
2. ✅ Read upstream domain documentation
3. ✅ Check /docs/workflows/ for quality gates

While working:
4. ✅ Write ONLY to your designated directory
5. ✅ Cross-reference other domains
6. ✅ Follow standard format (TLDR, ACTION PLAN)

After completing work:
7. ✅ Update your domain README.md
8. ✅ Complete handoff checklist
9. ✅ Notify project-manager
10. ✅ Update living documents
```

### Key Files Reference

- Structure Definition: `~/.claude/agents/config/docs-structure.json`
- Root Instructions: `~/.claude/CLAUDE.md`
- Operations Guide: `~/.claude/agents/docs-operations.md` (this file)
- Project Template: `~/.claude/agents/templates/project-docs/`
- Agent Files: `~/.claude/agents/{agent-name}.md`

---

*For questions or issues with this documentation system, refer to the structure schema and agent-specific instructions in their respective files.*
