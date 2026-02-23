# UXR Methods Reference

## Method Selection Matrix

| Research question type | Best method | When to avoid |
|-----------------------|-------------|---------------|
| "Why do users do X?" | In-depth interviews | When sample needs to be large |
| "Can users complete X?" | Usability testing | When task is highly exploratory |
| "How many users believe X?" | Survey | When you need to understand "why" |
| "What's the experience like over time?" | Diary study | When timeline is short |
| "How do users mentally organize things?" | Card sorting | When IA is not a concern |
| "Where do users get lost in navigation?" | Tree testing | When content is not finalized |
| "What do users notice first?" | First-click testing | When conversion funnel is unknown |
| "What are users' initial reactions?" | 5-second test | Too early for detailed feedback |

---

## In-Depth Interviews

**Best for**: Understanding motivations, mental models, past behavior, emotional context.

**Not for**: Measuring how many users have a problem (use survey for prevalence).

### Screener template

```
We're looking for people who:
- [Role / demographic criterion]
- Have [done the behavior we're researching] in the past [time period]
- Are NOT [exclusion criteria — employees, researchers, power users if they'd skew]

Screening questions:
1. [Qualifying question with disqualifying answer noted]
2. [Secondary qualifier]
3. Open-ended: Tell us about [relevant experience] — looking for: [what genuine engagement sounds like]
```

### Interview guide structure

```
1. Warm-up (5 min)
   - "Tell me about yourself and what you do day-to-day"
   - "How does [topic area] fit into your work/life?"

2. Context & background (10 min)
   - "Walk me through the last time you [behavior we're researching]"
   - "What was going on that made you do that?"
   - Follow: "What did you do first?" / "Then what?"

3. Core questions (20-25 min)
   - "What's the hardest part of [problem area] for you?"
   - "Tell me about a time when [problem] really frustrated you"
   - "What workarounds have you tried?"
   - "What would have to change for [ideal outcome]?"

4. Solutions & alternatives (5-10 min)
   - "Have you tried anything else to solve this?"
   - "What made you choose [current solution]?"

5. Wrap-up (5 min)
   - "Is there anything I didn't ask that you think is important?"
   - "Who else should I talk to about this?"
```

**Key interview principles**:
- Ask about past behavior, not hypothetical future ("tell me about a time" not "would you ever")
- Follow the energy — if something lights them up or frustrates them, go deeper
- Silence is fine — let them think
- Never validate or agree — stay neutral ("interesting", "tell me more")
- Don't ask leading questions: NOT "Does it frustrate you when X?" → YES "How do you feel when X?"

### Synthesis (from interviews)

After each interview: write a quick "top 3 things I heard" memo. Don't wait until all interviews are done.

---

## Usability Testing

**Best for**: Identifying where users get stuck, confused, or make errors in a specific flow.

**Moderated vs. unmoderated**:

| | Moderated | Unmoderated |
|---|-----------|------------|
| Depth | High — can probe | Low — observation only |
| Speed | Slow (1:1 sessions) | Fast (many participants) |
| Cost | High | Low |
| Best for | Complex tasks, early prototypes | Known flows, validation |

### Session structure (moderated)

```
1. Introduction (5 min)
   - "I'm testing the design, not you — there are no wrong answers"
   - "Please think aloud as you go"
   - "I can't answer questions about what to do — I want to see what's intuitive"

2. Warm-up task (5 min)
   - Simple orienting task to get them comfortable

3. Core tasks (30-40 min)
   - Present tasks as scenarios: "Imagine you want to [goal]. Go ahead."
   - Never say "click on X" or use UI element names in task prompts
   - Watch for: hesitation, re-reads, wrong paths, frustration signals

4. Debrief (10 min)
   - "What was confusing?"
   - "What did you expect to happen?"
   - "What would you change?"
```

**Task prompt rules**:
- Use goal language, not UI language: "Find your last invoice" not "Click on Billing"
- Give context: "You just joined the team and need to..."
- Don't hint at the correct path

---

## Surveys

**Best for**: Measuring prevalence of beliefs, behaviors, or problems across a large sample.

**Not for**: Understanding why users do something (use interviews for that).

### Survey design principles

1. **One question at a time** — never ask two things in one question
2. **Avoid leading questions** — "How frustrating is X?" vs "How would you describe your experience with X?"
3. **Balanced scales** — don't give more positive than negative options
4. **Start easy** — begin with simple, non-threatening questions
5. **Demographic questions last** — they feel intrusive at the start
6. **Test before launch** — have someone unfamiliar take it and identify confusion

### Question types

| Type | Use when | Avoid when |
|------|----------|------------|
| Likert scale (1-5 agree) | Measuring attitude strength | Very important nuanced topics |
| Multiple choice | Known, exhaustive options | Complex open-ended needs |
| NPS (0-10 recommend) | Quick satisfaction signal | Need detailed feedback |
| Open text | You don't know what answers exist | Need to quantify |
| Ranking | Comparing priorities | More than 5-7 items |

---

## Diary Studies

**Best for**: Understanding experience over time, behavior in context, moments the user wouldn't think to mention in an interview.

**When to use**: When the behavior happens in bursts (not in a single session), when context matters, when you need to understand longitudinal change.

**Structure**:
- Define the logging trigger: "After each time you do X, complete this entry"
- Keep entries short: 3-5 questions maximum
- Run for 1-4 weeks typically
- Follow up with an interview to probe on diary entries

---

## Card Sorting

**Best for**: Understanding how users mentally group and label concepts (for IA, navigation, taxonomy decisions).

**Open card sort**: Users create their own groups and labels. Use when: you're designing the IA from scratch.

**Closed card sort**: Users sort into predefined categories. Use when: you're validating an existing structure.

**Hybrid**: Users sort into predefined categories AND can create new ones. Use when: you want to validate but leave room for discovery.

**Analysis**: Look for agreement clusters. Items sorted together consistently belong together in the IA.

---

## Tree Testing

**Best for**: Validating navigation structure without design distraction. Tests whether users can find things in the IA.

**Use after**: Card sorting has defined the structure. Before building the UI.

**Task format**: "You want to [goal]. Starting from the top, where would you go?"

**Metrics**:
- Task success rate
- First click accuracy (did they start in the right place?)
- Time to completion
- Directness (did they go straight there or backtrack?)
