#!/bin/bash
# quality-gate-checks.sh — Shared quality checking logic
# Called by both pre-commit-quality-gate.sh (Claude) and git-pre-commit.sh (Git)
#
# Usage: quality-gate-checks.sh --mode claude|git
#   claude mode: soft warnings, always exit 0
#   git mode: exit 1 on CRITICAL issues (blocks commit)

set -euo pipefail

MODE="claude"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --mode) MODE="$2"; shift 2 ;;
    *) shift ;;
  esac
done

# Get staged files (only added/modified, not deleted)
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM 2>/dev/null || true)

if [ -z "$STAGED_FILES" ]; then
  exit 0
fi

# Filter to relevant file types
TSX_JSX_FILES=$(echo "$STAGED_FILES" | grep -E '\.(tsx|jsx|ts|js)$' || true)
CSS_FILES=$(echo "$STAGED_FILES" | grep -E '\.(css|scss|module\.css)$' || true)
ALL_CODE_FILES="$TSX_JSX_FILES"

if [ -z "$ALL_CODE_FILES" ]; then
  exit 0
fi

CRITICAL=()
HIGH=()
MEDIUM=()

# Read staged content for each file
while IFS= read -r file; do
  [ -z "$file" ] && continue
  [ ! -f "$file" ] && continue

  CONTENT=$(git diff --cached --unified=0 -- "$file" | grep '^+' | grep -v '^+++' || true)
  FULL_CONTENT=$(git show ":$file" 2>/dev/null || true)

  if [ -z "$CONTENT" ]; then
    continue
  fi

  # --- Debug Artifacts (CRITICAL) ---
  if echo "$CONTENT" | grep -qE '^\+.*console\.(log|debug|info)\('; then
    CRITICAL+=("$file: console.log/debug left in staged code")
  fi

  if echo "$CONTENT" | grep -qE '^\+.*\bdebugger\b'; then
    CRITICAL+=("$file: debugger statement left in staged code")
  fi

  # --- Vercel Anti-Patterns (HIGH) ---
  # Barrel imports (importing from index files in large dirs)
  if echo "$CONTENT" | grep -qE "^\+.*from ['\"]\.\.?/(components|lib|utils|hooks)['\"]"; then
    HIGH+=("$file: Barrel import detected — import from specific files instead of index")
  fi

  # Sequential awaits that could be Promise.all
  AWAIT_COUNT=$(echo "$CONTENT" | grep -cE '^\+.*await\s+' || true)
  if [ "$AWAIT_COUNT" -ge 3 ]; then
    HIGH+=("$file: $AWAIT_COUNT sequential awaits — consider Promise.all() for independent operations")
  fi

  # Missing next/dynamic for heavy components
  if echo "$CONTENT" | grep -qE "^\+.*import.*from ['\"](@?react-)?chart|recharts|mapbox|monaco-editor|@uiw/react-md-editor"; then
    if ! echo "$FULL_CONTENT" | grep -qE "next/dynamic|React\.lazy"; then
      HIGH+=("$file: Heavy library imported without dynamic() — use next/dynamic for code splitting")
    fi
  fi

  # --- Accessibility (MEDIUM) ---
  # Images without alt
  if echo "$CONTENT" | grep -qE '^\+.*<img\s' | head -1 >/dev/null 2>&1; then
    if echo "$CONTENT" | grep -E '^\+.*<img\s' | grep -qvE 'alt='; then
      MEDIUM+=("$file: <img> without alt attribute")
    fi
  fi

  # onClick without keyboard handler
  if echo "$CONTENT" | grep -qE '^\+.*onClick='; then
    LINE=$(echo "$CONTENT" | grep -E '^\+.*onClick=' | head -1)
    if ! echo "$LINE" | grep -qE 'onKeyDown=|onKeyUp=|onKeyPress=|role=.*button|<button|<a\s|<Link'; then
      MEDIUM+=("$file: onClick without keyboard handler — add onKeyDown or use <button>")
    fi
  fi

  # Icon buttons missing aria-label
  if echo "$CONTENT" | grep -qE '^\+.*<(button|IconButton).*>.*<.*Icon'; then
    LINE=$(echo "$CONTENT" | grep -E '^\+.*<(button|IconButton)' | head -1)
    if ! echo "$LINE" | grep -qE 'aria-label='; then
      MEDIUM+=("$file: Icon button may be missing aria-label")
    fi
  fi

done <<< "$ALL_CODE_FILES"

# --- Output ---
TOTAL=$((${#CRITICAL[@]} + ${#HIGH[@]} + ${#MEDIUM[@]}))

if [ "$TOTAL" -eq 0 ]; then
  exit 0
fi

echo ""
echo "⚡ Quality Gate — $TOTAL issue(s) found in staged files"
echo ""

if [ ${#CRITICAL[@]} -gt 0 ]; then
  echo "🔴 CRITICAL (${#CRITICAL[@]}):"
  for issue in "${CRITICAL[@]}"; do
    echo "  • $issue"
  done
  echo ""
fi

if [ ${#HIGH[@]} -gt 0 ]; then
  echo "🟠 HIGH (${#HIGH[@]}):"
  for issue in "${HIGH[@]}"; do
    echo "  • $issue"
  done
  echo ""
fi

if [ ${#MEDIUM[@]} -gt 0 ]; then
  echo "🟡 MEDIUM (${#MEDIUM[@]}):"
  for issue in "${MEDIUM[@]}"; do
    echo "  • $issue"
  done
  echo ""
fi

if [ "$MODE" = "git" ] && [ ${#CRITICAL[@]} -gt 0 ]; then
  echo "❌ Commit blocked — fix CRITICAL issues first (or use --no-verify to skip)"
  exit 1
fi

if [ "$MODE" = "claude" ]; then
  echo "💡 Run /sector137-studio:wren (sector137-studio plugin) for a deeper design review"
fi

exit 0
