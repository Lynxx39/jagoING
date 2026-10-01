/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          amber: '#f59e0b',
          emerald: '#10b981',
          rose: '#f43f5e',
          cyan: '#06b6d4',
          purple: '#a855f7'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      // ponytail: Neo-Brutalism uses 2.5/3/3.5px borders; add w-13/h-13 for letter tiles.
      borderWidth: {
        DEFAULT: '1px',
        '0': '0px',
        '2': '2px',
        '2.5': '2.5px',
        '3': '3px',
        '3.5': '3.5px',
        '4': '4px',
        '8': '8px'
      },
      spacing: {
        '13': '3.25rem'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' }
        },
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        pulseSlow: 'pulseSlow 2.5s ease-in-out infinite',
        shine: 'shine 4s linear infinite'
      }
    },
  },
  plugins: [],
}
