//拼装demo/router目录下的index.js文件
const fs = require('fs')
const path = require('path')
const demoRouterPath = path.join(__dirname, '../demo/router')
const { tranformStr } = require('./units')
const colors = require( "colors")

module.exports = {
  demoRouterIndexJs(files){
    let importstr = ''
    let routesstr = ''
    files.forEach(function(item){
      if(item !== 'components'){
        let componentName = tranformStr(item)
        importstr += `import ${componentName} from '../views/${componentName}.vue'` + '\n'
        routesstr += `{
    name: '${componentName}',
    path: '/${componentName}',
    component: ${componentName}
  },
  `
      }
    })

    let str = `
import Vue from 'vue'
import Router from 'vue-router'
import Introduce from '../views/Introduce.vue'
import Develop from '../views/Develop.vue'
${importstr}

Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: {
      name: 'Home'
     }
  },
  {
    path: '/Introduce',
    name: 'Introduce',
    component: Introduce
  },
  {
    path: '/Develop',
    name: 'Develop',
    component: Develop
  },
  ${routesstr}
]

export default new Router({
  routes
})
`
    fs.unlinkSync(demoRouterPath + '/index.js')
    fs.writeFile(demoRouterPath + '/index.js', str, 'utf8', function () {
      console.log('demo/router/index.js修改成功'.green)
    })
  }
}