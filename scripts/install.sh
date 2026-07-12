#!/usr/bin/env bash
set -e

PACKAGE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CLAUDE_DIR="$HOME/.claude"
AGENTS_DIR="$CLAUDE_DIR/agents"
LOCAL_MARKETPLACE_DIR="$CLAUDE_DIR/local-marketplace"

echo "@sector137/agent-system install"
echo "  Package: $PACKAGE_DIR"
echo "  Target:  $CLAUDE_DIR"
echo ""

# --- Sal's Crew ---
# Small crew, deep space. Five specialists + a conductor.
# All crew agents namespaced under /sector137: via the sector137 plugin.
#
# Agent directory names and skill names share the same /role-firstname convention.
# Agents install as ~/.claude/agents/{name}.md (file symlinks → SKILL.md)
# Skills install via the sector137 plugin → invokable as /sector137:{name}
#
# THE CREW:
#   product-margot   (Margot Flux)     — Product strategy + market intel
#   engineering-kael (Kael Deepstack)  — Architecture + quality + security + reliability + AI/ML
#   design-wren      (Wren Glasswork)  — UX design + taste authority
#   sales-harlan     (Harlan Closer)   — Sales + GTM + account management
#   hr-mira          (Mira Strand)     — Crew coach, performance review, Langfuse telemetry
#   conductor-sal    (Software Sal)    — Pipeline conductor, self-monitoring, team orchestration
#
# RETIRED (absorbed into the active crew):
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
  TARGET="$PACKAGE_DIR/agents/${agent}.md"

  if [ ! -f "$TARGET" ]; then
    echo "  Warning: agent definition not found: $agent"
    continue
  fi

  rm -f "$LINK"
  ln -s "$TARGET" "$LINK"
  echo "  ~/.claude/agents/${agent}.md → $TARGET"
done

# --- sector137 Plugin ---

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
  "ohm-ohm-visual-prompt"
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
  # Crew agents (moved to sector137 plugin)
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

# Register the sector137 plugin via the Claude Code plugin CLI.
#
# How it works:
#   1. Creates ~/.claude/local-marketplace/ with marketplace manifest + plugin symlink
#   2. Registers the marketplace with: claude plugin marketplace add
#   3. Installs/updates the sector137 plugin with: claude plugin install/update sector137@local
#   4. Keeps the marketplace symlink so Claude Code can validate the source at startup
#
# After install, restart Claude Code — skills appear as /sector137:{name}

if ! command -v claude &>/dev/null; then
  echo "  Warning: claude CLI not found — skipping sector137 plugin registration"
  echo "  Install Claude Code, then re-run this script to enable /sector137: skills"
else
  # Set up local marketplace directory
  mkdir -p "$LOCAL_MARKETPLACE_DIR/.claude-plugin"
  mkdir -p "$LOCAL_MARKETPLACE_DIR/plugins"

  # Write marketplace manifest (preserving any existing non-sector137 plugins)
  EXISTING_PLUGINS=""
  if [ -f "$LOCAL_MARKETPLACE_DIR/.claude-plugin/marketplace.json" ]; then
    EXISTING_PLUGINS=$(python3 -c "
import json, sys
try:
    with open('$LOCAL_MARKETPLACE_DIR/.claude-plugin/marketplace.json') as f:
        data = json.load(f)
    others = [p for p in data.get('plugins', []) if p.get('name') != 'sector137']
    if others:
        # Output as JSON array entries (without surrounding brackets)
        for i, p in enumerate(others):
            prefix = ',' if i > 0 else ''
            sys.stdout.write(prefix + json.dumps(p, indent=6))
except: pass
" 2>/dev/null)
  fi

  if [ -n "$EXISTING_PLUGINS" ]; then
    cat > "$LOCAL_MARKETPLACE_DIR/.claude-plugin/marketplace.json" << MARKETPLACE_EOF
{
  "\$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "local",
  "description": "Local plugins",
  "owner": {
    "name": "local"
  },
  "plugins": [
    {
      "name": "sector137",
      "description": "Sal's Crew — personal agent system. All crew agents namespaced under /sector137:",
      "author": {
        "name": "sector137"
      },
      "source": "./plugins/sector137",
      "category": "productivity"
    },$EXISTING_PLUGINS
  ]
}
MARKETPLACE_EOF
  else
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
      "name": "sector137",
      "description": "Sal's Crew — personal agent system. All crew agents namespaced under /sector137:",
      "author": {
        "name": "sector137"
      },
      "source": "./plugins/sector137",
      "category": "productivity"
    }
  ]
}
MARKETPLACE_EOF
  fi

  # Create/update permanent symlink plugins/sector137 → this package
  # This symlink must remain so Claude Code can validate the marketplace source at startup.
  ln -sfn "$PACKAGE_DIR" "$LOCAL_MARKETPLACE_DIR/plugins/sector137"
  echo "  Marketplace symlink: $LOCAL_MARKETPLACE_DIR/plugins/sector137 → $PACKAGE_DIR"

  # Register marketplace (idempotent — safe to run multiple times)
  claude plugin marketplace add "$LOCAL_MARKETPLACE_DIR" 2>/dev/null || true
  echo "  Local marketplace: $LOCAL_MARKETPLACE_DIR"

  # Install or update sector137 plugin (copies to cache)
  CACHE_DIR="$CLAUDE_DIR/plugins/cache/local/sector137"
  if [ -d "$CACHE_DIR" ]; then
    claude plugin update sector137@local 2>/dev/null \
      && echo "  sector137@local updated (cache refreshed)" \
      || echo "  Warning: could not update sector137@local"
  else
    claude plugin install sector137@local 2>/dev/null \
      && echo "  sector137@local installed" \
      || echo "  Warning: could not install sector137@local"
  fi
fi

# --- Hooks ---
# Hooks are auto-discovered from the plugin's own hooks/hooks.json (commands
# resolve against ${CLAUDE_PLUGIN_ROOT}), so no symlinking is needed. Clean up
# any symlinks a previous install created under ~/.claude/hooks/, but only ones
# that point back into this repo — never touch the user's own hook files.

HOOKS_SRC="$PACKAGE_DIR/hooks"
HOOKS_DIR="$CLAUDE_DIR/hooks"

if [ -d "$HOOKS_DIR" ]; then
  for link in "$HOOKS_DIR"/*.sh "$HOOKS_DIR/hooks.json"; do
    [ -L "$link" ] || continue
    target="$(readlink "$link")"
    case "$target" in
      "$HOOKS_SRC/"*) rm -f "$link"; echo "  removed stale hook symlink: $link" ;;
    esac
  done
fi

echo ""
echo "✓ @sector137/agent-system installed"
echo "  Agents: 5 (design-wren, engineering-kael, product-margot, sales-harlan, hr-mira)"
echo "  Plugin: sector137@local (via local marketplace)"
echo "  Hooks: auto-discovered from the plugin (no ~/.claude/hooks symlinks)"
echo "  Invoke: /sector137:sal | /sector137:wren | /sector137:kael | /sector137:margot | /sector137:harlan | /sector137:mira"
echo ""
echo "  Restart Claude Code to activate."
