require('shelljs/global');

var config = require('../config');
var ora = require('ora');
var webpack = require('webpack');
var webpackConfig = require('./webpack.prod.conf');
var env = process.env.NODE_ENV

var spinner = ora('building for production...');
spinner.start();

// 每次打包前先移除dist文件夹
rm('-rf', config[env].assetsRoot);

webpack(webpackConfig, function (err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
});
