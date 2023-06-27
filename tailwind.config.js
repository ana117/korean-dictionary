/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
        colors: {
            'primary': '#045995',
            'secondary': '#E5042C',
            'tertiary': '#E5DADB',
        },
        gridTemplateColumns: {
            '15': 'repeat(15, minmax(0, 1fr))',
        }
    },
  },
  plugins: [],
}

