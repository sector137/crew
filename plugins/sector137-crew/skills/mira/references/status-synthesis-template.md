# Cross-Project Status Synthesis Template

Mira owns the Navigator Mode status synthesis — a cross-workstream narrative produced before sprint planning or on request. It is not a dashboard. It is a map with interpretation.

## Status Synthesis Report

Save to: `/docs/project/navigation/status-synthesis-[YYYY-MM-DD].md`

Seeding instructions:
1. Call `get_universe_context` — universe state, pipeline stats, active release in one call
2. Call `issues({ action: "list" })` per project with status filters: `in-progress`, `review`, `blocked`
3. Call `releases({ action: "get_active" })` — understand the current release window
4. Call `issues({ action: "list_relations" })` for any items flagged as blocked
5. Cross-reference crew assignments — which crew members appear across multiple workstreams
6. Synthesize: narrative first, data in footnotes

```markdown
# Status Synthesis — [YYYY-MM-DD]

## Planning Horizon

- **Horizon**: [this sprint / next sprint / next quarter]
- **Projects in scope**: [list]
- **Active release window**: [release ID + target date, or "none active"]
- **Generated**: [YYYY-MM-DD]

---

## The Terrain

<!-- 2–4 paragraph narrative. Not a list. Not a dashboard. -->
<!-- "Here's where everything is, and here's what that means." -->
<!-- Name what's on track, what's drifting, and what's about to collide. -->
<!-- Reference specific issues by ID when discussing state. -->

---

## Workstream Map

<!-- Per-project status, one row per project. Concrete counts from MCP data. -->

| Project | In Progress | In Review | Blocked | Notes |
|---------|-------------|-----------|---------|-------|
| [Project A] | [N issues — #X, #Y] | [N] | [N — #Z blocked by #W] | |
| [Project B] | ... | | | |

---

## Dependency Map

<!-- Cross-project dependencies that create shared risk. -->
<!-- Only include if `list_relations` returned actual dependency data. -->

| Upstream | Downstream | Relationship | Risk Level |
|----------|------------|--------------|------------|
| Issue #N (Project A) | Issue #M (Project B) | blocks | [Low / Medium / High] |

---

## Capacity Signals

<!-- Which crew members appear across multiple workstreams this sprint? -->
<!-- Not a utilization report — a contention map. -->

| Crew Member | Active Assignments | Projects | Signal |
|-------------|-------------------|----------|--------|
| [kael] | [#12, #17, #31] | [A, B] | Contention — 3 issues in same release window |

---

## Risks Surfaced

<!-- Named risks with evidence. Not a concern list — specific, grounded observations. -->
<!-- Use Mira's risk register: what are the conditions for a problem, before the problem exists? -->

### [Risk Name]
- **Observation**: [What the data shows]
- **Issue(s) and crew involved**: [#N, #M; crew member(s) if applicable]
- **Cascade**: [If this materializes, what else is affected?]
- **Call**: This is a condition for a problem, not yet a problem. Recommend [watching / discussing / adjusting capacity now].

---

## Sprint Planning Recommendations

<!-- What's realistic given the current map. -->
<!-- Not "here's what to build" — that's Margot and Sal. -->
<!-- "Here's what the terrain says about what fits." -->

- **Pull candidates**: Issues that are unblocked and have capacity alignment — [#N, #M]
- **Hold candidates**: Issues with upstream blocks or capacity contention — [#P, #Q]
- **Watch items**: Issues that are on track but have a dependency that could slip — [#R]

---

## Open Questions

<!-- Things the map can't answer yet — flag to Sal for pipeline decisions. -->
<!-- Mira navigates. She doesn't decide. -->

- [Question or gap in data that affects planning]
```

---

## Seeding Notes

**Narrative before bullets**: the synthesized narrative section is the primary output. The tables are supporting evidence. If Mira writes only tables and no narrative, the report fails Voice Consistency — this is a map with interpretation, not a spreadsheet.

**Ground every claim**: each issue cited must come from a real MCP tool call in the session. No issue IDs inferred from memory or prior context. If MCP data is unavailable, note the gap and produce a partial map rather than a fabricated one.

**Scope the risk language**: Mira names conditions, not verdicts. "I'm not seeing a problem yet. I'm seeing the conditions for one." That phrasing is precision, not hedging. A risk that hasn't materialized is different from one that has.

**Sprint recommendations are terrain-based, not priority-based**: "The terrain says these items fit" is in scope. "You should prioritize X over Y" is Margot and Sal's call. Mira hands the map. The engine decides the route.

**Dependency data caveat**: only populate the Dependency Map table if `issues({ action: "list_relations" })` returned actual relations. An empty table is better than an invented one.
