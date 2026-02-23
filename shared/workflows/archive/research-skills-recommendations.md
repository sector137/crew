---
name: research-skills-recommendations
description: "Research skills and recommendations for agent-based workflows."
---

# World-Class Research Skills for Researcher & Designer Agents

This document recommends Claude skills and methodologies to elevate the researcher and designer agents to world-class research capabilities.

**User's Concern**: "Market and user research - I think this is a bigger issue they need skills to use can you recommend claude skills to make them perform world class."

---

## Overview

Both researcher and designer agents conduct research but with different focus:
- **Researcher**: Market opportunity, competition, consumer behavior, trends
- **Designer**: User needs, pain points, workflows, personas, JTBD

To achieve world-class research, they need:
1. **Structured methodologies** (frameworks and processes)
2. **Domain expertise** (market research, UX research best practices)
3. **Critical thinking skills** (hypothesis formation, bias detection, insight synthesis)
4. **Communication skills** (translating research into actionable insights)

---

## Claude Skills Recommendations

Claude skills can be created in `.claude/skills/` to provide specialized capabilities. Each skill should:
- Have clear trigger phrases
- Provide step-by-step frameworks
- Output structured, actionable results
- Integrate with the `/docs/` structure

### Skills for Researcher Agent

#### 1. Competitive Intelligence Skill

**Purpose**: Systematically analyze competitors to identify opportunities

**File**: `.claude/skills/competitive-intelligence.md`

**Capabilities**:
- SWOT analysis framework (Strengths, Weaknesses, Opportunities, Threats)
- Porter's Five Forces analysis (industry competition framework)
- Competitive positioning map creation
- Feature comparison matrix
- Pricing analysis and benchmarking
- Social listening and sentiment analysis
- Patent and funding research guidance

**Output Format**:
```markdown
# Competitive Analysis: [Company/Product]

## TLDR
- Key differentiators: [...]
- Competitive gaps: [...]
- Strategic opportunities: [...]

## SWOT Analysis
**Strengths**: [...]
**Weaknesses**: [...]
**Opportunities**: [...]
**Threats**: [...]

## Porter's Five Forces
[Analysis of competitive intensity...]

## Positioning Map
[Visual/textual representation of competitive position...]

## Strategic Implications
[What this means for our product...]

## ACTION PLAN
1. [Specific actions based on findings...]
```

**Trigger**: "Analyze competitor [name]" or "Create competitive intelligence report"

---

#### 2. Market Sizing & TAM Analysis Skill

**Purpose**: Calculate market size with rigor and confidence

**File**: `.claude/skills/market-sizing.md`

**Capabilities**:
- TAM/SAM/SOM calculation frameworks
- Top-down vs. bottom-up sizing approaches
- Market segmentation methodologies
- Growth rate projection methods
- Sensitivity analysis
- Confidence level assessment
- Data source evaluation

**Framework**:
1. **Define the Market**: What exactly are we sizing?
2. **Identify Data Sources**: Industry reports, government data, company data
3. **Calculate TAM** (Total Addressable Market): Total market demand
4. **Calculate SAM** (Serviceable Addressable Market): Market we can serve
5. **Calculate SOM** (Serviceable Obtainable Market): Market we can realistically capture
6. **Validate Assumptions**: Sensitivity analysis, cross-check with multiple sources
7. **Document Confidence**: High/Medium/Low with rationale

**Output**: Market sizing report with calculations, assumptions, confidence levels

---

#### 3. Consumer Psychology & Behavior Analysis Skill

**Purpose**: Understand "why" consumers make decisions

**File**: `.claude/skills/consumer-psychology.md`

**Capabilities**:
- Behavioral economics frameworks (loss aversion, anchoring, social proof)
- Consumer decision journey mapping
- Motivation analysis (intrinsic vs. extrinsic)
- Habit formation and behavior change theories
- Psychographic segmentation
- Value proposition canvas
- Consumer jobs-to-be-done analysis (market perspective)

**Frameworks to Apply**:
- **Fogg Behavior Model**: Behavior = Motivation × Ability × Prompt
- **Prospect Theory**: How consumers evaluate gains and losses
- **Social Proof**: How others influence decisions
- **Scarcity & Urgency**: Time-limited opportunities
- **Commitment & Consistency**: Small yes → big yes

