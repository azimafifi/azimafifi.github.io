# azimafifi.com: Build & Maintenance Playbook (Single Source of Truth)

This file is the SSOT for the personal website. Any model or human editing this
project reads this file FIRST, before touching any code. If code and this file
disagree, the code is the truth: update this file to match, never the reverse.

## 1. What this project is

- Personal portfolio site for Azim Afifi, positioning him for Learning Design / L&D roles.
- Stack: semantic HTML5 + Tailwind CSS (Play CDN) + vanilla ES6 modules. **No build step, no Node dependencies, no framework.**
- Hosting: GitHub Pages. Custom domain: www.azimafifi.com (DNS handled manually by Azim).
- Everything is static. If a change requires npm install, the change is wrong.

## 2. Hard rules (read before every edit)

1. **Never edit** `assets/js/theme-boot.js`, `assets/js/theme.js`, or `assets/js/tailwind-config.js` when adding content. They are the theme engine and Tailwind token bridge.
2. **Never rename** any of: the `data-theme` attribute, the `aa-theme` localStorage key, the `data-theme-toggle` attribute, the `theme-anim` class, the `#case-study-grid` id, or any `--c-*` CSS variable.
3. **Never hand-write case-study cards** into `index.html`. Cards render from the array in `assets/js/case-studies.js`.
4. Colors come only from the tokens in `assets/css/site.css` (via Tailwind names `paper`, `surface`, `ink`, `muted`, `line`, `accent`, `navy`). Never introduce raw hex values or stock Tailwind palette colors (`slate-500`, `teal-600`, etc.) in markup.
5. No `dark:` Tailwind variants. Dark mode works by flipping the CSS variables under `[data-theme="dark"]`. If you write `dark:`, you have misunderstood the system: stop and re-read section 4.
6. Keep every script tag order in `<head>` exactly: theme-boot.js, Tailwind CDN, tailwind-config.js, then fonts and site.css.
7. Site copy style: no em dashes anywhere. Concrete over abstract. Draft tone is analytical and direct.
8. After any edit, run `bash scripts/check.sh` from the project root.

## 3. File map

```
personal-website/
├── claude.md                      ← this playbook (SSOT)
├── README.md                      ← deploy instructions for humans
├── .nojekyll                      ← disables Jekyll on GitHub Pages, do not delete
├── index.html                     ← homepage (hero, pillars, work grid, about, contact)
├── case-studies/
│   ├── ai-in-education.html       ← case study 1 (published, full article)
│   ├── module-transformation.html ← case study 2 (in progress)
│   ├── the-learning-floorplan.html← case study 3 (concept framework)
│   └── case-study-template.html   ← copy me for new studies; never link to me
├── assets/
│   ├── css/site.css               ← ALL color tokens + editorial component styles
│   └── js/
│       ├── theme-boot.js          ← pre-paint theme setter (blocking, in <head>)
│       ├── theme.js               ← theme engine module (toggle, persistence)
│       ├── tailwind-config.js     ← maps Tailwind color names to CSS variables
│       ├── case-studies.js        ← case-study registry (data only)
│       ├── main.js                ← index entry: initTheme + render cards
│       ├── article.js             ← article entry: initTheme + initFootnotes
│       └── footnotes.js           ← footnote popover engine (do not edit for content)
└── scripts/check.sh               ← pre-deploy sanity checks
```

## 4. Design system

### Color tokens (defined once, in `assets/css/site.css`)

| Tailwind name | CSS variable | Light            | Dark             | Use for |
|---------------|--------------|------------------|------------------|---------|
| `paper`       | `--c-bg`     | warm off-white   | deep blue-black  | page background |
| `surface`     | `--c-surface`| white            | raised navy      | cards, panels |
| `ink`         | `--c-ink`    | deep blue-black  | near-white       | headings, body text |
| `muted`       | `--c-muted`  | slate            | light slate      | secondary text |
| `line`        | `--c-line`   | hairline gray    | dark hairline    | borders |
| `accent`      | `--c-accent` | rich teal        | bright teal      | links, CTAs, badges, rules |
| `navy`        | `--c-navy`   | deep blue        | steel blue       | concept badge, decorative |

Values are space-separated RGB triplets so `rgb(var(--c-x) / alpha)` works.
To recolor the whole site (both themes), edit only the two blocks at the top of `site.css`.

### Typography

