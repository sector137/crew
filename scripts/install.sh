#!/usr/bin/env bash
set -e

PACKAGE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CLAUDE_DIR="$HOME/.claude"
AGENTS_DIR="$CLAUDE_DIR/agents"
LOCAL_MARKETPLACE_DIR="$CLAUDE_DIR/local-marketplace"

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
# Skills install via the ohm plugin → invokable as /ohm:{name}
#
# THE CREW:
#   product-margot   (Margot Flux)     — Product strategy + market intel
#   engineering-kael (Kael Deepstack)  — Architecture + quality + security + reliability + AI/ML
#   design-wren      (Wren Glasswork)  — UX design + taste authority
#   sales-harlan     (Harlan Closer)   — Sales + GTM + account management
#   hr-mira          (Mira Strand)     — Crew coach, performance review, Langfuse telemetry [behind-the-scenes]
#   conductor-sal    (Software Sal)    — Pipeline conductor, self-monitoring, team orchestration
#
# RETIRED (archived in packages/agent-system/archived/):
#   ai-oracle, gtm-nova, intel-vesper, overseer-nyx, quality-judge, security-cipher, sre-atlas

CREW=(
  "design-wren"
  "engineering-kael"
  "product-margot"
  "sales-harlan"
  "hr-mira"
)

# --- Agents ---

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

# --- ohm Plugin ---

# Clean up the old ~/.claude/.claude-plugin symlink approach (no longer used)
OLD_PLUGIN_SYMLINK="$CLAUDE_DIR/.claude-plugin"
if [ -L "$OLD_PLUGIN_SYMLINK" ]; then
  rm "$OLD_PLUGIN_SYMLINK"
  echo "  Removed legacy ~/.claude/.claude-plugin symlink"
fi

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

# Register the ohm plugin via the Claude Code plugin CLI.
# Uses a local marketplace so Claude Code can properly cache and load the plugin.
#
# How it works:
#   1. Creates ~/.claude/local-marketplace/ as a plugin marketplace directory
#   2. Symlinks plugins/ohm → this package (stays live for updates)
#   3. Registers the marketplace with: claude plugin marketplace add
#   4. Installs (or updates) the ohm plugin with: claude plugin install/update ohm@local
#
# After install, restart Claude Code — skills appear as /ohm:{name}

if ! command -v claude &>/dev/null; then
  echo "  Warning: claude CLI not found — skipping ohm plugin registration"
  echo "  Install Claude Code, then re-run this script to enable /ohm: skills"
else
  # Set up local marketplace directory
  mkdir -p "$LOCAL_MARKETPLACE_DIR/.claude-plugin"
  mkdir -p "$LOCAL_MARKETPLACE_DIR/plugins"

  # Write marketplace manifest
  cat > "$LOCAL_MARKETPLACE_DIR/.claude-plugin/marketplace.json" << 'MARKETPLACE_EOF'
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "local",
  "description": "Local plugins",
  "owner": {
    "name": "local"
  },
  "plugins": [
    {
      "name": "ohm",
      "description": "Sal's Crew — personal agent system. All crew agents namespaced under /ohm:",
      "author": {
        "name": "canonize"
      },
      "source": "./plugins/ohm",
      "category": "productivity"
    }
  ]
}
MARKETPLACE_EOF

  # Point plugins/ohm → this package (symlink stays live, update refreshes the cache)
  ln -sfn "$PACKAGE_DIR" "$LOCAL_MARKETPLACE_DIR/plugins/ohm"

  # Register marketplace (idempotent — safe to run multiple times)
  claude plugin marketplace add "$LOCAL_MARKETPLACE_DIR" 2>/dev/null || true
  echo "  Local marketplace: $LOCAL_MARKETPLACE_DIR"

  # Install or update ohm plugin
  CACHE_DIR="$CLAUDE_DIR/plugins/cache/local/ohm"
  if [ -d "$CACHE_DIR" ]; then
    claude plugin update ohm@local 2>/dev/null \
      && echo "  ohm@local updated (cache refreshed)" \
      || echo "  Warning: could not update ohm@local"
  else
    claude plugin install ohm@local 2>/dev/null \
      && echo "  ohm@local installed" \
      || echo "  Warning: could not install ohm@local"
  fi
fi

echo ""
echo "✓ @canonize/agent-system installed"
echo "  Agents: 5 (design-wren, engineering-kael, product-margot, sales-harlan, hr-mira)"
echo "  Plugin: ohm@local (via local marketplace)"
echo "  Skills: 7 namespaced under /ohm: (crew + conductor-sal + version)"
echo "  Invoke: /ohm:design-wren | /ohm:engineering-kael | /ohm:product-margot | /ohm:sales-harlan | /ohm:hr-mira | /ohm:conductor-sal | /ohm:version"
echo ""
echo "  Restart Claude Code to activate."