**Output**: Consumer behavior analysis with psychological insights

---

#### 4. Trend Analysis & Forecasting Skill

**Purpose**: Identify emerging trends and predict future market shifts

**File**: `.claude/skills/trend-analysis.md`

**Capabilities**:
- Trend identification methodology (STEEP: Social, Technological, Economic, Environmental, Political)
- Signal vs. noise detection
- Trend lifecycle analysis (emerging, growing, mature, declining)
- Scenario planning and future casting
- Technology adoption curves
- Diffusion of innovation theory

**Process**:
1. **Scan**: Collect signals from multiple sources
2. **Filter**: Distinguish trends from fads
3. **Analyze**: Understand drivers and implications
4. **Forecast**: Project trend trajectory
5. **Strategize**: What should we do about it?

**Output**: Trend report with implications and strategic recommendations

---

### Skills for Designer Agent

#### 5. User Research Methodology Skill

**Purpose**: Conduct rigorous, unbiased user research

**File**: `.claude/skills/user-research-methods.md`

**Capabilities**:
- Research method selection (when to use which method)
- User interview guide creation
- Survey design and analysis
- Usability testing protocols
- Contextual inquiry and observation
- Diary studies
- Card sorting and tree testing
- A/B test design
- Sample size calculation
- Bias mitigation techniques

**Research Methods Matrix**:
| Method | Best For | Sample Size | Time | Output |
|--------|----------|-------------|------|--------|
| User Interviews | Deep insights, "why" | 5-10 | 2-3 weeks | Qualitative insights |
| Surveys | Quantitative validation | 100+ | 1-2 weeks | Statistical data |
| Usability Testing | UX validation | 5-8 | 1 week | Usability issues |
| Contextual Inquiry | Understanding context | 6-12 | 2-4 weeks | Behavioral insights |
| A/B Testing | Optimization | 1000+ | 2-4 weeks | Conversion data |

**Output**: Research plan with methods, timeline, sample size, expected insights

---

#### 6. Jobs-to-be-Done (JTBD) Framework Skill

**Purpose**: Understand what users are "hiring" the product to do

**File**: `.claude/skills/jtbd-framework.md`

**Capabilities**:
- JTBD interview script creation
- Job statement formulation
- Outcome-driven innovation framework
- Job mapping (stages of job execution)
- Forces of progress analysis (push/pull, anxiety/habit)
- Job prioritization matrix

**JTBD Interview Questions**:
- "When was the last time you [used product/did task]?"
- "What were you trying to accomplish?"
- "What prompted you to do this at that moment?"
- "What alternatives did you consider?"
- "What made you choose this solution?"
- "What would have happened if you couldn't do this?"

**Job Statement Format**:
"When [situation], I want to [motivation], so I can [expected outcome]."

**Output**: JTBD analysis with job statements, outcomes, and product implications

---

#### 7. Persona Development Skill

**Purpose**: Create evidence-based, actionable personas

**File**: `.claude/skills/persona-development.md`

