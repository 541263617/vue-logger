const gulp = require('gulp')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const del = require('del')
const ora = require('ora')
const minifyCSS = require('gulp-minify-css')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const merge = require('webpack-merge')
const webpackprodconfig = require('./build/webpack.gulp.conf')
const packagesSrc = path.resolve(__dirname, './packages')
const dirs = fs.readdirSync(packagesSrc)

var spinner = ora('building for production...')
spinner.start()

/**
 * @param packagename 包名称
 * 删除lib下的某个包
 */
var delPackage = function(packagename){
  return gulp.task(`del:${packagename}`, function(done){
    del([
      `lib/${packagename}/*`
    ], done())
  })
}

/**
 * @param packagename 包名称
 * 打包某个package
 */
var buildPackage = function(packagename){
  gulp.task(`build:${packagename}`, gulp.series(`del:${packagename}`, 'dealcss', function(done){
    let entry = path.join(__dirname, `./packages/${packagename}/index.js`)
    let output = {
      path: path.resolve(__dirname, `./lib/${packagename}`),
      filename: 'index.js',
      library: packagename,
      libraryTarget: 'umd',
      umdNamedDefine: true
    }

    let webpackConfig = merge(webpackprodconfig, {
      entry,
      output
    })

    webpack(webpackConfig, function(err, stats){
      spinner.stop();
      if (err) throw err;
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n')
      done()
    })
  }))
}

/**
 * 压缩src/index.scss, 并将压缩好的文件放到lib下面
 */
gulp.task('dealcss', function(){
  return gulp.src(__dirname + '/src/index.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(postcss([ autoprefixer({ browsers: ['Android >= 4.0', 'iOS >= 7'] }) ]))
    .pipe(gulp.dest(__dirname + '/lib'))
})

/**
 * 删除整个lib
 */
gulp.task('del', function(done){
  del([
    'lib/*'
  ], done())
})

/**
 * 打包所有的package
 */
gulp.task('build', gulp.series('del', 'dealcss', function(done){
  let entry = {}

  dirs.forEach(function(item){
    if(item !== 'components' && item !== 'scss'){
      entry[item] = path.join(__dirname, `./packages/${item}/index.js`)
    }
  })

  let output = {
    path: path.resolve(__dirname, './lib'),
    filename: '[name]/index.js',
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }

  let webpackConfig = merge(webpackprodconfig, {
    entry,
    output
  })

  webpack(webpackConfig, function(err, stats){
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n')
    done()
  })
}))

// 对lib下的每个包都循环生成多个task
dirs.forEach(function(file){
  delPackage(file)
  buildPackage(file)
})
