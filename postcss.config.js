const postCssCustomMedia = require('postcss-custom-media')

module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        // Options
      },
    ],
    postCssCustomMedia({
      importFrom: './src/config/media-queries.js'
    })
  ],
}
