'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const env = process.env.NODE_ENV

const webpackConfig = merge(baseWebpackConfig, {
  entry: config[env].entry,
  output: {
    path: config[env].assetsRoot,
    filename: 'index.js',
    library: 'vue-ui',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config[env].productionSourceMap,
      extract: true,
      usePostCSS: true,
      isminimize: true
    })
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
      'examplePath': JSON.stringify('http://47.98.169.84:8080/doc/index.html#')
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false
    }),
    new ExtractTextPlugin({
      filename: `index.css?[contenthash:8]`
    })
  ]
})

if(env === 'doc_production' || env === 'demo_production'){
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: config[env].template,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }))
}

module.exports = webpackConfig
