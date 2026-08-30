import {
  defineConfig,
  presetUno,
  presetIcons,
  transformerVariantGroup,
  transformerDirectives,
} from 'unocss'

// Colours are driven by CSS variables (see src/styles.css) so that a single
// `dark` class on the app root flips the whole palette. Utilities stay
// semantic — `bg-surface`, `text-fg-strong` — instead of hard-coding a
// light value plus a `dark:` counterpart on every element.
const semantic = (name) => `var(--c-${name})`

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme: {
    colors: {
      bg: semantic('bg'),
      surface: semantic('surface'),
      'surface-2': semantic('surface-2'),
      fg: semantic('fg'),
      'fg-strong': semantic('fg-strong'),
      'fg-muted': semantic('fg-muted'),
      primary: semantic('primary'),
      'primary-soft': semantic('primary-soft'),
      line: semantic('border'),
    },
    fontFamily: {
      sans: "'Poppins', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    },
    breakpoints: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    boxShadow: {
      card: 'var(--shadow-card)',
      lift: 'var(--shadow-lift)',
    },
  },
  shortcuts: [
    // Layout
    ['shell', 'w-full max-w-[68rem] mx-auto px-5 sm:px-8'],
    ['section', 'scroll-mt-28 mt-20 sm:mt-28'],
    [
      'section-title',
      'text-center text-fg-strong font-600 tracking-tight text-[clamp(1.5rem,4vw,2rem)]',
    ],
    [
      'section-kicker',
      'block text-center text-xs font-500 uppercase tracking-[0.2em] text-primary mb-2',
    ],

    // Buttons — min-h-11 keeps every tap target at/above 44px on touch screens
    [
      'btn',
      'inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full font-500 text-sm transition-all duration-200 focus-visible:(outline-none ring-2 ring-primary ring-offset-2 ring-offset-bg)',
    ],
    [
      'btn-primary',
      'btn bg-primary text-white shadow-card hover:(-translate-y-0.5 shadow-lift) active:translate-y-0',
    ],
    [
      'btn-outline',
      'btn border-2 border-primary text-primary hover:(bg-primary text-white -translate-y-0.5)',
    ],
    [
      'icon-btn',
      'inline-flex items-center justify-center w-11 h-11 rounded-full text-fg transition-colors duration-200 hover:(bg-surface-2 text-primary) focus-visible:(outline-none ring-2 ring-primary)',
    ],

    // Surfaces
    [
      'card',
      'flex flex-col rounded-2xl bg-surface border border-line shadow-card overflow-hidden transition-all duration-200 hover:(-translate-y-1 shadow-lift)',
    ],
    [
      'chip',
      'inline-flex items-center rounded-full bg-surface-2 border border-line px-3 py-1 text-xs font-500 text-fg-strong',
    ],

    // Links
    [
      'link-nav',
      'relative text-fg font-500 transition-colors duration-200 hover:text-primary after:(content-empty absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-[width] duration-200) hover:after:w-full',
    ],
  ],
  safelist: ['i-lucide-menu', 'i-lucide-x'],
})
