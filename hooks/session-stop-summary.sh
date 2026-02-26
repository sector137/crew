#!/bin/bash
# session-stop-summary.sh — Stop event hook
# Counts Claude responses. At 20 and 40 responses, if there are uncommitted
# changes, suggests running /rig:sal handoff to capture session context.

set -euo pipefail

# Use parent PID as session identifier
SESSION_ID=$(ps -o ppid= $$ 2>/dev/null | tr -d ' ' || echo "unknown")
COUNTER_FILE="/tmp/claude-response-count-${SESSION_ID}"

# Increment counter
COUNT=0
if [ -f "$COUNTER_FILE" ]; then
  COUNT=$(cat "$COUNTER_FILE" 2>/dev/null || echo "0")
fi
COUNT=$((COUNT + 1))
echo "$COUNT" > "$COUNTER_FILE"

# Only nudge at 20 and 40
if [ "$COUNT" -ne 20 ] && [ "$COUNT" -ne 40 ]; then
  exit 0
fi

# Check if we're in a git repo with uncommitted changes
if ! git rev-parse --git-dir &>/dev/null; then
  exit 0
fi

CHANGES=$(git status --porcelain 2>/dev/null | head -1)
if [ -z "$CHANGES" ]; then
  exit 0
fi

echo ""
echo "📋 ${COUNT} responses this session with uncommitted changes. Consider running /rig:sal handoff to capture session context before wrapping up."

exit 0
