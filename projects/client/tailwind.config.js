/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: { min: '0px', max: '1023px' },
      lg: { min: '1024px' },
    },
  },
  plugins: [],
};
