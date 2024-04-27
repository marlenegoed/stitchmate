const {fontFamily} = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx,tsx}',
    './components/**/*.{js,jsx,tsx}',
    './app/**/*.{js,jsx,tsx}',
    './src/**/*.{js,jsx,tsx}',
  ],
  prefix: "",
  theme: {

    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        eggshell: '#F4F1DE',
        sand: '#f0efee',
        sienna: {
          50: '#FCF1EE',
          100: '#F9E1DC',
          200: '#F3C3BA',
          300: '#EDA396',
          400: '#E78573',
          500: '#E16651',
          600: '#DC482E',
          700: '#C03821',
          800: '#AE3F1E',
          900: '#7A2415',
          950: '#230C06',
        },
        viridian: {
          50: '#E6EFEC',
          100: '#CDDFD9',
          200: '#B4CFC6',
          300: '#9BBFB3',
          400: '#83AFA0',
          500: '#76A797',
          600: '#5F9583',
          700: '#507C6D',
          800: '#406458',
          900: '#304B42',
          950: '#182521',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
    },
    keyframes: {
      "accordion-down": {
        from: {height: "0"},
        to: {height: "var(--radix-accordion-content-height)"},
      },
      "accordion-up": {
        from: {height: "var(--radix-accordion-content-height)"},
        to: {height: "0"},
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
  plugins: [require("tailwindcss-animate")],
};