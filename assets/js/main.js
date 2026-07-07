/* Entry module for index.html: boots the theme engine and renders the
   case-study grid from the registry in case-studies.js.
   The card markup below is the canonical component schema. If you change it,
   update the component map in claude.md. */

import { CASE_STUDIES } from './case-studies.js';
import { initTheme } from './theme.js';

function cardTemplate(cs) {
  const tags = cs.tags
    .map((t) => `<li class="tag">${t}</li>`)
    .join('');
  return `
    <article class="cs-card group flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 shadow-sm hover:-translate-y-1 hover:shadow-xl">
      <div>
        <div class="flex items-start justify-between gap-4">
          <p class="pt-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted">${cs.eyebrow}</p>
          <span class="badge badge-${cs.statusTone}">${cs.status}</span>
        </div>
        <h3 class="mt-5 font-display text-2xl font-bold leading-snug">
          <a class="cs-link" href="${cs.href}">${cs.title}</a>
        </h3>
        <p class="mt-3 text-[0.94rem] leading-relaxed text-muted">${cs.summary}</p>
      </div>
      <div>
        <ul class="mt-6 flex flex-wrap gap-2">${tags}</ul>
        <p class="mt-6 text-sm font-semibold text-accent">Read the study <span aria-hidden="true">&rarr;</span></p>
      </div>
    </article>`;
}

function renderCaseStudies() {
  const grid = document.getElementById('case-study-grid');
  if (!grid) return;
  grid.innerHTML = CASE_STUDIES.map(cardTemplate).join('');
}

initTheme();
renderCaseStudies();
