/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1a2234",
          dark: "#0a1120"
        },
        brand: "#1a2234", // For easy reference
      },
      spacing: {
        '18': '4.5rem', // Custom spacing for padding/margin
        '22': '5.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'], // Improved font family
        heading: ['Poppins', 'sans-serif'], // For headings
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'page': '#0a1120', // dark background
        'header': '#1a2234', // header background
      }),
      borderRadius: {
        'lg': '0.5rem', // Rounded corners for better aesthetics
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Adds typography utilities
  ],
}