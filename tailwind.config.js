/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#374774',
          dark: '#2b395d',
          deep: '#20305c',
        },
        gold: {
          accent: '#EAB630',
          hover: '#d9a423',
          surface: '#FFF8E7',
          light: '#FFF9E6',
          border: '#fde047',
        },
        'navyslate': '#374774',
        'navyslate-hover': '#2b395d',
        'gold-accent': '#EAB630',
        'gold-surface': '#FFF8E7',
        secondary: '#785a00',
        background: '#f9f9ff',
        surface: '#f9f9ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f0f3ff',
        'surface-container': '#e7eeff',
        'surface-container-high': '#dee8ff',
        'surface-container-highest': '#d8e3fa',
        'on-surface': '#111c2c',
        'on-surface-variant': '#45464f',
        'outline-variant': '#c5c6d0',
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        'on-error-container': '#93000a',
      },
      fontFamily: {
        sans: ['Public Sans', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Public Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
