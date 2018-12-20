'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const isdemoDev = process.env.NODE_ENV === 'demo_dev'
const entry = isdemoDev ? path.join(__dirname, '../demo/main.js') : path.join(__dirname, '../doc/main.js')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  entry: entry,
  module: {
    rules: utils.styleLoaders({
      sourceMap: isdemoDev ? config.demo_dev.cssSourceMap : config.doc_dev.cssSourceMap,
      usePostCSS: isdemoDev ? config.demo_dev.usePostCSS : config.doc_dev.usePostCSS,
      isminimize: false
    })
  },
  output: {
    path: isdemoDev ? path.resolve(__dirname, '../dev') : path.resolve(__dirname, '../docdev'),
    filename: 'index.js'
  },
  // cheap-module-eval-source-map is faster for development
  devtool: isdemoDev ? config.demo_dev.devtool : config.doc_dev.devtool,
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.demo_dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    compress: true,
    host: HOST || (isdemoDev ? config.demo_dev.host : config.doc_dev.host),
    port: PORT || (isdemoDev ? config.demo_dev.port : config.doc_dev.port),
    open: true,
    overlay: config.demo_dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.demo_dev.assetsPublicPath,
    proxy: isdemoDev ? config.demo_dev.proxyTable : config.doc_dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: isdemoDev ? config.demo_dev.poll : config.doc_dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': isdemoDev ? require('../config/demo_dev.env') : require('../config/doc_dev.env'),
      'examplePath': JSON.stringify('http://0.0.0.0:7000/index.html#')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: isdemoDev ? 'demo/index.html' : 'doc/index.html',
      inject: true
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || (isdemoDev ? config.demo_dev.port : config.doc_dev.port)
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: (isdemoDev ? config.demo_dev.notifyOnErrors : config.doc_dev.notifyOnErrors)
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
