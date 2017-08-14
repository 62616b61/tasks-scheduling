import path from 'path'

import loaders from './loaders'
import plugins from './plugins'

export default (config) => ({

  context: config.jsSourcePath,
  entry: {
    js: './index.jsx',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    path: config.buildPath,
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      path.resolve(process.cwd(), 'node_modules'),
      config.jsSourcePath,
      config.assetsPath
    ],
    extensions: [
      '.jsx',
      '.js',
      '.json',
      '.css'
    ]
  },
  devServer: {
    contentBase: './source',
    historyApiFallback: true,
    port: 3000,
    host: '0.0.0.0',
    stats: "none"
  },

  module: { loaders },

  plugins: plugins(config)

})
