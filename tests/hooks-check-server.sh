#!/usr/bin/env bash
# Tests hooks/check-server.sh against fake servers for each state it must tell apart.
# Run: bun run test:hooks
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOOK="$ROOT/hooks/check-server.sh"
WORK="$(mktemp -d)"
PIDS=()
fail=0

cleanup() { for p in "${PIDS[@]:-}"; do kill "$p" 2>/dev/null; done; rm -rf "$WORK"; }
trap cleanup EXIT

# serve CODE -> prints the port of a throwaway server that answers every request with CODE.
serve() {
  local code="$1" port
  port=$(python3 -c 'import socket; s=socket.socket(); s.bind(("127.0.0.1",0)); print(s.getsockname()[1])')
  python3 - "$port" "$code" >/dev/null 2>&1 <<'PY' &
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
port, code = int(sys.argv[1]), int(sys.argv[2])
class H(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(code); self.end_headers()
    def log_message(self, *a): pass
HTTPServer(("127.0.0.1", port), H).serve_forever()
PY
  PIDS+=($!)
  for _ in $(seq 1 40); do nc -z 127.0.0.1 "$port" 2>/dev/null && break; sleep 0.1; done
  echo "$port"
}

# run NAME DIR URL EXPECT_PATTERN  (EXPECT_PATTERN empty = must print nothing)
run() {
  local name="$1" dir="$2" url="$3" want="$4" out status
  out=$(CLAUDE_PROJECT_DIR="$dir" SECTOR137_HEALTH_URL="$url" bash "$HOOK" 2>&1); status=$?
  if [ "$status" -ne 0 ]; then echo "FAIL $name: exit $status"; fail=1; return; fi
  if [ -z "$want" ]; then
    [ -z "$out" ] && echo "ok   $name" || { echo "FAIL $name: expected silence, got: $out"; fail=1; }
  else
    grep -q -- "$want" <<<"$out" && echo "ok   $name" || { echo "FAIL $name: expected /$want/, got: ${out:-<nothing>}"; fail=1; }
  fi
}

PROJ="$WORK/uses-sector137"; mkdir -p "$PROJ/.sector137"
OTHER="$WORK/other-project";  mkdir -p "$OTHER"

run "healthy server is silent"                "$PROJ"  "http://127.0.0.1:$(serve 200)/" ""
run "4xx still means the server is up"        "$PROJ"  "http://127.0.0.1:$(serve 401)/" ""
run "503 is reported with its code"           "$PROJ"  "http://127.0.0.1:$(serve 503)/" "HTTP 503"
run "530 is reported as a tunnel outage"      "$PROJ"  "http://127.0.0.1:$(serve 530)/" "Cloudflare tunnel down"
run "the message rules out an auth problem"   "$PROJ"  "http://127.0.0.1:$(serve 530)/" "not an auth problem"
run "the message points at the offline file"  "$PROJ"  "http://127.0.0.1:$(serve 502)/" "state.json"
run "nothing listening reports no response"   "$PROJ"  "http://127.0.0.1:9/"            "no response"
run "projects without .sector137 stay silent" "$OTHER" "http://127.0.0.1:9/"            ""

# A project without .sector137 must not even try the network: point at a dead URL and time it.
start=$(date +%s)
CLAUDE_PROJECT_DIR="$OTHER" SECTOR137_HEALTH_URL="http://10.255.255.1/" bash "$HOOK" >/dev/null 2>&1
elapsed=$(( $(date +%s) - start ))
if [ "$elapsed" -le 1 ]; then echo "ok   no network attempt outside sector137 projects (${elapsed}s)"; else echo "FAIL took ${elapsed}s outside a sector137 project"; fail=1; fi

[ "$fail" -eq 0 ] && echo "hook tests passed" || echo "hook tests FAILED"
exit "$fail"
