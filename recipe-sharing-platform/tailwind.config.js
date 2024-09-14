/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // Enabled class-based dark mode
  theme: {
    extend: {
      // Custom theme settings
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};