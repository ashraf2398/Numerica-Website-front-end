/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2f7165', // Teal/green
        secondary: '#234563', // Dark blue
        light: '#ffffff', // White
        dark: '#000000', // Black
      },
    },
  },
  plugins: [],
}

