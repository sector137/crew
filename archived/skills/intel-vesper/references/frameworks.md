# Market Research Frameworks Reference

## Competitive Analysis

### Competitive Positioning Matrix

Plot competitors on two axes that matter for your market (choose axes that reveal differentiation, not just describe it).

**Common axis pairs**:
- Price (low → high) × Breadth (point solution → platform)
- Enterprise (SMB → enterprise) × Technical depth (simple → complex)
- Speed-to-value (slow → fast) × Customization (rigid → flexible)

**How to build it**:
1. List all relevant competitors (direct, indirect, adjacent)
2. Choose 2 axes that your target customers actually use to make decisions
3. Place each competitor based on evidence (pricing pages, positioning copy, customer reviews)
4. Identify white space — quadrants with no competitor, or underserved positions

**White space test**: Is the white space empty because no one has seen the opportunity, or because customers don't actually want it?

---

### Porter's Five Forces

Framework for assessing the structural attractiveness of a market.

| Force | Questions to answer |
|-------|-------------------|
| **Threat of new entrants** | How easy is it to start competing? What are the barriers (capital, regulation, network effects, brand)? |
| **Bargaining power of suppliers** | Do you depend on key suppliers who can raise prices or withhold supply? |
| **Bargaining power of buyers** | Can customers easily switch? Do large customers have pricing leverage? |
| **Threat of substitutes** | What do customers do instead of using your category? How strong is the pull? |
| **Competitive rivalry** | How intense is competition among existing players? Are margins being eroded? |

**Interpretation**: More favorable = lower forces across all five dimensions. High competitive rivalry + low switching costs = commoditizing market.

---

### Competitive Feature Matrix

Use for specific feature-level comparison when product decisions depend on competitive parity vs. differentiation.

```
| Feature / Capability | Us | Competitor A | Competitor B | Competitor C |
|---------------------|-----|-------------|-------------|-------------|
| [Feature 1]         | ✓   | ✓           | ✗           | ✓           |
| [Feature 2]         | ✗   | ✓           | ✓           | ✗           |
| [Feature 3]         | ✓   | ✗           | ✗           | ✗           |
```

**Warning**: Feature matrices become weapons for feature-parity thinking. Use them to identify table-stakes requirements, but don't use them to drive roadmap. Users don't switch for features — they switch for outcomes.

---

### Win/Loss Analysis Framework

When you have customer data on why deals were won or lost:

**Question categories**:
- Why did they choose us/them? (stated reason)
- What alternatives did they evaluate?
- What was the deciding factor?
- What almost made them choose differently?
- What do they wish we had that we don't?

**Analysis**: Group responses by theme. Weight by deal size if B2B. Look for patterns: consistent "we lost on X" signals a real gap; inconsistent signals noise.

---

## Market Sizing

### The Three Methods

Always use at least two methods and compare. If they disagree significantly, find out why.

#### Top-Down (Market share method)

```
Industry market size (from reports)
× Relevant segment %
× Expected/aspirational market share %
= Your SOM
```

**Weakness**: Industry reports are often wrong, outdated, or use definitions that don't match your actual market.

#### Bottom-Up (Unit economics method)

```
Number of potential customers (actual count or estimate)
× Average revenue per customer
= Your SAM
```

**Strength**: Forces you to define who you're actually selling to and at what price.

**Example**:
- 50,000 SMB accounting firms in the US
- × $200/month average price
- × 12 months
= $120M SAM

**Then apply realism**: What % can you realistically reach? What % will convert? = SOM

#### Comparables method

Find companies with similar business models in similar markets. What did they claim their TAM was at your stage? What did they eventually reach? Use as a sanity check.

---

### TAM / SAM / SOM Definitions

| Term | Definition | Common mistake |
|------|-----------|----------------|
| **TAM** (Total Addressable Market) | All revenue if you had 100% market share of everyone who could ever buy | Defining TAM too broadly ("everyone with a computer") |
| **SAM** (Serviceable Addressable Market) | The slice of TAM your business model can actually serve | Assuming you can serve all TAM without constraint |
| **SOM** (Serviceable Obtainable Market) | Realistic share of SAM you can capture in a defined timeframe | Under- or over-estimating competitive dynamics |

**Investor perspective**: They care most about SOM in a 3-5 year horizon. SAM sets the ceiling. TAM tells the story of long-term potential.

---

### Market Sizing Sanity Checks

Before presenting market sizing:
1. Does the total number of customers make intuitive sense?
2. Is the price point consistent with what customers actually pay?
3. Have you excluded TAM you genuinely can't reach (wrong geography, wrong segment, regulatory barriers)?
4. Is the growth rate assumption supported by underlying drivers?
5. How does this compare to what funded competitors have claimed?

---

## Positioning & Differentiation

### Positioning Statement Template

```
For [target customer],
who [has this problem or need],
[Product name] is a [category]
that [key benefit / differentiated value].
Unlike [primary alternative],
our product [key differentiator].
```

**Test of a good positioning statement**: Read it to someone in your target market. If they say "that sounds like [competitor]" — your differentiation isn't landing. If they say "how is that different from [X]?" — you haven't answered the comparison that's already in their head.

---

### Jobs-to-be-Done Competitive Analysis

Instead of comparing features, compare which jobs each competitor is optimized for.

```
| Competitor | Primary job they're hired for | Secondary jobs | Jobs they ignore |
|------------|------------------------------|----------------|-----------------|
| Competitor A | [functional job, stated clearly] | ... | ... |
```

**Insight**: If multiple competitors are hired for the same job, that's competitive intensity. If there's a common job nobody serves well, that's an opportunity.

---

### Switching Cost Analysis

Why do customers stay, even when they're unhappy?

| Switching cost type | Example | Implication |
|--------------------|---------|-------------|
| **Data lock-in** | All your history is in there | Build import tools; attack with migration support |
| **Integration lock-in** | Connected to 20 other tools | Build better integrations first; lower the switching cost |
| **Learning investment** | Team trained on the current tool | Lower your learning curve; offer migration support |
| **Contract lock-in** | Annual contract signed | Target companies approaching renewal |
| **Network effects** | Their clients/team use it | Need critical mass in their ecosystem first |

---

## Trend Analysis

### Technology S-Curve

Every technology follows an S-curve: slow adoption → exponential growth → plateau.

**Key question**: Where on the S-curve is the technology / market you're entering?
- Early (before inflection): long road, high risk, potential for category creation
- At inflection: explosive growth, fast-follower opportunity, requires speed
- Late (plateau): commoditization, compete on price/distribution, hard to disrupt

### Regulatory Signal Watching

For regulated industries, regulatory changes often precede market shifts by 1-3 years. Track:
- Proposed rules and comment periods
- Enforcement actions (signals where scrutiny is increasing)
- Industry self-regulation efforts (often pre-empting government action)

### Consumer Behavior Signals

Leading indicators that behavior is shifting:
- Google Trends for search volume changes
- App store reviews mentioning "used to use X but switched because..."
- Reddit / community forum discussions about frustrations with incumbents
- Job posting analysis (companies hiring for new capabilities = market shift incoming)
