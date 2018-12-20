#!/usr/bin/env node

const {exec} = require('child_process')
const ora = require('ora')

const spinner = ora('正在生产环境打包')
spinner.start()

// 获取要打包的包名称
let packageName = process.argv.splice(2)[0]
exec(`gulp build:${packageName}`, function(error, stats){
  spinner.stop()
  if (error) throw error
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
})
