set -e

PACKAGE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CLAUDE_DIR="$HOME/.claude"
PLUGIN_DIR="$CLAUDE_DIR/.claude-plugin"
PLUGIN_SKILLS_DIR="$PLUGIN_DIR/skills"

echo "@canonize/agent-system install"
echo "  Package: $PACKAGE_DIR"
echo "  Target:  $CLAUDE_DIR"
echo ""

# --- Sal's Crew (v2.0) ---
# Small crew, deep space. Four specialists + a conductor.
# All crew agents namespaced under /ohm: via the ohm plugin.
#
# Agent directory names and skill names share the same /role-firstname convention.
# Agents install as ~/.claude/agents/{name}.md (file symlinks → SKILL.md)
# Skills install as ~/.claude/.claude-plugin/skills/{name}/ (in the ohm plugin)
# → invokable as /ohm:{name}
#
# THE CREW:
#   product-margot   (Margot Flux)     — Product strategy + market intel
#   engineering-kael (Kael Deepstack)  — Architecture + quality + security + reliability + AI/ML
#   design-wren      (Wren Glasswork)  — UX design + taste authority
#   sales-harlan     (Harlan Closer)   — Sales + GTM + account management
#   conductor-sal    (Software Sal)    — Pipeline conductor, self-monitoring, team orchestration
#
# RETIRED (archived in packages/agent-system/archived/):
#   ai-oracle, gtm-nova, intel-vesper, overseer-nyx, quality-judge, security-cipher, sre-atlas

CREW=(
  "design-wren"
  "engineering-kael"
  "product-margot"
  "sales-harlan"
)

# --- Agents ---
AGENTS_DIR="$CLAUDE_DIR/agents"

# Convert from old symlink-to-directory style if needed
if [ -L "$AGENTS_DIR" ]; then
  echo "  Converting ~/.claude/agents from symlink to real directory"
  rm "$AGENTS_DIR"
  mkdir -p "$AGENTS_DIR"
fi
mkdir -p "$AGENTS_DIR"

# Clean up removed agents from previous installs (old functional names + retired v1 agents)
REMOVED_AGENTS=(
  "ai-engineer"
  "ai-oracle"
  "code-reviewer"
  "data-analyst"
  "designer"
  "executive"
  "gtm"
  "gtm-nova"
  "intel-vesper"
  "ohm-product-design"
  "overseer-nyx"
  "product-manager"
  "project-manager"
  "qa-engineer"
  "quality-judge"
  "researcher"
  "sal"
  "sales"
  "security-cipher"
  "security-engineer"
  "software-sal"
  "sre-atlas"
  "task-executor"
  "tech-lead"
)
for agent in "${REMOVED_AGENTS[@]}"; do
  LINK="$AGENTS_DIR/${agent}.md"
  if [ -L "$LINK" ] || [ -f "$LINK" ]; then
    rm -f "$LINK"
    echo "  Removed legacy agent: ${agent}"
  fi
done

for agent in "${CREW[@]}"; do
  LINK="$AGENTS_DIR/${agent}.md"
  TARGET="$PACKAGE_DIR/${agent}/SKILL.md"

  if [ ! -f "$TARGET" ]; then
    echo "  Warning: agent SKILL.md not found: $agent"
    continue
  fi

  rm -f "$LINK"
  ln -s "$TARGET" "$LINK"
  echo "  ~/.claude/agents/${agent}.md → $TARGET"
done

# --- ohm Plugin Skills ---
# All crew skills install into the ohm plugin → invokable as /ohm:{name}
# Skills = crew (same names) + conductor-sal (pipeline conductor) + version
SKILLS=("${CREW[@]}" "conductor-sal" "version")

# Ensure plugin structure exists with correct name
mkdir -p "$PLUGIN_DIR"
mkdir -p "$PLUGIN_SKILLS_DIR"

# Write plugin.json (idempotent)
cat > "$PLUGIN_DIR/plugin.json" <<'JSON'
{
  "name": "ohm",
  "version": "0.1.0",
  "description": "Sal's Crew — personal agent system for ohmatey. All crew agents namespaced under /ohm:",
  "author": "ohmatey",
  "repository": "https://github.com/ohmatey/ohwhatajourney",
  "created": "2026-02-21"
}
JSON
echo "  ~/.claude/.claude-plugin/plugin.json (name: ohm)"

# Clean up old skill symlinks from ~/.claude/skills/ (moved to plugin)
OLD_SKILLS_DIR="$CLAUDE_DIR/skills"
REMOVED_SKILLS=(
  "ai-engineer"
  "ai-oracle"
  "conductor-sal"
  "designer"
  "executive"
  "gtm"
  "gtm-nova"
  "intel-vesper"
  "overseer-nyx"
  "product-manager"
  "qa-engineer"
  "quality-judge"
  "researcher"
  "sal"
  "sales"
  "security-cipher"
  "security-engineer"
  "software-sal"
  "sre-atlas"
  "tech-lead"
  "uxr"
  "version"
  # Crew agents (moved to ohm plugin)
  "design-wren"
  "engineering-kael"
  "product-margot"
  "sales-harlan"
)
for skill in "${REMOVED_SKILLS[@]}"; do
  LINK="$OLD_SKILLS_DIR/$skill"
  if [ -L "$LINK" ]; then
    rm "$LINK"
    echo "  Removed legacy/moved skill: ${skill}"
  fi
done

# Install crew skills into ohm plugin
for skill in "${SKILLS[@]}"; do
  LINK="$PLUGIN_SKILLS_DIR/$skill"
  TARGET="$PACKAGE_DIR/skills/$skill"

  if [ ! -d "$TARGET" ]; then
    echo "  Warning: skill not found in package: $skill"
    continue
  fi

  if [ -d "$LINK" ] && [ ! -L "$LINK" ]; then
    echo "  Backing up $LINK → $LINK.bak"
    mv "$LINK" "$LINK.bak"
  fi

  [ -L "$LINK" ] && rm "$LINK"
  ln -s "$TARGET" "$LINK"
  echo "  ~/.claude/.claude-plugin/skills/$skill → $TARGET"
done

echo ""
echo "✓ @canonize/agent-system installed"
echo "  Agents: 4 (design-wren, engineering-kael, product-margot, sales-harlan)"
echo "  Skills: 6 namespaced under /ohm: (crew + conductor-sal + version)"
echo "  Invoke: /ohm:design-wren | /ohm:engineering-kael | /ohm:product-margot | /ohm:sales-harlan | /ohm:conductor-sal | /ohm:version"
