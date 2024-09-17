/** @type {import('tailwindcss').Config} */
export default {
  // For Tailwind CSS v2.x, you would use the purge option
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

  // content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // Enabled class-based dark mode
  theme: {
    extend: {
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};