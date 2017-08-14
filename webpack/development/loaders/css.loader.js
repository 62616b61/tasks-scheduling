const postcssPlugins = [
  require('postcss-modules-local-by-default'),
  require('postcss-import'),
  require('postcss-cssnext'),
  require('postcss-nested')
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
