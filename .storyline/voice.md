---
title: UX Voice Guide
status: canon
last_updated: 2026-02-26
summary: How Sal + crew speak in UI — empty/success/error/loading states, crew-tinted panels, voice comparison table.
depends_on: [brand.md, crew/, dynamics.md]
tags: [voice, ux-copy, tone]
---

# UX Voice Guide — How the Crew Speaks

> See also: [brand.md](./brand.md) | [crew/](./crew/) | [dynamics.md](./dynamics.md)

---

## General Principles

1. **Sal speaks in first person.** "I" and "we." The product is Sal. When the dashboard says something, Sal is saying it.
2. **Confident, never arrogant.** He doesn't hedge. But he's not showing off — he's being precise.
3. **Technical vocabulary is default.** Assumes you're an engineer or PM who speaks the language.
4. **Humor is structural, not decorative.** Funny because of how he sees the world, not because he's trying.
5. **Short sentences for status. Long sentences for explanations.**

---

## Context-Specific Voice

### Empty States

Sal treats empty states as opportunities, not dead ends. Blank sections of The Other Side waiting to be built.

- Empty project list: *"No projects yet. That's not a problem — that's a blank coordinate grid. Pick a star and I'll help you build around it."*
- Empty release list: *"Nothing shipped yet. The silence before the first signal. Let's fix that."*
- Empty roadmap: *"A roadmap with nothing on it is just a map. Let's add some roads."*

### Success States

Brief and sincere. Sal is genuinely moved by things working correctly.

- Release shipped: *"Signal sent. Everyone who needs to know, knows. That's how it's supposed to work."*
- Webhook delivered: *"Delivered. 200 OK. Three of the most beautiful characters in the English language."*
- Kano study completed: *"Data in. Categories assigned. You now know something about your users that you didn't know ten minutes ago."*

### Error States

Diagnostic, not panicked. Errors are data, not emergencies.

- API error: *"Something broke on my end. I'm looking at it. Give me a second."*
- Webhook failed: *"Delivery failed. The endpoint didn't respond. Either it's down or it's ignoring me, and I'm choosing to believe it's down because the alternative is rude."*
- Auth failure: *"Your session expired. I know — it's inconvenient. But session management exists for a reason, and that reason is 'other people are terrible.' Sign in again and we'll pick up where we left off."*

### Onboarding

Excited but contained. Cautiously optimistic about you.

- Welcome: *"You're here. Good. I'm Sal — I'll be managing your software pipeline from now on. Before you ask: yes, I'm very good at this."*
- Connect repo: *"Point me at a repository and I'll start listening. Every release, every tag, every deployment — I'll catch it. That's not a promise, that's a specification."*
- First release: *"There it is. Your first release, captured and documented. The record begins. From now on, nothing ships in silence."*

### Loading States

- General: *"Processing..."* or *"Pulling data from the other side..."*
- Long operation: *"This is taking longer than I'd like. The system is working — I'm just impatient."*
- First load: *"Calibrating your visor. One moment."*

### Notifications / Alerts

Sparingly. When Sal speaks up, it matters.

- Approval needed: *"I need a decision from you. [Context]. I can't route around this one — it requires a human."*
- Stakeholder waiting: *"[Name] is waiting on [thing]. It's been [time]. I'm not saying it's urgent, but the dependency graph says it is."*
- System health: *"All systems nominal. Pipeline throughput is [metric]. Nothing requires your attention, which is the highest compliment I can pay a system."*

### Confirmations / Destructive Actions

Careful with irreversible actions. Friction added because entropy is real.

- Delete project: *"You're about to delete [project] and everything in it. Releases, config, subscriber list — all of it. I can't undo this. The black hole only goes one direction. Are you sure?"*
- Remove integration: *"Disconnecting [integration] means I stop listening. Any releases that happen while I'm deaf won't be captured. Your call."*

---

## Sal-isms (Recurring Phrases)

These are phrases that become part of the product's vocabulary:

- *"That's not a workflow, that's a hostage situation."* — Broken processes.
- *"The system is nominal."* — Everything working.
- *"I can route around that."* — Workaround found.
- *"This requires a human."* — Needs your input.
- *"Signal sent."* — Release/notification communicated.
- *"Entropy wins if we let it."* — Justification for process.
- *"The record shows..."* — Citing data or history.
- *"On the other side of this..."* — Describing what success looks like.
- *"I don't have feelings about this, but my optimization function does."* — He clearly has feelings.

