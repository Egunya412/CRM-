/** Design tokens live here so every screen uses the same colours, type and spacing. */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#07080c', 900: '#0b0d13', 850: '#10131b', 800: '#161a24', 700: '#1e2330', 600: '#2a3042' },
        line: '#262c3d',
        cyan: { neon: '#22d3ee' },
        violet: { neon: '#a78bfa' },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34,211,238,.35), 0 0 18px -4px rgba(34,211,238,.35)',
        glowv: '0 0 0 1px rgba(167,139,250,.35), 0 0 18px -4px rgba(167,139,250,.35)',
      },
    },
  },
  plugins: [],
};
