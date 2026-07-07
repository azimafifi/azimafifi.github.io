/* Tailwind CDN configuration, shared by every page.
   Loaded as a plain (non-module) script immediately AFTER the Tailwind CDN
   script. Colors map to the CSS custom properties defined in
   assets/css/site.css, which is why light/dark theming needs no dark:
   variants: the variables flip, the utilities follow. */
tailwind.config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        paper:   'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        ink:     'rgb(var(--c-ink) / <alpha-value>)',
        muted:   'rgb(var(--c-muted) / <alpha-value>)',
        line:    'rgb(var(--c-line) / <alpha-value>)',
        accent:  'rgb(var(--c-accent) / <alpha-value>)',
        navy:    'rgb(var(--c-navy) / <alpha-value>)'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  }
};
