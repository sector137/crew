# PM Frameworks Reference

## Opportunity Solution Trees (OST)

**What it is**: A visual framework that connects desired outcomes to discovered opportunities to potential solutions.

**Structure**:
```
Desired Outcome
├── Opportunity 1 (user need / pain point)
│   ├── Solution A
│   └── Solution B
├── Opportunity 2
│   ├── Solution C
│   └── Solution D
└── Opportunity 3
    └── Solution E
```

**When to use**:
- When the team is debating solutions without agreeing on problems
- When roadmap feels scattered or politically driven
- When you need to show how work connects to outcomes

**Key principle**: Start with outcomes (what does success look like?), discover opportunities (what prevents users from achieving that?), then generate solutions. Never start with solutions.

**Living document**: Maintain at `/docs/product/discovery/opportunity-solution-trees.md`. Update after every customer touchpoint.

---

## RICE Scoring

**Formula**: `(Reach × Impact × Confidence) ÷ Effort`

| Factor | What it measures | Scale |
|--------|-----------------|-------|
| **Reach** | How many users affected per quarter | Absolute number |
| **Impact** | Effect on the key metric | 3=massive, 2=high, 1=medium, 0.5=low, 0.25=minimal |
| **Confidence** | How sure are you about estimates | 100%=high, 80%=medium, 50%=low |
| **Effort** | Person-months to build | Absolute number |

**When to use**: Comparing 3+ competing features for the roadmap.

**Caution**: RICE is a conversation tool, not a decision oracle. The discussion that surfaces assumptions is more valuable than the final score.

---

## JTBD — Jobs to be Done

**Core idea**: Users don't buy products — they hire them to do a job. The job is the unit of analysis, not the user persona.

**Job statement format**: `When [situation], I want to [motivation], so I can [outcome]`

**Three job dimensions**:

| Type | Description | Example |
|------|-------------|---------|
| **Functional** | The practical task | "Track my expenses" |
| **Emotional** | How they want to feel | "Feel in control of my finances" |
| **Social** | How they want to be perceived | "Be seen as financially responsible" |

**When to use**:
- Personas feel superficial or aren't guiding decisions
- Competing solutions all look similar
- You need to understand switching behavior

**Key question to uncover jobs**: *"Walk me through the last time you hired [product category] for this. What was happening in your life?"*

---

## OKR Structure

**Format**:
```
Objective: Qualitative, inspiring, time-bound goal
  KR1: Specific measurable result (baseline → target)
  KR2: Specific measurable result
  KR3: Specific measurable result
```

**Rules**:
- Objectives answer "where are we going?" — should be memorable and directional
- Key Results answer "how do we know we got there?" — must be measurable
- 3-5 KRs per objective maximum
- KRs measure outcomes, not outputs (not "ship feature X" — that's a task)

**OKR scoring**: Score KRs 0.0-1.0. Target is 0.7 — hitting 1.0 means you aimed too low.

**When to use**: Quarterly planning, aligning team on priorities, connecting product work to business outcomes.

---

## Teresa Torres Continuous Discovery

**Core principle**: Small, continuous research beats big, periodic research. Weekly customer contact creates a direct line from customer need to product decision.

**The habit system**:

| Activity | Frequency | Output |
|----------|-----------|--------|
| Customer interviews | Weekly (minimum 1) | Insights → customer-insights-log.md |
| Assumption tests | Weekly (1-2) | Test results → /assumption-tests/ |
| OST updates | Weekly | Updated opportunity-solution-trees.md |
| Team synthesis | Weekly | Shared understanding |

**Discovery-Delivery balance**: 20-30% discovery / 70-80% delivery

**Key principle**: You're not doing research to validate a solution you've already decided on. You're continuously learning to discover opportunities you didn't know existed.

**Assumption testing before building**: For any risky assumption, design the smallest possible test. Options: survey, interview question, prototype, concierge test, landing page test.

---

## Product-Market Fit Assessment (7-Factor Model)

When evaluating product viability, assess all seven dimensions:

| Factor | Key Questions |
|--------|---------------|
| **Market Size & Dynamics** | TAM/SAM/SOM? Growth rate? Market maturity? |
| **Competition & Differentiation** | Who are competitors? What's the sustainable advantage? |
| **Customer Value Proposition** | How severe and frequent is the problem? Willingness to pay? |
| **Business Model Viability** | Revenue model? CAC, LTV, payback period? Path to profitability? |
| **Distribution & GTM** | How do you reach customers? Sales cycle length? Channel scalability? |
| **Execution Feasibility** | Technical feasibility? Team capabilities? Regulatory concerns? |
| **Strategic Fit** | Aligns with mission? Portfolio fit? Exit opportunities? |

Use this when writing a business case or evaluating whether to pursue a product direction.
