#!/bin/bash
# ui-change-tracker.sh — PostToolUse hook for Write and Edit
# Silently tracks UI file edits (.tsx/.jsx/.css). After 5+ unique files,
# outputs a one-time nudge to run /sector137-studio:wren for a design review.

set -euo pipefail

INPUT=$(cat)
TRACKER_FILE="/tmp/claude-ui-changes-$$"
NUDGE_FILE="/tmp/claude-ui-nudge-sent-$$"

# Use parent PID as session identifier (Claude Code process)
SESSION_ID=$(ps -o ppid= $$ 2>/dev/null | tr -d ' ' || echo "unknown")
TRACKER_FILE="/tmp/claude-ui-changes-${SESSION_ID}"
NUDGE_FILE="/tmp/claude-ui-nudge-sent-${SESSION_ID}"

# If we already sent the nudge, exit silently
if [ -f "$NUDGE_FILE" ]; then
  exit 0
fi

# Extract the file path from tool_input
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // empty' 2>/dev/null)

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only track UI-related files
if ! echo "$FILE_PATH" | grep -qE '\.(tsx|jsx|css|scss|module\.css)$'; then
  exit 0
fi

# Append file to tracker (create if needed)
echo "$FILE_PATH" >> "$TRACKER_FILE"

# Count unique UI files modified
UNIQUE_COUNT=$(sort -u "$TRACKER_FILE" | wc -l | tr -d ' ')

if [ "$UNIQUE_COUNT" -ge 5 ]; then
  # Mark nudge as sent
  touch "$NUDGE_FILE"
  echo ""
  echo "📐 $UNIQUE_COUNT UI files modified this session. Consider running /sector137-studio:wren (sector137-studio plugin) for a design review before committing."
fi

exit 0
