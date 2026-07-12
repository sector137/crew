#!/usr/bin/env bash
# check-plugin-update.sh — SessionStart hook.
# Notify-only nudge when this plugin install is behind its marketplace.
# Reads local JSON only: no network, no `claude` CLI. Never blocks. exit 0 always.
#
# Output contract: SessionStart shows stdout in the transcript. There is no
# additionalContext field in this Claude Code build, so we print plain text.
set -uo pipefail

STAMP="${TMPDIR:-/tmp}/claude-sector137-update-check"
THROTTLE=86400   # 24h in seconds

# Throttle: skip if we already checked within THROTTLE seconds.
if [ -f "$STAMP" ]; then
  now=$(date +%s)
  then=$(stat -f %m "$STAMP" 2>/dev/null || stat -c %Y "$STAMP" 2>/dev/null || echo 0)
  [ $((now - then)) -lt "$THROTTLE" ] && exit 0
fi
# Stamp first, so a crash below still throttles the next session.
: > "$STAMP" 2>/dev/null || true

command -v jq >/dev/null 2>&1 || exit 0

PLUGINS_DIR="$HOME/.claude/plugins"
INSTALLED="$PLUGINS_DIR/installed_plugins.json"
MARKETS="$PLUGINS_DIR/known_marketplaces.json"
[ -r "$INSTALLED" ] && [ -r "$MARKETS" ] || exit 0

# The running instance's root IS its installPath in installed_plugins.json.
ROOT="${CLAUDE_PLUGIN_ROOT:-}"
[ -n "$ROOT" ] || exit 0
ROOT="$(cd "$ROOT" 2>/dev/null && pwd -P)" || exit 0

# Resolve name@marketplace + installed version by matching installPath.
read -r PLUGIN_KEY INSTALLED_VER < <(
  jq -r --arg root "$ROOT" '
    .plugins // {} | to_entries[]
    | .key as $k | .value[]
    | select((.installPath // "") | rtrimstr("/") == ($root | rtrimstr("/")))
    | "\($k) \(.version // "")"
  ' "$INSTALLED" 2>/dev/null | head -1
) || exit 0
[ -n "${PLUGIN_KEY:-}" ] && [ -n "${INSTALLED_VER:-}" ] || exit 0

PLUGIN_NAME="${PLUGIN_KEY%@*}"
MARKET_NAME="${PLUGIN_KEY##*@}"

# Only nudge for published marketplaces. A directory marketplace is a local dev
# checkout — the developer is the update source, so stay silent.
SRC_TYPE=$(jq -r --arg m "$MARKET_NAME" '.[$m].source.source // ""' "$MARKETS" 2>/dev/null)
[ -n "$SRC_TYPE" ] || exit 0
[ "$SRC_TYPE" = "directory" ] && exit 0

# Latest available = version in the refreshed marketplace clone.
INSTALL_LOC=$(jq -r --arg m "$MARKET_NAME" '.[$m].installLocation // ""' "$MARKETS" 2>/dev/null)
[ -n "$INSTALL_LOC" ] || exit 0
MARKET_JSON="$INSTALL_LOC/.claude-plugin/marketplace.json"
[ -r "$MARKET_JSON" ] || exit 0   # clone absent or stale -> silent

AVAILABLE_VER=$(jq -r --arg n "$PLUGIN_NAME" \
  '.plugins[]? | select(.name == $n) | .version // empty' "$MARKET_JSON" 2>/dev/null | head -1)
[ -n "${AVAILABLE_VER:-}" ] || exit 0

# Pure-bash semver: return 0 iff $1 < $2 (strictly older). Avoids sort -V, which
# mis-sorts across platforms (and 0.11.0 vs 0.3.0 is the classic trap).
ver_lt() {
  [ "$1" = "$2" ] && return 1
  local IFS=.
  local -a a=($1) b=($2)
  local i x y
  for i in 0 1 2; do
    x=${a[i]:-0}; y=${b[i]:-0}
    x=${x%%[^0-9]*}; y=${y%%[^0-9]*}   # drop any pre-release suffix
    x=${x:-0}; y=${y:-0}
    [ "$x" -lt "$y" ] 2>/dev/null && return 0
    [ "$x" -gt "$y" ] 2>/dev/null && return 1
  done
  return 1
}

if ver_lt "$INSTALLED_VER" "$AVAILABLE_VER"; then
  echo ""
  echo "Sal's Crew update available: v${INSTALLED_VER} installed, v${AVAILABLE_VER} in the ${MARKET_NAME} marketplace."
  echo "Run /sector137:update to review the changelog and update. Restart Claude Code after."
fi
exit 0
