#!/usr/bin/env bash
# Link check — keeps docs.sector137.io references honest.
#
# Two checks:
#   1. liveness    — every URL in references/docs-links.md resolves (2xx/3xx).
#                    Set LINK_CHECK_OFFLINE=1 to skip the network and run consistency only.
#   2. consistency — every docs.sector137.io URL used anywhere in the plugin appears
#                    in the registry. Warns on registry rows nothing cites.
#
# The registry (references/docs-links.md) is the single source of truth. Prints
# file/url on failure, exits non-zero on any liveness failure or unregistered URL.
set -uo pipefail
cd "$(dirname "$0")/.."

REGISTRY="references/docs-links.md"
DOCS_HOST="docs.sector137.io"
fail=0

if [ ! -f "$REGISTRY" ]; then
  echo "link-check: no registry at $REGISTRY"
  exit 1
fi

# Strip trailing sentence punctuation a prose citation may leave on a URL.
strip_punct() { sed -E 's/[.,;:]+$//'; }

# All registry URLs (the authoritative set).
registry_urls=$(grep -oE "https://${DOCS_HOST}[^ )\`\"|]*" "$REGISTRY" | strip_punct | sort -u)

# ── 1. liveness ────────────────────────────────────────────────────────────
if [ "${LINK_CHECK_OFFLINE:-0}" = "1" ]; then
  echo "link-check: LINK_CHECK_OFFLINE=1 — skipping liveness"
else
  echo "link-check: liveness"
  while IFS= read -r url; do
    [ -z "$url" ] && continue
    code=$(curl -sS -o /dev/null -w '%{http_code}' -L -I --max-time 10 "$url" 2>/dev/null || echo "000")
    if [ "$code" -ge 200 ] && [ "$code" -lt 400 ]; then
      echo "  ok   $code  $url"
    else
      echo "  FAIL $code  $url"
      fail=1
    fi
  done <<< "$registry_urls"
fi

# ── 2. consistency ─────────────────────────────────────────────────────────
echo "link-check: consistency"

# Every docs URL used outside the registry must be in the registry. The registry
# file itself defines the set, so exclude it as a source of "used" URLs.
used_urls=$(grep -rhoE "https://${DOCS_HOST}[^ )\`\"|]*" \
              skills agents shared README.md \
              $(find references -name '*.md' ! -name 'docs-links.md') 2>/dev/null \
            | strip_punct | sort -u)

while IFS= read -r url; do
  [ -z "$url" ] && continue
  if ! grep -qF "$url" "$REGISTRY"; then
    echo "  UNREGISTERED  $url"
    echo "    → add it to $REGISTRY or fix the citation"
    fail=1
  fi
done <<< "$used_urls"

# Warn (don't fail) on registry rows nothing cites — only for the "Cited by" table.
while IFS= read -r url; do
  [ -z "$url" ] && continue
  if ! echo "$used_urls" | grep -qF "$url"; then
    echo "  note: $url is in the registry but nothing cites it"
  fi
done <<< "$registry_urls"

if [ "$fail" -eq 0 ]; then
  echo "link-check: clean"
else
  echo "link-check: violations found"
fi
exit "$fail"
