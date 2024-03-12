/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    fontFamily: {
      'poppins': '"Poppins"'
    },
    extend: {},
  },
  plugins: [
    require("kutty")
  ],
}