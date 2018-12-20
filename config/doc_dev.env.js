var merge = require('webpack-merge')
var prodEnv = require('./doc_production.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"doc_dev"'
})