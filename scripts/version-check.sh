#!/usr/bin/env bash
# version-check.sh — assert every plugin's manifests carry the same version.
# For each marketplace entry, the plugin's own plugin.json is the source of truth and the
# marketplace entry must match. The core plugin (source "./") also has package.json,
# which must match too.
# `claude plugin tag` validates plugin.json vs marketplace.json but not package.json,
# so this closes that gap. Wired as `bun run lint:version`.
set -euo pipefail
cd "$(dirname "$0")/.."

command -v jq >/dev/null 2>&1 || { echo "version-check: jq required" >&2; exit 2; }

MARKETPLACE=".claude-plugin/marketplace.json"
fail=0
count=0

while IFS=$'\t' read -r name source market; do
  count=$((count + 1))
  dir="${source#./}"
  dir="${dir%/}"
  manifest="${dir:+$dir/}.claude-plugin/plugin.json"

  if [ ! -f "$manifest" ]; then
    echo "$name: no plugin.json at $manifest" >&2
    fail=1
    continue
  fi

  plugin=$(jq -r '.version // empty' "$manifest")
  pname=$(jq -r '.name // empty' "$manifest")
  echo "$name"
  echo "  plugin.json      : ${plugin:-<missing>}  ($manifest)"
  echo "  marketplace.json : ${market:-<missing>}"

  bad=0
  [ "$pname" = "$name" ] || { echo "  version-check: plugin.json name is '$pname', marketplace says '$name'" >&2; bad=1; }
  if [ -z "$plugin" ] || [ "$plugin" != "$market" ]; then bad=1; fi

  if [ "$source" = "./" ]; then
    pkg=$(jq -r '.version // empty' package.json)
    echo "  package.json     : ${pkg:-<missing>}"
    if [ "$plugin" != "$pkg" ]; then bad=1; fi
  fi

  if [ "$bad" -ne 0 ]; then
    echo "  version-check: MISMATCH for $name — every manifest must equal plugin.json (${plugin:-<missing>})" >&2
    fail=1
  fi
done < <(jq -r '.plugins[] | [.name, .source, (.version // "")] | @tsv' "$MARKETPLACE")

if [ "$count" -eq 0 ]; then
  echo "version-check: no plugins in $MARKETPLACE" >&2
  exit 1
fi

if [ "$fail" -ne 0 ]; then
  exit 1
fi

echo "version-check: clean ($count plugins)"
