const { join } = require('path')

const PATH = {
  SRC: join(__dirname, '..', 'src')
}

const LIBRARY_NAME = 'GithubOAuthWrapper'
const BUNDLE_FILE_NAME = 'github-oauth-wrapper'

module.exports = {
  PATH,
  BUNDLE_FILE_NAME,
  LIBRARY_NAME,
  loaders: {
    babelLoader: {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: [
          ['env']
        ]
      }
    }
  }
}
