#!/bin/bash
# pre-commit-quality-gate.sh — Claude Code PreToolUse:Bash hook
# Detects git commit commands and runs quality-gate-checks.sh in claude mode.
# Non-blocking: always exits 0.

set -euo pipefail

INPUT=$(cat)

# Extract command from tool_input
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)

if [ -z "$CMD" ]; then
  exit 0
fi

# Only activate on git commit commands
if ! echo "$CMD" | grep -qE '(^|\s|&&\s*|;\s*)(rtk\s+)?git\s+commit(\s|$)'; then
  exit 0
fi

# Run quality gate checks in claude (soft) mode
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
bash "$SCRIPT_DIR/quality-gate-checks.sh" --mode claude 2>/dev/null || true

exit 0
