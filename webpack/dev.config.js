const { join } = require('path')
const { loaders, PATH, BUNDLE_FILE_NAME, LIBRARY_NAME } = require('./common')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    [BUNDLE_FILE_NAME]: join(PATH.SRC, 'main.js')
  },
  output: {
    filename: '[name].js',
    path: join(__dirname, '..', 'demo'),
    libraryTarget: 'umd',
    library: LIBRARY_NAME,
    umdNamedDefine: true
  },
  module: {
    rules: [loaders.babelLoader]
  }
}
