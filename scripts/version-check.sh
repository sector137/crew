#!/usr/bin/env bash
# version-check.sh — assert the three manifests carry the same version.
# plugin.json is the source of truth; marketplace.json and package.json must match.
# `claude plugin tag` validates plugin.json vs marketplace.json but not package.json,
# so this closes that gap. Wired as `bun run lint:version`.
set -euo pipefail
cd "$(dirname "$0")/.."

command -v jq >/dev/null 2>&1 || { echo "version-check: jq required" >&2; exit 2; }

PLUGIN=$(jq -r '.version // empty' .claude-plugin/plugin.json)
MARKET=$(jq -r '.plugins[] | select(.name=="sector137") | .version // empty' .claude-plugin/marketplace.json)
PKG=$(jq -r '.version // empty' package.json)

echo "plugin.json      : ${PLUGIN:-<missing>}"
echo "marketplace.json : ${MARKET:-<missing>}"
echo "package.json     : ${PKG:-<missing>}"

if [ -z "$PLUGIN" ] || [ "$PLUGIN" != "$MARKET" ] || [ "$PLUGIN" != "$PKG" ]; then
  echo "version-check: MISMATCH — all three must equal plugin.json (${PLUGIN:-<missing>})" >&2
  exit 1
fi

echo "version-check: clean ($PLUGIN)"
