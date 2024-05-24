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
  safelist: [
    'fill-eggshell',
    'fill-champagne',
    'fill-olivine',
    'fill-orchid',
    'fill-flax',
    'fill-jordy',
    'fill-tangerine',
    'fill-caramel',
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
        eggshell: '#EDEAE0',
        champagne: '#F4DDCD',
        olivine: '#AEC397',
        orchid: '#CFB4CF',
        flax: '#EFDE8A',
        jordy: '#92B6DD',
        tangerine: '#FAAA75',
        caramel: '#D18A4D',

        sienna: {
          50: '#FFEEE5',
          100: '#FFDDCC',
          200: '#FFBB99',
          300: '#FAAA75',
          400: '#F0794A',
          500: '#F0794A',
          600: '#E05E00',
          700: '#B84D00',
          800: '#8A3A05',
          900: '#8A3A05',
          950: '#8A3A05'
        },

        viridian: {
          50: '#F5F6F3',
          100: '#D7E0CD',
          200: '#C3D0B4',
          300: '#AEC397',
          400: '#90A479',
          500: '#7C9263',
          600: '#677953',
          700: '#5D7147',
          800: '#4B523D',
          900: '#2B2F23',
          950: '#2B2F23'
        },

        goldenrod: {
          50: '#FDFAED',
          100: '#FDF8CE',
          200: '#FCF5B0',
          300: '#EFDE8A',
          400: '#E9D25D',
          500: '#E4C83A',
          600: '#E4C20A',
          700: '#E2B33C',
          800: '#DAA520',
          900: '#B1871B',
          950: '#B1871B'
        },

        lilac: {
          50: '#F3F4F7',
          100: '#EEE6EF',
          200: '#DFCDDF',
          300: '#CFB4CF',
          400: '#B48FB7',
          500: '#A06AA0',
          600: '#8F5F95',
          700: '#6D4870',
          800: '#533857',
          900: '#2D1E2F',
          950: '#2D1E2F'
        },

        prussian: {
          50: '#EFF4FA',
          100: '#D0E0F1',
          200: '#B0CBE8',
          300: '#92B6DD',
          400: '#6397CF',
          500: '#4182C8',
          600: '#326EAE',
          700: '#2B5A8C',
          800: '#20466F',
          900: '#17324F',
          950: '#17324F'
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