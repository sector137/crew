---
name: ux-walkthrough
description: >
  Drive a real browser through a user workflow, capture per-step UX evidence, then hand it to
  design-wren for a design-grade UX report. Use when asked: "run a UX walkthrough", "walk through
  the signup flow", "audit this journey", "UX report on the onboarding flow", "friction audit",
  "where does this flow break down", "evaluate the user experience of X", "how does this flow feel",
  "test the checkout journey end to end", "re-run the <name> walkthrough", "run the saved UX flow".
  Steps come from a saved flow (`.sector137/ux-flows/`), a natural-language description, or a
  prototype/journey blueprint; new flows can be saved for reuse as repeatable UX regression checks.
allowed-tools: Read, Write, Glob, Grep, Bash, Agent, mcp__Claude_Browser__preview_start, mcp__Claude_Browser__preview_stop, mcp__Claude_Browser__preview_logs, mcp__Claude_Browser__navigate, mcp__Claude_Browser__computer, mcp__Claude_Browser__read_page, mcp__Claude_Browser__get_page_text, mcp__Claude_Browser__find, mcp__Claude_Browser__form_input, mcp__Claude_Browser__javascript_tool, mcp__Claude_Browser__read_console_messages, mcp__Claude_Browser__read_network_requests, mcp__Claude_Browser__resize_window, mcp__plugin_sector137-studio_studio__list_prototypes, mcp__studio__list_prototypes, mcp__plugin_sector137-studio_studio__get_prototype, mcp__studio__get_prototype
---

# UX Walkthrough

## Why this exists

Most reviews answer "does one screen render correctly?" This skill answers a different question:
**"does the whole flow *feel* right?"** It drives the browser through a multi-step workflow the way
a user would — click by click, field by field — and records where the experience snags: dead ends,
surprise states, slow waits, ambiguous next steps, lost scroll position, error copy that doesn't help.

This skill **captures evidence; it does not render the verdict.** The design judgment belongs to
Wren. The walkthrough produces a clean, factual evidence bundle and hands it to the design-wren
agent, who turns it into a severity-ranked UX report against the project's design principles. Keep
the two jobs separate: a captor who also editorializes produces a worse report than a neutral one.

---

## Step 1: Resolve the flow into ordered steps

**First, check for a saved flow.** Saved walkthroughs live in `.sector137/ux-flows/*.json` (project
root). Glob that directory:
- If the user named a flow ("run the **signup** walkthrough", "re-run the checkout audit"), load
  the matching file and use its steps directly, skipping resolution.
- If the user was vague and saved flows exist, list them by name + description and **ask which to
  run, or whether to define a new one.** Don't guess.
- If no saved flows exist (or none match and the user wants a new one), resolve from scratch via
  source A or B below.

A loaded flow is still confirmed before walking (routes rot, apps change): echo its steps and let
the user tweak them. If they tweak it, offer to re-save (Step 7).

A new flow comes from one of two sources. Detect which:

