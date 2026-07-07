/* Footnote popovers. Progressive enhancement over plain anchor links:
   markup pattern (see claude.md > Article building blocks):
     in text:  <sup class="fn"><a class="fn-ref" id="fnref-N" href="#fn-N">N</a></sup>
     in Notes: <li id="fn-N"><span class="fn-text">…</span>
                 <a class="fn-back" href="#fnref-N">&#8617;</a></li>
   Without JS the marker jumps to the Notes list; with JS it opens a popover
   filled from the matching .fn-text. One popover at a time; closes on
   Escape, outside click, or resize. */

export function initFootnotes() {
  const refs = document.querySelectorAll('a.fn-ref');
  if (!refs.length) return;

  let pop = null;
  let current = null;

  function close() {
    if (pop) pop.remove();
    if (current) current.setAttribute('aria-expanded', 'false');
    pop = null;
    current = null;
  }

  function open(ref) {
    const note = document.getElementById(ref.getAttribute('href').slice(1));
    if (!note) return;
    close();
    pop = document.createElement('div');
    pop.className = 'fn-pop';
    pop.setAttribute('role', 'note');
    const text = note.querySelector('.fn-text');
    pop.innerHTML = (text || note).innerHTML;
    document.body.appendChild(pop);

    const r = ref.getBoundingClientRect();
    const w = Math.min(360, window.innerWidth - 32);
    pop.style.width = w + 'px';
    let left = r.left + r.width / 2 - w / 2;
    left = Math.max(16, Math.min(left, window.innerWidth - w - 16));
    pop.style.left = left + window.scrollX + 'px';
    const h = pop.offsetHeight;
    const fitsBelow = r.bottom + h + 12 < window.innerHeight;
    pop.style.top =
      (fitsBelow ? r.bottom + 10 : r.top - h - 10) + window.scrollY + 'px';

    ref.setAttribute('aria-expanded', 'true');
    current = ref;
  }

  refs.forEach((ref) => {
    ref.setAttribute('aria-expanded', 'false');
    ref.addEventListener('click', (e) => {
      e.preventDefault();
      if (current === ref) {
        close();
      } else {
        open(ref);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (pop && !pop.contains(e.target) && !e.target.closest('.fn-ref')) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && current) {
      const c = current;
      close();
      c.focus();
    }
  });

  window.addEventListener('resize', close);
}
