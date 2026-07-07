/* Entry module for every case-study detail page: boots the theme engine and
   footnote popovers (a no-op on pages without footnote markers). */

import { initTheme } from './theme.js';
import { initFootnotes } from './footnotes.js';

initTheme();
initFootnotes();
