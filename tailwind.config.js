/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#000000',
          secondary: '#111111',
          tertiary: '#1a1a1a'
        }
      }
    },
  },
  plugins: [],
};