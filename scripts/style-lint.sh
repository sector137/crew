#!/usr/bin/env bash
# Style lint — enforces shared/writing-style.md over agents/, skills/, shared/, plugins/.
# Flags: em-dash density, antithesis constructions, banned phrases/vocabulary,
# and long bold-term bullet runs. Prints file:line, exits non-zero on violations.
#
# Excluded: shared/writing-style.md (quotes the patterns it bans), archive/ dirs,
# .storyline/ (creative-writing lore, not operational prose). YAML frontmatter is
# blanked before checking so trigger descriptions are out of scope.
set -uo pipefail
cd "$(dirname "$0")/.."

EMDASH_BUDGET=6

ANTITHESIS="(isn't|aren't|not)[^.—]{0,40}— (it's|they're)|That's not [^.]+\. That's|It's not just"
BANNED="load-bearing|scar tissue|die quietly|(isn't|not) decorative|\b(delve|delves|delving|seamless(ly)?|world-class|tapestry|testament|holistic|meticulous(ly)?|pivotal|crucial(ly)?|cutting-edge|game-changer|supercharge[ds]?|empower(s|ing|ed)?|streamline[ds]?|streamlining|robust|comprehensive(ly)?|leverage[ds]?|leveraging)\b"

fail=0

# Blank YAML frontmatter in place so line numbers stay real.
body() {
  awk 'NR==1 && /^---$/ {fm=1; print ""; next}
       fm && /^---$/    {fm=0; print ""; next}
       fm               {print ""; next}
       {print}' "$1"
}

while IFS= read -r f; do
  b=$(body "$f")

  # Skill reference docs are exempt from the em-dash budget (long-form reference
  # material); they still get the phrase and structure checks.
  case "$f" in
    */references/*) ;;
    *)
      dashes=$(printf '%s\n' "$b" | grep -o '—' | wc -l | tr -d ' ')
      if [ "$dashes" -gt "$EMDASH_BUDGET" ]; then
        echo "$f: $dashes em-dashes (budget $EMDASH_BUDGET)"
        fail=1
      fi
      ;;
  esac

  hits=$(printf '%s\n' "$b" | grep -nE "$ANTITHESIS" || true)
  if [ -n "$hits" ]; then
    printf '%s\n' "$hits" | sed "s|^|$f:|; s|$| [antithesis]|"
    fail=1
  fi

  hits=$(printf '%s\n' "$b" | grep -inE "$BANNED" || true)
  if [ -n "$hits" ]; then
    printf '%s\n' "$hits" | sed "s|^|$f:|; s|$| [banned phrase]|"
    fail=1
  fi

  hits=$(printf '%s\n' "$b" | awk '
    /^[[:space:]]*[-*][[:space:]]+\*\*[^*]+\*\*:/ { run++; if (run == 5) print NR": run of >4 bold-term bullets" ; next }
    { run = 0 }' || true)
  if [ -n "$hits" ]; then
    printf '%s\n' "$hits" | sed "s|^|$f:|; s|$| [bullet run]|"
    fail=1
  fi
done < <(find agents skills shared plugins -name '*.md' \
           ! -path 'shared/writing-style.md' \
           ! -path '*/archive/*')

if [ "$fail" -eq 0 ]; then
  echo "style-lint: clean"
else
  echo "style-lint: violations found (see shared/writing-style.md)"
fi
exit "$fail"
