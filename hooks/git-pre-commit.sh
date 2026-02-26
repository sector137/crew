#!/bin/bash
# git-pre-commit.sh — Git pre-commit hook
# Install: ln -sf ~/.claude/hooks/git-pre-commit.sh /path/to/project/.git/hooks/pre-commit
# Or global: git config --global core.hooksPath ~/.claude/hooks/git-hooks/
#
# Calls quality-gate-checks.sh in git mode (exits non-zero on CRITICAL issues).

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Handle symlink: resolve to the actual script location
if [ -L "$0" ]; then
  REAL_PATH="$(readlink "$0")"
  # If relative symlink, resolve from the symlink's directory
  if [[ "$REAL_PATH" != /* ]]; then
    REAL_PATH="$SCRIPT_DIR/$REAL_PATH"
  fi
  SCRIPT_DIR="$(cd "$(dirname "$REAL_PATH")" && pwd)"
fi

CHECKS_SCRIPT="$SCRIPT_DIR/quality-gate-checks.sh"

if [ ! -f "$CHECKS_SCRIPT" ]; then
  # If checks script not found, don't block the commit
  exit 0
fi

exec bash "$CHECKS_SCRIPT" --mode git
