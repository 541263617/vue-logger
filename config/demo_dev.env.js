var merge = require('webpack-merge')
var prodEnv = require('./demo_production.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"domo_dev"'
})