const {fontFamily} = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
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
        eggshell: '#F0EAD6',
        champagne: '#F4DDCD',
        olivine: '#ACC397',
        orchid: '#F2C1D1',
        flax: '#F8EB89',
        jordy: '#92b4dd',
        tangerine: '#FF9470',
        caramel: '#D18A4D',

        sienna: {
          50: '#FFF0EB',
          100: '#FFD1C2',
          200: '#F3C3BA',
          300: '#FFB399',
          400: '#FF9470',
          500: '#FF7547',
          600: '#FF571F',
          700: '#B82E00',
          800: '#8F2400',
          900: '#661A00',
          950: '#3D0F00',
        },

        viridian: {
          50: '#ECEFE7',
          100: '#D9DECE',
          200: '#C5CDB6',
          300: '#B2BD9E',
          400: '#A8B592',
          500: '#94A479',
          600: '#76865B',
          700: '#6C7C59',
          800: '#606D4A',
          900: '#404932',
          950: '#2A3021',
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