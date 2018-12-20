'use strict'
const path = require('path')

module.exports = {
  demo_dev: {
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 7000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    assetsPublicPath: '/',
    proxyTable: {

    },
    usePostCSS: true,
    poll: false,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    cssSourceMap: true,
    devtool: 'cheap-module-eval-source-map',
    assetsSubDirectory: 'static',
  },
  doc_dev: {
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 9000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    assetsPublicPath: '/',
    proxyTable: {

    },
    usePostCSS: true,
    poll: false,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    cssSourceMap: true,
    devtool: 'cheap-module-eval-source-map',
    assetsSubDirectory: 'static',
  },
  production: {
    entry: path.join(__dirname, '../src/index.js'),
    template: '',
    // path
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '/',
    sourceMap: true,
    productionSourceMap: false,
    devtool: true,
  },
  doc_production: {
    entry: path.join(__dirname, '../doc/main.js'),
    template: 'doc/index.html',
    // path
    assetsRoot: path.resolve(__dirname, '../doc/dist'),
    assetsPublicPath: '/',
    sourceMap: true,
    productionSourceMap: false,
    devtool: true
  },
  demo_production: {
    entry: path.join(__dirname, '../demo/main.js'),
    template: 'demo/index.html',
    // path
    assetsRoot: path.resolve(__dirname, '../demo/dist'),
    assetsPublicPath: '/',
    sourceMap: true,
    productionSourceMap: false,
    devtool: true
  }
}