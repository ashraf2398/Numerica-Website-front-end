/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2f7165',
          50: '#f0f9f7',
          100: '#d1f2ed',
          200: '#a3e5db',
          300: '#6dd3c4',
          400: '#3fbaa8',
          500: '#2f7165',
          600: '#266157',
          700: '#1f4e47',
          800: '#1a3e39',
          900: '#16322f',
        },
        secondary: {
          DEFAULT: '#234563',
          50: '#f1f5f9',
          100: '#e2eaf3',
          200: '#c8d8e7',
          300: '#a1bdd5',
          400: '#749bc0',
          500: '#5578a8',
          600: '#456192',
          700: '#3a4f7a',
          800: '#334366',
          900: '#234563',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(47, 113, 101, 0.3)',
        'glow-lg': '0 0 40px rgba(47, 113, 101, 0.4)',
      },
    },
  },
  plugins: [],
}