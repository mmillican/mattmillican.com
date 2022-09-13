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
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'blockquote p': { color: theme('colors.gray.300') },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
