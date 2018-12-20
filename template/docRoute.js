//拼装demo/router目录下的index.js文件
const fs = require('fs')
const path = require('path')
const docRouterPath = path.join(__dirname, '../doc/router')
const { tranformStr } = require('./units')
const colors = require( "colors")

module.exports = {
  docRouterIndexJs(files){
    let importstr = ''
    let routesstr = ''
    files.forEach(function(item){
      if(item !== 'components'){
        importstr += `import ${tranformStr(item)} from '../views/content/${tranformStr(item)}.md'` + '\n'
        routesstr += `{
    name: '${tranformStr(item)}',
    path: '/${tranformStr(item)}',
    component: ${tranformStr(item)}
  },
  `
      }
    })

    let str = `
import Introduce from '../views/content/Introduce.md'
import Develop from '../views/content/Develop.md'
${importstr}

export const routes = [
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
  {
    path: '/',
    redirect: '/Introduce'
  },
  ${routesstr}
]
`
    fs.unlinkSync(docRouterPath + '/index.js')
    fs.writeFile(docRouterPath + '/index.js', str, 'utf8', function(){
      console.log('doc/router/index.js修改成功'.green)
    })
  }
}