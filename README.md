# azimafifi.com

Personal portfolio site for Azim Afifi: Learning Design & Development.

Static site: HTML + Tailwind (CDN) + vanilla ES modules. No build step.

- **Maintainers and AI models: read [claude.md](./claude.md) before editing anything.** It is the single source of truth for structure, tokens, and the content-expansion workflow.
- Preview locally: `python3 -m http.server 4173` (ES modules do not run from file://).
- Pre-deploy checks: `bash scripts/check.sh`.
- Deploy: push to GitHub, enable Pages from the main branch root. Details in claude.md §8.
