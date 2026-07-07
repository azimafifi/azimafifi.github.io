#!/usr/bin/env bash
# Pre-deploy sanity check. Run from the project root: bash scripts/check.sh
set -euo pipefail

echo "== JS syntax (parsed as ES modules) =="
for f in assets/js/*.js; do
  cp "$f" /tmp/aa-check.mjs
  node --check /tmp/aa-check.mjs
  echo "OK  $f"
done

echo "== Structural anchors =="
grep -q 'id="case-study-grid"' index.html && echo "OK  #case-study-grid present in index.html"
grep -q 'data-theme-toggle' index.html && echo "OK  theme toggle present in index.html"
for f in case-studies/*.html; do
  [ "$(basename "$f")" = "case-study-template.html" ] && continue
  grep -q 'data-theme-toggle' "$f" && echo "OK  theme toggle present in $f"
  grep -q 'theme-boot.js' "$f" && echo "OK  theme boot present in $f"
done

echo "== Every registered case study has a page =="
for slug in $(grep -o "slug: '[a-z-]*'" assets/js/case-studies.js | cut -d"'" -f2); do
  test -f "case-studies/$slug.html" && echo "OK  case-studies/$slug.html"
done

echo "== No leftover template slots in live pages =="
if grep -rl '\[\[SLOT:' index.html case-studies/*.html --exclude=case-study-template.html 2>/dev/null; then
  echo "FAIL: unfilled [[SLOT:...]] markers found above" && exit 1
else
  echo "OK  no unfilled slots"
fi

echo
echo "All checks passed. Preview locally with: python3 -m http.server 4173"
