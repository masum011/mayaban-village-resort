/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1F3D2B',
          deep: '#14291C',
          soft: '#2C543C',
        },
        sand: {
          DEFAULT: '#F6F1E7',
          warm: '#EFE7D6',
          ivory: '#FAF7F0',
        },
        terracotta: {
          DEFAULT: '#B5654A',
          deep: '#964E36',
          soft: '#D38B72',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#DFC15E',
          dark: '#A38018',
        },
        leaf: {
          DEFAULT: '#137A3D',
          light: '#78B833',
        },
        river: {
          DEFAULT: '#0B63A5',
        },
        charcoal: {
          DEFAULT: '#2B2B2B',
          muted: '#57534E',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(31, 61, 43, 0.08)',
        elevated: '0 24px 48px -14px rgba(31, 61, 43, 0.14)',
        gold: '0 8px 24px -6px rgba(201, 162, 39, 0.28)',
      },
    },
  },
  plugins: [],
};
