import webpack from 'webpack'

const postcssPlugins = [
  require('postcss-modules-local-by-default'),
  require('postcss-import')({
    addDependencyTo: webpack
  }),
  require('postcss-cssnext'),
  require('postcss-nested'),
  require('cssnano')({
    safe: true,
    sourcemap: true,
    autoprefixer: false
  })
]

export default {
  test: /\.(css|scss)$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        localIdentName: '[hash:base64]',
        camelCase: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: postcssPlugins,
        importLoaders: 1
      }
    }
  ],
  exclude: /node_modules/
}
