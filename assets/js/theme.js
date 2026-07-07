/* Theme engine. The only code allowed to change html[data-theme] after boot.
   Contract (do not rename any of these):
     - attribute:      html[data-theme] = "light" | "dark"
     - storage key:    localStorage "aa-theme"
     - toggle hook:    any element with [data-theme-toggle]
     - transition arm: html.theme-anim (added after first paint) */

const KEY = 'aa-theme';

function apply(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(theme === 'dark'));
  });
}

export function initTheme() {
  // Arm color transitions only after first paint so page load never animates.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.add('theme-anim');
    });
  });

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next =
        document.documentElement.getAttribute('data-theme') === 'dark'
          ? 'light'
          : 'dark';
      try { localStorage.setItem(KEY, next); } catch (e) { /* private mode */ }
      apply(next);
    });
  });

  // Follow system preference only while the visitor has not chosen manually.
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      let saved = null;
      try { saved = localStorage.getItem(KEY); } catch (err) { /* ignore */ }
      if (!saved) apply(e.matches ? 'dark' : 'light');
    });

  apply(document.documentElement.getAttribute('data-theme') || 'light');
}
