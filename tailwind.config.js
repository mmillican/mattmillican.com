/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
		'./public/**/*.html',
		'./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
	],
  theme: {
    fontFamily: {
      'sans': [ 'Raleway', 'sans-serif' ],
    },
    extend: {
      colors: {
        'primary': '#4fcfda',
        'secondary': '#EF7B45',
        'gray-dark': '#1a1a1c',
        'highlight': '#9AE3EA',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
