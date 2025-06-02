/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#141a29',
        'navy-dark': '#192235',
        'page': '#101624',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}