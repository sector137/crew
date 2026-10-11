#!/usr/bin/env bash
# check-server.sh — SessionStart hook.
# Tells the session up front when the Sector137 server is down, so it works
# offline instead of retrying a login that cannot help. Silent when healthy.
#
# Claude Code reports an unreachable server as "needs authentication", and in real
# use sessions retried logins on days when the server was simply down. A
# SessionStart hook's stdout is added to the session's context, so one line here
# replaces that guesswork.
#
# Cheap by design: no network call unless the project actually uses sector137
# (it has a .sector137/ directory), short timeouts, exit 0 always.
set -uo pipefail

DIR="${CLAUDE_PROJECT_DIR:-$PWD}"
[ -d "$DIR/.sector137" ] || exit 0
command -v curl >/dev/null 2>&1 || exit 0

URL="${SECTOR137_HEALTH_URL:-https://app.sector137.io/api/health}"
code=$(curl -s -o /dev/null -w '%{http_code}' --connect-timeout 2 -m 3 "$URL" 2>/dev/null) || code=000
[ -n "$code" ] || code=000

case "$code" in
  000) why="no response" ;;
  530) why="HTTP 530, Cloudflare tunnel down" ;;
  5??) why="HTTP ${code}" ;;
  *)   exit 0 ;;   # any other answer means the server is up
esac

echo ""
echo "sector137 server unreachable (${why}). This is an outage, not an auth problem: do not suggest \`claude mcp login\`."
echo "Skip the sector137 MCP tools and work offline against .sector137/state.json (else .sector137/roadmap.md). Sync with /sector137:init when the server is back."
exit 0
