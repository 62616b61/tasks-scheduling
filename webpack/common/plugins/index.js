import path from 'path'
import webpack from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackMessages from 'webpack-messages'

export default (config) => [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor-[hash].js'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      IS_DEV: process.env.NODE_ENV !== 'production',
      NODE_ENV: JSON.stringify(config.nodeEnv)
    }
  }),
  new HtmlWebpackPlugin({
    template: path.join(config.sourcePath, 'index.html'),
    path: config.buildPath,
    filename: 'index.html'
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new WebpackMessages({
    name: 'client',
    logger: str => console.log(`>> ${str}`)
  })
]
