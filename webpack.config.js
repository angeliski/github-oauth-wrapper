const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ENTRY_FILE = `${__dirname}/src/main.js`

module.exports = {
  devtool: 'source-map',
  debug: true,
  entry: {
    'github-oauth-wrapper': ENTRY_FILE,
    'github-oauth-wrapper.min': ENTRY_FILE,
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
    libraryTarget: 'umd',
    library: 'GithubOAuthWrapper',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['env']
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      sourceMap: true
    }),
    new CopyWebpackPlugin([{
      from: 'dist/github-oauth-wrapper.js',
      to: '../demo/github-oauth-wrapper.js',
      toType: 'file'
    }])
  ]
}
