#### 开发指南

##### 步骤一
``` html
// 组件名推荐使用-连接， 比如cell-swipe, 执行以下命令后只需关注组件本身开发
npm run add <组件名>
```

##### 步骤二
- 在packages/<组件名>/src/index.js 中完成组件开发

##### 步骤三
- 在demo/views/<组件名>.vue 中编写组件case

##### 步骤四
- 在doc/views/content/<组件名>.md 中编写组件文档

##### 执行打包
``` html
// 第一种方式，以cell-swipe为例，首先会将组件打入dist/index.js中，其次将packages中的cell-swipe打包，并在lib下面生成对应的js和css文件
npm run sigle <组件名>

//第二种方式，将组件打入dist/index.js中，将packages中的所有组件都打包，并在lib下面生成对应的js和css文件
npm run build
```

#### 命令行解析
``` javascript
// 添加新组件
npm run add <component-nam>

// 删除要开发的组件
npm run reduce <component-name>

// 执行单元测试,打开test/unit/coverage/Icov-report/index.html，会看到测试结果
npm run test

// 热加载文档页面
npm run doc_dev

// 热加载案例页面
npm run demo_dev

// 打包文档
npm run doc_build

// 打包案例
npm run demo_build

// 单个组件打包，将所有组件打包到dist/index.js和dist/index.css中， 并且将该组件单独打包到lib下
npm run sigle <component-name>

// 所有组件打包, 将所有组件打包到dist/index.js和dist/index.css中， 并且将所有组件都单独打包，并在lib下生成对应的文件
npm run build

// 将组件上传到私库,上传的文件在package.json中定义，目前上传的文件为dist lib packages package.json README.md
npm run prepublishOnly
```