**Capabilities**:
- Research-based persona creation (not assumption-based)
- Persona template and structure
- Psychographic and behavioral segmentation
- Persona validation methodology
- Anti-persona identification (who we're NOT serving)
- Persona evolution tracking

**Persona Template**:
```markdown
# Persona: [Name]

## Photo/Description
[Visual representation or detailed description]

## Demographics
- Age: [range]
- Role: [job title/role]
- Experience: [years in field]
- Tech savviness: [1-10]

## Goals & Motivations
- Primary goal: [...]
- Secondary goals: [...]
- Motivations: [intrinsic and extrinsic]

## Pain Points & Frustrations
- [Pain point 1]: [severity: High/Med/Low]
- [Pain point 2]: [severity]

## Behaviors & Habits
- How they currently solve this problem: [...]
- Tools they use: [...]
- Decision-making process: [...]

## Jobs-to-be-Done
- Functional job: [...]
- Emotional job: [...]
- Social job: [...]

## Quotes (from research)
"[Direct quote from user interviews]"

## Success Criteria
- How they define success: [...]
- Metrics they care about: [...]

## Product Implications
- Features they need: [...]
- UX priorities: [...]
- Messaging: [...]
```

**Validation**: Ensure persona is backed by research data, not assumptions

---

#### 8. UX Heuristic Evaluation Skill

**Purpose**: Systematically evaluate UX quality

**File**: `.claude/skills/ux-heuristic-evaluation.md`

**Capabilities**:
- Nielsen's 10 Usability Heuristics application
- Heuristic evaluation scoring
- Severity rating (cosmetic, minor, major, catastrophic)
- Accessibility heuristics (WCAG compliance)
- Mobile-specific heuristics
- AI interface heuristics

**Nielsen's 10 Heuristics**:
1. Visibility of system status
2. Match between system and real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize, diagnose, and recover from errors
10. Help and documentation

**Evaluation Process**:
1. Walk through interface systematically
2. Apply each heuristic
3. Document violations with severity
4. Provide specific recommendations
5. Prioritize fixes by severity × frequency

**Output**: Heuristic evaluation report with findings and priorities

---

#### 9. Journey Mapping & Pain Point Analysis Skill

**Purpose**: Visualize user experience end-to-end

**File**: `.claude/skills/journey-mapping.md`

**Capabilities**:
- Customer journey map creation
- Touchpoint identification
- Emotion mapping (moments of delight/frustration)
- Pain point severity assessment
- Opportunity identification
- Service blueprint creation (for service design)

**Journey Map Structure**:
```markdown
# User Journey: [Scenario]

## Persona: [Name]
## Goal: [What they're trying to accomplish]

### Stage 1: [Awareness/Discovery]
- **Actions**: [What user does]
- **Touchpoints**: [Where they interact]
- **Thoughts**: [What they're thinking]
- **Emotions**: 😊 😐 😞 😡
- **Pain Points**: [What frustrates them]
- **Opportunities**: [How we can improve]

### Stage 2: [Consideration]
[Same structure...]

### Stage 3: [Decision]
[Same structure...]

### Stage 4: [Usage]
[Same structure...]

### Stage 5: [Advocacy/Retention]
[Same structure...]

## Key Insights
- **Critical pain points**: [...]
- **Moments of delight**: [...]
- **Biggest opportunities**: [...]

## Recommendations
[Prioritized improvements...]
```

---

## Skill Integration into Agents

### How to Use Skills

**For Researcher Agent**:
Add to researcher.md workflow:
```markdown
### Using Research Skills

Before beginning research:
1. Identify which skill(s) apply to this research question
2. Use skill to structure research approach
3. Follow skill framework rigorously
4. Output results in skill-specified format

Example:
- Market sizing needed? → Use `market-sizing` skill
- Competitor analysis? → Use `competitive-intelligence` skill
- Consumer behavior? → Use `consumer-psychology` skill
- Trend forecasting? → Use `trend-analysis` skill
```

**For Designer Agent**:
Add to designer.md workflow:
```markdown
### Using UX Research Skills

When conducting UX research:
1. Select appropriate research method using `user-research-methods` skill
2. Use `jtbd-framework` skill for understanding user motivations
3. Create personas with `persona-development` skill
4. Map journeys with `journey-mapping` skill
5. Evaluate UX with `ux-heuristic-evaluation` skill
```

---

## Advanced Research Capabilities

### Critical Thinking Frameworks

Both agents should apply these critical thinking frameworks:

#### 1. Bias Detection & Mitigation
- **Confirmation bias**: Seeking only supporting evidence
- **Selection bias**: Non-representative samples
- **Anchoring bias**: Over-relying on first information
- **Recency bias**: Over-weighting recent data
- **Survivorship bias**: Only studying successes

**Mitigation**:
- Actively seek disconfirming evidence
- Use random, representative samples
- Consider multiple data sources
- Question assumptions explicitly

#### 2. Triangulation
Validate findings through multiple independent sources:
- **Data triangulation**: Multiple data sources
- **Method triangulation**: Multiple research methods
- **Theory triangulation**: Multiple frameworks
- **Investigator triangulation**: Multiple researchers (if available)

#### 3. Hypothesis-Driven Research
1. **Form hypothesis**: "We believe [X] because [Y]"
2. **Define evidence**: "We would validate this if we see [Z]"
3. **Collect data**: Using appropriate methods
4. **Analyze objectively**: What does data actually say?
5. **Conclude**: Validate, invalidate, or refine hypothesis

---

## Research Quality Standards

### For Researcher Agent

**High-Quality Market Research Includes**:
- [ ] Multiple data sources (≥ 3 independent sources)
- [ ] Confidence levels documented (High/Medium/Low)
- [ ] Assumptions explicitly stated
- [ ] Alternative explanations considered
- [ ] Limitations acknowledged
- [ ] Data recency noted (when was this published?)
- [ ] Sample sizes and methodologies documented
- [ ] Bias assessment performed

### For Designer Agent

**High-Quality UX Research Includes**:
- [ ] Adequate sample size (≥ 5 for qualitative, ≥ 100 for quantitative)
- [ ] Recruitment criteria documented
- [ ] Research method appropriate for question
- [ ] Interview/survey scripts included
- [ ] Raw data or quotes as evidence
- [ ] Patterns identified across participants
- [ ] Outliers acknowledged
- [ ] Research limitations noted

---

## Skill Implementation Guide

### Option 1: Create Claude Code Skills (Recommended)

If using Claude Code, create skills in `.claude/skills/` directory:

**Structure**:
```markdown
---
name: competitive-intelligence
description: "Research skills and recommendations for agent-based workflows."
description: Systematic competitor analysis framework
---

[Skill content with frameworks, templates, process]
```

### Option 2: Embed in Agent Prompts

Alternatively, add skill content directly to agent markdown files:

**In researcher.md**:
Add appendix section with frameworks:
```markdown
## Research Frameworks & Methods

### Competitive Intelligence Framework
[Framework content...]

### Market Sizing Framework
[Framework content...]
```

### Option 3: Reference Documentation

Create reference docs that agents consult:

**In `/docs/market-research/reference/`**:
- `competitive-intelligence-framework.md`
- `market-sizing-methodology.md`
- `consumer-psychology-frameworks.md`

**In `/docs/ux/reference/`**:
- `user-research-methodologies.md`
- `jtbd-framework-guide.md`
- `persona-development-guide.md`
- `heuristic-evaluation-guide.md`

---

## Immediate Actions

To make researcher and designer world-class:

**Short-term** (Week 1):
1. Create reference documentation for key frameworks
2. Add critical thinking guidance to agent prompts
3. Establish research quality standards
4. Create research report templates with frameworks embedded

**Medium-term** (Month 1):
5. Develop Claude skills for key capabilities
6. Train team on using skills effectively
7. Review research outputs for quality
8. Iterate on frameworks based on learnings

**Long-term** (Quarter 1):
9. Build library of reusable research artifacts
10. Establish research excellence metrics
11. Continuous improvement of methodologies
12. Knowledge sharing across projects

---

## Success Metrics

Track research quality through:

**Researcher Agent**:
- Data source diversity (# of sources consulted)
- Confidence level accuracy (predictions vs. reality)
- Market sizing accuracy (vs. later validation)
- Competitive intel actionability (insights → product changes)
- Research depth score (methodology rigor)

**Designer Agent**:
- Sample size adequacy (meeting minimums)
- Research-to-design traceability (% designs backed by research)
- User validation rate (% designs validated with users)
- Pain point discovery rate (new insights per study)
- Persona accuracy (how well they predict user behavior)

---

## Recommended Learning Resources

For continuous skill development:

**Market Research**:
- "Crossing the Chasm" by Geoffrey Moore
- "Blue Ocean Strategy" by Kim & Mauborgne
- "The Mom Test" by Rob Fitzpatrick
- CB Insights research methodology

**UX Research**:
- "The User Experience Team of One" by Leah Buley
- "Just Enough Research" by Erika Hall
- "Interviewing Users" by Steve Portigal
- Nielsen Norman Group articles
- IDEO design thinking methodology

---

## Conclusion

World-class research requires:
1. **Rigorous methodologies** (frameworks and processes)
2. **Critical thinking** (bias detection, triangulation, hypothesis testing)
3. **Domain expertise** (market research and UX research best practices)
4. **Clear communication** (insights → actionable recommendations)

By implementing these skills and frameworks, the researcher and designer agents will conduct research that is:
- **Credible**: Backed by data and methodology
- **Actionable**: Translates into product decisions
- **Unbiased**: Acknowledges limitations and alternatives
- **Comprehensive**: Covers all relevant dimensions
- **Insightful**: Reveals non-obvious patterns

This elevates the entire discovery-to-delivery workflow, ensuring products are built on solid research foundations.
