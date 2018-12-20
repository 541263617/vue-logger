#### 使用指南

##### 安装
``` javascript
npm install @mcfly001/vue-ui --save-dev
```

##### 引入组件
- 方式一(推荐)： 使用  [babel-plugin-component](https://www.npmjs.com/package/babel-plugin-component)
``` javascript
// 安装babel-plugin-component
npm install babel-plugin-component --save-dev
```
``` javascript
// 在.babelrc 下面添加插件配置
{
    plugin: [
        xxx,
        [
            'component', {
                libraryName: "@mcfly001/vue-ui",
                style: true,
            },
            "@mcfly001/vue-ui"
        ]
    ]
}
```

接下来你可以在代码中引入组件了， 插件会实现按需加载了
``` javascript
import { CellSwipe } from '@mcfly001/ui'
import '@mcfly001/vue-ui/lib/index.css'
```

- 方式二： 导入所有组件(该方式不允许使用babel-plugin-component)
``` javascript
// 在main.js中引入插件
import Vue from 'vue'
import * as ui from '@mcfly001/ui'
import '@mcfly001/ui/dist/index.css'

Vue.use(ui)
```