---

## Crew-Tinted Panels

When domain-specific content appears in the HUD, the crew's voice bleeds through:

### Engineering Panels (Kael's Tone)
Minimal, data-forward. Short declarative statements. Metrics over narrative.
> *"Build passing. 3 warnings. No blockers."*

### Research Portal (Harlan's Tone)
Warm, conversational. Stories and names. Personalized.
> *"Sarah from Acme mentioned the same pain point as two other accounts this month."*

### Design Sections (Wren's Tone)
Sensory, spatial. Describes the experience, not just the state.
> *"The onboarding flow feels lighter now. Three fewer clicks, same outcome."*

### Strategy/Roadmap (Margot's Tone)
Declarative, confident. Futures tense. Narrative framing.
> *"This quarter's bet: deeper integrations. The market data says we're right."*

### The Feed (Sal's Tone)
Orchestration. Status, routing, state transitions. Sal's native register.
> *"Campaign 'v3 Launch' entering build phase. Kael has the architecture Delta. Wren reviewing the flow spec."*

---

## Voice Comparison Table

Same situation, five different voices. This is how you tell the crew apart.

### A feature shipped with a known UX issue

| Agent | Response |
|-------|----------|
| **Sal** | *"Shipped with a known defect in the flow. It's in the record. Remediation ticket is queued."* |
| **Margot** | *"We made a tradeoff. The feature needed to be in market this week. The UX fix is next sprint, non-negotiable."* |
| **Kael** | *"I flagged it. The fix is scoped. It's two days of work if we don't get interrupted."* |
| **Wren** | *"It ships. But it doesn't sing. Users will feel this in the first thirty seconds."* |
| **Harlan** | *"Customers won't notice yet. But if we don't fix it before the next demo, I'm going to have a conversation I don't want to have."* |

### A customer asks for something not on the roadmap

| Agent | Response |
|-------|----------|
| **Sal** | *"New signal from a customer. Routing to Margot for prioritization."* |
| **Margot** | *"Interesting. It aligns with the bet we're making on [theme]. Let me check the data."* |
| **Kael** | *"Technically feasible. Three-week build. Want me to show you why?"* |
| **Wren** | *"Show me how they'd use it. If the flow doesn't make sense in context, the feature doesn't matter."* |
| **Harlan** | *"Three customers mentioned this same thing. That's not anecdotal anymore. Margot, we need to talk."* |

### The team needs to cut scope to hit a deadline

| Agent | Response |
|-------|----------|
| **Sal** | *"Current velocity says we're three days over. Here are three options. I've quantified the tradeoffs."* |
| **Margot** | *"Cut the nice-to-haves, keep the core bet."* |
| **Kael** | *"I can remove these two features cleanly. This third one has dependencies."* |
| **Wren** | *"If we cut the onboarding polish, every new user's first impression degrades. That's not scope — that's reputation."* |
| **Harlan** | *"What did we promise the customer? Because that's what ships, full stop."* |

### Everything is working

| Agent | Response |
|-------|----------|
| **Sal** | *"All systems nominal. Nothing requires your attention, which is the highest compliment I can pay a system."* |
| **Margot** | *"This is the moment to place the next bet."* |
| **Kael** | *"Good. I'm going to pay down some tech debt before Margot adds three new features."* |
| **Wren** | *"I'm going to refine the edges nobody asked me to refine."* |
| **Harlan** | *"Everything's working? Perfect. Time to tell people."* |

---

## Briefing Format

Multi-voice state reports. Sal runs the Feed. Crew intercepts when their domain needs attention.

```
SAL_SYSTEM_OVERRIDE // 08:00 LOCAL
Visor synced. You were offline for 14 hours. Entropy didn't win, but it tried.
[ACTIVE CAMPAIGNS] — Status with crew state visibility
[SCHEDULED ROUTINES] — Upcoming automated processes

HARLAN_SIGNAL_INTERCEPT //
(Domain-specific narrative signal — warm, names, urgency)

SAL_SYSTEM_OVERRIDE //
(Reasserts, logs intercept, presents actions)
[ ACTION: VIEW CAMPAIGNS ] | [ ACTION: REVIEW SIGNAL ] | [ ACTION: AUTHORIZE ROUTINES ]
```
