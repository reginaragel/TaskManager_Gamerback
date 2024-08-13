/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'custom-back':'#fcfbfb',
        'logout':'#eae5e5',
        'todo':'#f61c1c',
        'progress':'#ec590b',
        'finished':'#29b55c'
      }
    },
  },
  plugins: [],
}

