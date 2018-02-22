const webpack = require('webpack')
const { join } = require('path')
const { loaders, PATH, BUNDLE_FILE_NAME, LIBRARY_NAME } = require('./common')

module.exports = {
  entry: {
    [BUNDLE_FILE_NAME]: join(PATH.SRC, 'main.js'),
    [`${BUNDLE_FILE_NAME}.min`]: join(PATH.SRC, 'main.js')
  },
  output: {
    filename: '[name].js',
    path: join(__dirname, '..', 'dist'),
    libraryTarget: 'umd',
    library: LIBRARY_NAME,
    umdNamedDefine: true
  },
  module: {
    rules: [loaders.babelLoader]
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    }),
  ]
}