- Display/serif: **Playfair Display** (`font-display`), headings, pull quotes, stat values.
- UI/body: **Inter** (`font-sans`), everything else.
- Eyebrows/kickers: uppercase, `tracking-[0.14em]` to `[0.22em]`, tiny sizes, usually `text-accent` or `text-muted`.
- Article body text is styled by `site.css` element rules inside `.article`: write plain `<h2>`, `<p>`, `<ul>`, `<ol>` and they come out right. Running text is fully justified with auto hyphenation (Azim's preference; do not switch back to ragged-right).

### Component inventory

Every component is marked in the HTML with `<!-- @component: name -->`.

| Component | Lives in | Notes |
|---|---|---|
| `site-header` | index.html | sticky nav + theme toggle |
| `article-header` | every case-study page | back link + theme toggle |
| `hero` | index.html | eyebrow, serif H1, standfirst |
| `primary-cta` | index.html (hero + contact band) | LinkedIn `.btn-primary`, email `.btn-ghost` |
| `pillars` | index.html | 3-column "What I bring" |
| `case-study-grid` | index.html `#case-study-grid` | **JS-rendered**, see section 5 |
| case-study card | generated by `main.js cardTemplate()` | canonical card markup lives there |
| `about` | index.html | portrait placeholder + facts `<dl>` |
| `contact-band` | index.html | bordered `bg-surface/60` panel, eyebrow + heading + availability copy + CTAs |
| `article-hero` | case-study pages | badge, H1, standfirst, meta `<dl>` |
| `article-body` | case-study pages | `.article` container, see building blocks below |
| `article-footer-nav` | case-study pages | prev/next links |
| `site-footer` | all pages | |

### Article building blocks (inside `<article class="article">`)

- `<p class="lede">` opening paragraph, exactly once, first
- `<h2>` section heading (teal rule auto-renders via CSS `::before`)
- `<blockquote class="pullquote"> text <cite>attribution</cite> </blockquote>`
- `<div class="placeholder"> note about missing content </div>` (renders dashed with a PLACEHOLDER label)
- `<div class="figure-ph"> [ image description ] </div>` (16:9 dashed image placeholder)
- Stat tiles: `<div class="stat-tile"><p class="stat-value">…</p><p class="stat-label">…</p></div>` inside a `grid sm:grid-cols-3` wrapper
- Footnotes (optional, see `ai-in-education.html` for the live example):
  - Marker in the text: `<sup class="fn"><a class="fn-ref" id="fnref-N" href="#fn-N" aria-label="Footnote N">N</a></sup>`
  - Notes list at the end of the article, before References: `<h2>Notes</h2>` then `<ol class="fn-list">` with items `<li id="fn-N"><span class="fn-text">…note text…</span> <a class="fn-back" href="#fnref-N" aria-label="Back to text">&#8617;</a></li>`
  - `footnotes.js` (already wired via `article.js`) turns markers into click popovers filled from the matching `.fn-text`. Number markers and list items 1..N in reading order; ids `fnref-N`/`fn-N` must pair up. Never edit `footnotes.js` itself.

### Badges

`badge-live` (teal, published), `badge-planned` (slate, in progress), `badge-concept` (blue, framework/idea). These are the only three tones.

## 5. Theme engine contract

- `theme-boot.js` runs blocking in `<head>` and sets `html[data-theme]` before paint. Never defer, move, or module-ify it.
- `theme.js` exports `initTheme()`: wires every `[data-theme-toggle]` button, persists to localStorage `aa-theme`, follows the OS preference until the visitor chooses manually, and arms `.theme-anim` transitions after first paint.
- Tailwind utilities need no `dark:` variants because `tailwind-config.js` points every color name at a CSS variable that flips under `[data-theme="dark"]`.
- New pages get dark mode for free by copying the `<head>` block and toggle button from `case-study-template.html`.

## 6. Case-study system (data flow)

1. `assets/js/case-studies.js` exports `CASE_STUDIES`, an array of objects (full schema documented at the top of that file).
2. `assets/js/main.js` renders each object through `cardTemplate()` into `#case-study-grid` on index.html.
3. Each object's `href` points to a page in `case-studies/`, built from `case-study-template.html`.
4. `index.html` also has a `<noscript>` fallback list: keep it in sync when adding studies.

---

## 7. Instruction Workflow for Content Expansion

**Copy-paste the block below verbatim into a session with a smaller model
(Claude Sonnet, Opus, etc.) to have it add a new case study safely.**

```text
You are adding ONE new case study to a static portfolio site. Follow these
steps exactly, in order. Do not refactor, rename, reformat, or "improve"
anything outside the steps.

STEP 0: READ FIRST
- Read claude.md in full. It is the source of truth.
- Read assets/css/site.css (top two blocks only) to learn the color tokens.
  The only colors you may use are the Tailwind names: paper, surface, ink,
  muted, line, accent, navy. Never write hex values or dark: variants.

STEP 1: READ THE CURRENT STRUCTURE
- Read assets/js/case-studies.js. Note the exact object schema documented in
  its header comment and the shape of the three existing entries.
- Read assets/js/main.js cardTemplate() to see the card markup that will be
  generated. You will NOT write card HTML yourself.
- Read case-studies/case-study-template.html. This is the only legal
  starting point for a new detail page.

STEP 2: REGISTER THE NEW STUDY
- Append ONE object to the CASE_STUDIES array in assets/js/case-studies.js,
  matching the schema exactly: slug, status, statusTone (live | planned |
  concept), eyebrow, title, summary (plain text, no HTML), tags (2-4),
  href ("./case-studies/<slug>.html").
- Do not modify the existing entries, the export statement, or main.js.

STEP 3: CREATE THE DETAIL PAGE
- Copy case-studies/case-study-template.html to case-studies/<slug>.html
  (same slug as step 2).
- Replace every [[SLOT:...]] marker with real content. Delete no markup.
- Build the body only from the building blocks listed in the template's
  article-body comment: p.lede, h2, p, ul, ol, blockquote.pullquote,
  div.placeholder, div.figure-ph, stat tiles.
- Update the article-footer-nav prev/next links on the new page AND on the
  page that was previously last, so the chain stays intact.
- Add the new study to the <noscript> list in index.html.
- Copy style: no em dashes. Concrete over abstract.

STEP 4: SAFETY CHECK BEFORE FINISHING
Verify all of the following and report the result of each:
- [ ] assets/js/theme-boot.js, theme.js, tailwind-config.js, main.js are
      byte-identical to before (you never edited them).
- [ ] index.html still contains id="case-study-grid" with no hand-written
      cards inside it.
- [ ] The new page's <head> script order is: theme-boot.js, Tailwind CDN,
      tailwind-config.js, fonts, site.css.
- [ ] The new page contains exactly one [data-theme-toggle] button and one
      <script type="module" src="../assets/js/article.js"></script>.
- [ ] No [[SLOT: markers remain in the new page.
- [ ] No hex colors, no dark: variants, no new CSS variables were introduced.
- [ ] Run: bash scripts/check.sh   (all checks must pass)
- [ ] Preview: python3 -m http.server 4173 then open
      http://localhost:4173 and http://localhost:4173/case-studies/<slug>.html
      and click the theme toggle on both.

Deliverable: the diff of assets/js/case-studies.js, the new
case-studies/<slug>.html file, the index.html noscript addition, and the
safety-check report. Nothing else.
```

Other safe expansion recipes for smaller models:

- **Change a color:** edit only the `--c-*` values in the two token blocks in `site.css`. Both themes, one file.
- **Add a nav link:** duplicate one `.nav-link` anchor in `index.html`'s `site-header`.
- **Add a homepage section:** copy the `pillars` or `about` section wrapper (max-w-6xl px-6 rhythm), increment the italic section number, keep the `<!-- @component: ... -->` marker convention.

## 8. Maintenance workflow & deploy pipeline

### Local preview

```bash
cd personal-website
python3 -m http.server 4173
# open http://localhost:4173
```

ES modules do not run from file:// URLs. Always preview through a local server.

### Pre-deploy checks

```bash
bash scripts/check.sh
```

Checks JS syntax, structural anchors (#case-study-grid, theme toggles), that
every registered slug has a page, and that no template slots leak into live pages.

### Deploy to GitHub Pages

```bash
# first time
git init && git add -A && git commit -m "Site"
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
# GitHub → repo → Settings → Pages → Deploy from branch → main, / (root)

# every update after that
bash scripts/check.sh && git add -A && git commit -m "Update" && git push
```

### Custom domain (manual, one time)

1. Repo Settings → Pages → Custom domain → `www.azimafifi.com` (this creates a CNAME file; keep it committed).
2. At the DNS provider: CNAME record, host `www`, value `<user>.github.io`.
3. Optional apex redirect: A records for `azimafifi.com` to GitHub Pages IPs (185.199.108.153, .109., .110., .111.).
4. Tick "Enforce HTTPS" once the certificate provisions.

### Canonical contact details (use these everywhere, never the old ones)

- Email: `hello@azimafifi.com`
- LinkedIn: `https://www.linkedin.com/in/azimaffandi`

### Launch checklist (still open)

- [ ] Replace portrait placeholder in the about section with a real photo (`images/portrait.jpg`)
- [ ] `ai-in-education.html`: confirm MIID issue/date in the meta row and replace the figure placeholder with the article spread or a crit photo
- [ ] Fill the `placeholder` blocks in `module-transformation.html` as that project progresses
- [ ] Review remaining draft copy (hero, pillars, Learning Floorplan): not yet approved by Azim
