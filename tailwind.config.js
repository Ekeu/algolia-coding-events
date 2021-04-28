const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        hind: ['Hind', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        bangers: ['Bangers', 'cursive'],
      },
      colors: {
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        purple: colors.purple,
        violet: colors.violet,
        red: colors.red,
        green: colors.green,
        cyan: colors.cyan,
        orange: colors.orange,
        pink: colors.pink,
        'cool-gray': colors.coolGray,
        'blue-gray': colors.blueGray,
        'light-blue': colors.lightBlue,
        teal: colors.teal,
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
};
