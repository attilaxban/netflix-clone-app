/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // scrollbar: {
      //   hide: {
      //     'scrollbar-width': 'none',
      //     'scrollbar-color': 'transparent transparent',
      //     "scrollbar" : 'hide'
      //   },
      //   thin: {
      //     'scrollbar-width': 'thin',
      //   },
      // },
    },
  },
  plugins: [
  ],
}