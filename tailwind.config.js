/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        quest: {
          blue: {
            deep: '#0B132B',
            dark: '#1C2541',
            DEFAULT: '#2563EB',
            light: '#3B82F6',
            pale: '#EFF6FF',
          },
          turquoise: {
            DEFAULT: '#06B6D4',
            dark: '#0891B2',
            light: '#22D3EE',
            glow: '#67E8F9',
          },
          purple: {
            deep: '#2E1065',
            dark: '#581C87',
            DEFAULT: '#7C3AED',
            light: '#A855F7',
            soft: '#F3E8FF',
          },
          amber: {
            DEFAULT: '#F59E0B',
            dark: '#D97706',
            gold: '#FBBF24',
            light: '#FEF3C7',
          },
        },
      },
      fontFamily: {
        fantasy: ['"Fredoka"', '"Nunito"', 'system-ui', 'sans-serif'],
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2.5s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 12px rgba(34, 211, 238, 0.6))' },
          '50%': { filter: 'drop-shadow(0 0 25px rgba(168, 85, 247, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-4deg)' },
          '75%': { transform: 'rotate(4deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
