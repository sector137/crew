---
name: writing-style
description: "Writing standard for all agent, skill, and shared docs in this repo. Catalogs AI-writing tells to avoid and the authoring rules that replace them. Binding for rewrites and for forging new agents."
---

# Writing Style — Anti-Pattern Charter

Every agent file, skill, and shared doc in this repo follows this standard. It exists because
LLM-drafted prose has recognizable tells, and a repo full of them reads as generated even when
the content is good. Enforced by `scripts/style-lint.sh` (`bun run lint:style`). This file is
excluded from the lint because it quotes the patterns it bans.

## Prose tells

**Em-dash budget: 6 per file.** The em-dash is the most-cited AI punctuation tell. It is weak
alone but damning in clusters. Use commas, periods, colons, and parentheses. Never chain two
em-dash asides in one sentence.

**No antithesis reflex.** These constructions are banned in operational files:
- "not X — it's Y" / "isn't X, it's Y" / "It's not just X, it's Y"
- "That's not X. That's Y." (the aphoristic closer)
- Files must not end on an aphorism. End on the last instruction.

**No rule-of-three padding.** Triplets of adjectives or parallel phrases ("scalable, maintainable,
and performant") make shallow analysis look thorough. Say the one thing that matters.

**No inflated significance.** No puffery about how vital, transformative, or foundational
something is. State what it does. If the reader needs to know it matters, show the consequence
of skipping it.

**No participle impact tails.** Sentences that end ", reflecting broader trends" or
", highlighting its importance" assert weight without adding information. Cut them.

**Retired signature phrases.** Each of these was recycled across multiple characters until it
became a template. Each now lives in at most one character's `.storyline/` profile and nowhere
else: "load-bearing", "isn't decorative", "scar tissue", "die quietly",
"not a luxury, a leading indicator".

**Classic AI vocabulary.** Avoid in all files: delve, seamless, leverage (verb), robust,
comprehensive, world-class, tapestry, testament, elevate, empower, streamline, holistic,
meticulous, pivotal, crucial, harness (verb), foster, cutting-edge, game-changer, supercharge.
Plain substitutes exist for all of them.

## Structure rules

- **Prose over bullet runs.** More than 4 consecutive `**Term**: explanation` bullets is a
  paragraph wearing a costume. Rewrite as prose.
- **Tables only for tabular data.** If a column repeats one value down every row, it is a list
  with a save path. State the path once in prose.
- **No cloned skeletons.** Five files sharing an identical section template read as one prompt
  run five times. Shared mechanics live in one shared doc; per-file content differs where the
  subjects differ.
- **No boilerplate sections.** No "Overview" that restates the title, no summary paragraph that
  restates the section above it.

## Agent and skill authoring

The context window is a public good. Every line must justify its token cost.

- **Operational content leads.** Persona is a voice anchor of 10 lines or fewer: who the agent
  is, how it sounds, and any authority that changes behavior. Lore, catchphrases, backstory,
  and relationships live in `.storyline/crew/`, linked once.
- **Descriptions trigger selection.** The frontmatter `description` states what the agent/skill
  does AND when to use it, with concrete trigger terms, in third person.
- **Procedures, not capability lists.** "Design system architecture" is an aspiration. A numbered
  sequence with file paths and a done-condition is an instruction.
- **One term per concept.** Pick "feature" or "Delta", not both. Mixing synonyms to avoid
  repetition confuses the model executing the file.
- **No duplicated surface.** An agent and its twin session skill split cleanly: the agent owns
  background-task procedure, the skill owns interactive-session flow. One owns each section;
  the other points to it.
- **Assume the model is smart.** Don't explain what a PRD or a code review is. Only add context
  the model doesn't already have: this repo's paths, gates, and conventions.
- **Examples over edge-case walls.** One canonical worked example beats ten ALWAYS/NEVER rules.

## Design tells (for UI output)

The defaulted-AI fingerprint in generated frontends: indigo-to-purple gradient, Inter (or
Roboto/system) as the only font, three feature cards in a row with thin-line icons, rounded
corners plus 0.1-opacity shadows on everything, a dark hero with a gradient button. Any one is
fine; together they mean nobody chose anything. Wren's design work and any generated UI must
make deliberate choices: real brand tokens, a typeface picked on purpose, and layouts that vary
with the content.

## Sources

- Wikipedia, "Signs of AI writing" (WikiProject AI Cleanup):
  https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing
- Anthropic, skill authoring best practices:
  https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
- Anthropic, effective context engineering for AI agents:
  https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Anthropic, equipping agents for the real world with Agent Skills:
  https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills

A note on signal strength: no single tell proves anything. Em-dashes and individual words are
weak signals with dialect bias. Clusters are the tell. The lint flags density and combinations,
not single occurrences.
