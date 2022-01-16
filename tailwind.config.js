// tailwind.config.js

module.exports = {
  content: [
    './**/*.{html,js}',
    './**/**/*.{html,js}',
    './**/**/**/*.{html,js}',],
  theme: {
    extend: {
        '76': "19rem"
      },
      display: ["hover"],
    },
  },
  plugins: [],
}