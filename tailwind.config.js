/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          'utfpr_yellow': '#FFBE00',
          'utfpr_black': '#0D1117',
          'utfpr_dark_gray': '#1E1E1E',
          'utfpr_white': '#FAFDFD',
          'utfpr_gray': '#D5D7D9',
          'utfpr_red': '#B13A25',
          'utfpr_blue': '#071D41'
        },
    },
  },
  plugins: [],
}
