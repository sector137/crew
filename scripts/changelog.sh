#!/usr/bin/env bash
# changelog.sh — extract CHANGELOG.md sections for versions in (from, to].
#
# Usage: changelog.sh <from> [<to>] [--unreleased]
#   changelog.sh 0.2.0              -> every section newer than 0.2.0 (excludes Unreleased)
#   changelog.sh 0.2.0 0.3.0        -> sections >0.2.0 and <=0.3.0
#   changelog.sh 0.2.0 --unreleased -> the above, plus the [Unreleased] block
#
# Reads the canonical heading form: "## [X.Y.Z] — Title".
set -euo pipefail
cd "$(dirname "$0")/.."
CHANGELOG="CHANGELOG.md"

FROM=""; TO=""; INCLUDE_UNRELEASED=0
for arg in "$@"; do
  case "$arg" in
    --unreleased) INCLUDE_UNRELEASED=1 ;;
    *) if [ -z "$FROM" ]; then FROM="$arg"; elif [ -z "$TO" ]; then TO="$arg"; fi ;;
  esac
done

[ -n "$FROM" ] || { echo "usage: changelog.sh <from> [<to>] [--unreleased]" >&2; exit 2; }
[ -r "$CHANGELOG" ] || { echo "changelog.sh: no $CHANGELOG" >&2; exit 1; }

awk -v from="$FROM" -v to="$TO" -v incl_unrel="$INCLUDE_UNRELEASED" '
  function vgt(a, b,   x, y, i, xi, yi) {        # a > b ?
    split(a, x, "."); split(b, y, ".")
    for (i = 1; i <= 3; i++) {
      xi = x[i] + 0; yi = y[i] + 0
      if (xi > yi) return 1
      if (xi < yi) return 0
    }
    return 0
  }
  function vle(a, b) { return !vgt(a, b) }        # a <= b ?
  /^## / {
    printing = 0
    if ($0 ~ /^## \[Unreleased\]/) {
      printing = (incl_unrel == 1)
    } else if (match($0, /\[[0-9]+\.[0-9]+\.[0-9]+\]/)) {
      v = substr($0, RSTART + 1, RLENGTH - 2)
      if (vgt(v, from) && (to == "" || vle(v, to))) printing = 1
    }
  }
  printing { print }
' "$CHANGELOG"
