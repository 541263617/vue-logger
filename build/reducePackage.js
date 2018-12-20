#!/usr/bin/env node
require('shelljs/global')

const fs = require('fs')
const path = require('path')
const { tranformStr } = require('../template/units')
const { packageIndexJs } = require('../template/srcIndex')
const { demoRouterIndexJs } = require('../template/demoRoute')
const { docRouterIndexJs } = require('../template/docRoute')
const colors = require( "colors")
// 获取要打包的包名称
const packageName = process.argv.splice(2)[0]
const packagesPath = path.join(__dirname, '../packages')
const docPath = path.join(__dirname, '../doc')
const demoPath = path.join(__dirname, '../demo')
const tranformPackageName = tranformStr(packageName)

const templateJs = `export { default } from './src/${tranformPackageName}.vue'`
const templateVue = `
<template>

</template>

<script>
export default {
  name: '${tranformPackageName}',
  data(){
    return {
      
    }
  }
}
</script>
`

// 读取packages下面的所有组件名称
fs.readdir(packagesPath, function (err, files) {
  if(err) {throw err}
  if(files.includes(packageName)){
    // 在packages目录下面删除包
    rm('-rf', `${packagesPath}/${packageName}`)
    // 在doc/views/content目录下删除文档
    rm('-rf', `${docPath}/views/content/${tranformPackageName}.md`)
    // 在demo/views下面生成案例组件
    rm('-rf', `${demoPath}/views/${tranformPackageName}.vue`)

    let arr = files.filter(item => {
      return item !== packageName
    })

    packageIndexJs(arr)
    demoRouterIndexJs(arr)
    docRouterIndexJs(arr)
  }
  else{
    console.warn('没有找到，请检查包名称'.red)
  }
})

