module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        border: 'var(--border)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'Roboto', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
