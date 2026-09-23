/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
        },
        surface: {
          primary: 'var(--color-surface-primary)',
          secondary: 'var(--color-surface-secondary)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        accent: {
          red: 'var(--color-accent-red)',
          'red-hover': 'var(--color-accent-red-hover)',
          'red-active': 'var(--color-accent-red-active)',
          gold: 'var(--color-accent-gold)',
          olive: 'var(--color-accent-olive)',
        },
        border: {
          default: 'var(--color-border-default)',
          strong: 'var(--color-border-strong)',
        },
        feedback: {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          error: 'var(--color-error)',
          info: 'var(--color-info)',
          focus: 'var(--color-focus)',
        },
        dark: {
          bg: 'var(--color-dark-bg)',
          surface: 'var(--color-dark-surface)',
          text: 'var(--color-dark-text)',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif"', '"Times New Roman"', 'serif'],
        sans: ['"Be Vietnam Pro"', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
        '24': 'var(--space-24)',
        '32': 'var(--space-32)',
      },
      maxWidth: {
        'content-sm': 'var(--content-sm)',
        'content-md': 'var(--content-md)',
        'content-lg': 'var(--content-lg)',
        'content-xl': 'var(--content-xl)',
      }
    },
  },
  plugins: [],
}
