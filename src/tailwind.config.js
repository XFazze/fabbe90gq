module.exports = {
  content: [
  './templates/*html',
  './templates/**/*.html',
  './templates/**/**/*.html',
  './templates/**/**/**/*.html',
  './static/js/*.js',
  './static/js/**/*.js',
  './static/js/**/**/*.js',
],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto'],
      },},
  },
  plugins: [],
}