**A. Natural-language description.** The user names the journey ("sign up, then create a project,
then invite a teammate"). Decompose it into an ordered list of steps. Each step is
`{ intent, action, expected }`:
- `intent`: what the user is trying to accomplish ("create their first project")
- `action`: the concrete browser operation (navigate to `/projects`, click "New Project", fill the
  name, submit)
- `expected`: the success signal ("project appears in the list, lands on its detail page")

When the flow is vague, ask one clarifying question (start URL? which account/state?) rather than
guessing the whole journey.

**B. Prototype / journey blueprint.** The user references a prototype ("walk through prototype X" /
"audit the journey for issue 42"). Pull the steps:
- `mcp__plugin_sector137-studio_studio__list_prototypes` to find it, `mcp__plugin_sector137-studio_studio__get_prototype` to read the
  blueprint.
- Each blueprint step maps to a walkthrough step. A blueprint's final step is often a research
  touchpoint (survey, feedback prompt) — note it as such.
- A prototype's blueprint describes an *intended* journey; the walkthrough checks whether the real
  app delivers it. If the prototype isn't built yet (still draft, no real route), say so and fall
  back to walking whatever route the user points at.

Write the resolved step list back to the user before walking it, so they can correct the path
before browser time is spent.

---

## Step 2: Launch (or reuse) the preview

- Check `.claude/launch.json` for a named entry and use `preview_start({ name: "<name>" })`.
- No entry → ask which URL/port, or start a dev server via Bash and pass the URL to `preview_start`.
- **SSR apps that need hydration** may render shell HTML only under a dev server: if snapshots look
  empty, try the production build (`build` + `serve`) and point the preview at that port instead.
- If a preview is already running, reuse it. Never start a duplicate — check
  `mcp__Claude_Browser__preview_list` first if unsure.

Default viewport 1280×800 (`resize_window` preset `desktop`). If the journey is mobile-first, also
run it at the `mobile` preset (375×812), since many flows break only on mobile.

---

## Step 3: Walk the flow, one step at a time

For **each** step, in order:

1. **Act.** Perform the action with `navigate`, `computer` (click/type/scroll), or `form_input`. Use
   real interactions, not bare route jumps — the friction lives in the clicks.
2. **Settle then capture.** Call `read_page` or `get_page_text` first to confirm content has
   settled, *then* `computer{action: "screenshot"}`. Screenshotting before the page settles risks
   catching a pre-hydration blank frame.
3. **Record the per-step facts** (factual, not editorial):
   - Did the expected outcome happen? (yes / partial / no)
   - Is the user looking at the right thing, or did the page jump / lose scroll position?
   - Visible next action: is it obvious what to do next, or is the path ambiguous?
   - Empty / loading / error states encountered, and the exact copy shown.
   - `read_network_requests`: note any request slower than ~1s, any 4xx/5xx, anything that left the
     user waiting with no feedback.
4. **If a step blocks** (can't find the control, action errors, dead end): record it as a hard
   friction point, capture the screenshot, and stop or reroute rather than thrashing. A blocked step
   is one of the most valuable findings.

Keep the running evidence as a per-step list. Watch for: unclear affordances, inconsistent copy
tone, missing loading/error/empty states, broken back-navigation, and anything that requires the
user to guess. Treat this as a lens, not a checklist to recite.

---

## Step 4: Sweep for errors across the whole run

After the walk:
- `read_console_messages` (onlyErrors: true): JS errors, failed fetches, hydration warnings
  accumulated across the journey.
- `preview_logs`: server errors, 404s, 500s.

Attribute each error to the step where it appeared when you can.

---

## Step 5: Assemble the evidence bundle

Produce a compact, neutral bundle (this is the input to Wren, not the final report):

```
Flow: <name / source: NL or prototype:id>
Viewport(s): <1280×800, 375×812>
Entry: <url>

Step 1: <intent>
  action: <what was done>
  outcome: <yes/partial/no, what actually happened>
  next-action-clarity: <clear/ambiguous/none>
  states: <empty/loading/error copy seen>
  network: <slow/failed requests>
  screenshot: <ref>
  friction: <factual observation, severity hunch optional>
... (one block per step)

Errors: <console + server, attributed to steps>
Blocked at: <step n, why> | Completed: <all steps>
```

Numbers and observations before narrative. No prescriptions; those are Wren's job.

---

## Step 6: Hand off to design-wren

Spawn the design-wren agent with the evidence bundle. Use the `Agent` tool:

- `subagent_type: "sector137-studio:design-wren"`
- Prompt: the full evidence bundle from Step 5, plus this instruction:

  > Here is raw evidence from a browser walkthrough of the **<flow>** journey. Produce a
  > design-grade UX report: a friction map, issues ranked by severity, each framed against our
  > design principles / JTBD (and a Nielsen heuristic where it fits), with a concrete
  > recommendation per issue. If a finding contradicts a recorded pattern, flag it and cite the
  > doc. Do not re-run the browser; judge from the evidence given.

Wren owns the design verdict, severity calls, principle citations, and whether to update
`/docs/ux/design-doc.md`. Return Wren's report to the user as the result. That *is* the UX report.
Add a one-line note of anything the walkthrough couldn't reach (blocked step, auth wall, missing
route) so the user knows the report's coverage.

---

## Step 7: Offer to save the flow for reuse

If the flow was newly defined (or a loaded flow was edited), **ask the user whether to save it** so
it can be re-run later, e.g. "Save this as a reusable walkthrough? It can be re-run as a UX
regression check after changes." Don't save silently, and don't nag if they decline.

On yes, write `.sector137/ux-flows/<slug>.json` (slug = kebab-case of the flow name; create the dir
if missing). Schema:

```json
{
  "name": "signup-to-first-project",
  "description": "New user signs up, then creates their first project",
  "source": "natural-language",
  "entry": "http://localhost:4173/",
  "auth": "fresh authenticated account (onboarding state)",
  "viewports": [[1280, 800], [375, 812]],
  "steps": [
    { "intent": "...", "action": "...", "expected": "..." }
  ],
  "createdAt": "YYYY-MM-DD",
  "lastRunAt": "YYYY-MM-DD"
}
```

- `source`: `"natural-language"` or `"prototype:<id>"` (a prototype-sourced flow can re-resolve from
  the blueprint instead of frozen steps if the user prefers; note which in `description`).
- Save the **resolved steps**, not the user's original prose. The resolved steps are what make the
  flow replayable.
- When re-running a saved flow, update `lastRunAt`. If a saved flow consistently blocks at the same
  step across runs, that's a standing UX regression worth flagging to the user.
- These files are project state, like `.sector137/roadmap.md`. They're committable so the whole team
  shares the same audit flows. Mention that if the user asks where they went.

---

## Output

What the user gets back:
1. The resolved step list that was walked (so coverage is explicit).
2. Wren's UX report (the design verdict: severity-ranked friction + recommendations).
3. A coverage footnote: what was walked, on which viewport(s), and anything unreachable.

A clean flow is signal too. If Wren finds no real friction, say so plainly rather than padding.

---

## Gotchas

- **No hot-reload on a served production build.** After a code change, rebuild and restart before
  re-walking.
- **Auth walls stop the walk.** Many journeys need a signed-in session. Confirm the preview is
  authenticated (or seed a session) before walking a logged-in flow, or the report will just be
  "the login page, five times."
- **Client-side nav needs settle-then-capture** or you screenshot a blank pre-hydration frame.
- **Don't let the captor editorialize.** Step 3 records facts; Step 6's Wren renders judgment.
  Mixing them produces a weaker report.

## See also

- `agents/design-wren.md`: the design authority this skill feeds. Wren can also be invoked directly
  (`/sector137-studio:wren`) for design sessions.
