/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp'), require('daisyui')],
  daisyui: {
    themes: ['emerald'],
  },
};
