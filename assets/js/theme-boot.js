/* Runs before first paint on every page (blocking <script> in <head>).
   Sets html[data-theme] so there is never a flash of the wrong theme.
   DO NOT convert to a module or move to the bottom of the page. */
(function () {
  var saved = null;
  try { saved = localStorage.getItem('aa-theme'); } catch (e) { /* private mode */ }
  var dark = saved
    ? saved === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
})();
