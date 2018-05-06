### create-react-app
* npm install -g create-react-app //打包安装react环境
* create-react-app xxx项目名
* cd xxx
* npm run eject   //运行自定义配置webpack，否则react-scripts已经封装好了

### express 基于nodejs框架
* npm install express --save === yarn add express
* 配置server/server.js, 运行 node server.js
* yarn add cookie-parse     //express的cookie插件

### nodemon   修改后自启动nodejs
* npm install -g nodemon === yarn global add nodemon   //似乎只能用npm才行
* nodemon server.js //运行

### mongodb
* 官网下载windows版的msi，
* mongod --dbpath c:\data\db  //cmd中，在mongodb/bin目录下运行MongoDB 服务器
* mongo.exe //运行 mongo.exe 命令即可连接上 MongoDB,27017端口即运行mongodb
* 
* yarn add mongoose并配置server/server.js

### antd-mobile
* yarn add antd-mobile  
* yarn add babel-plugin-import  //按需加载的插件
* 在package.json中填入
```
"babel": {
    。。。
    "plugins":[
      ["import", { "libraryName": "antd-mobile", "style": "css" }]
    ]
  },
},
```
### redux
* npm install redux --save    //引入redux
* yarn add redux-thunk      //处理异步数据
* yarn add react-redux  //负责连接r-r
* yarn add babel-plugin-transform-decorators-legacy --dev //装饰器插件
* 在package.json中填入
```
"babel": {
    。。。
    "plugins":[
      ["transform-decorators-legacy"]
    ]
  },
},
```
### router
* yarn add react-router-dom
* Link链接跳转后的组件，其this.props会多出三个参数
```
* history
    ->history.push('/')  页面跳转
* location
    ->location.pathname  
* match
    ->match.params  //Link的 :参数  就在其中
    ->match.url  //路径
```
### axios拦截器
* yarn add axios    //  拦截器，拦截ajax再做统一处理
* 在package.json中填入
```
"babel": {
    。。。
},
"proxy":"http://localhost:9093"     //接口地址，解决跨域问题

```
### 更多插件
* yarn add cookie-parser    //cookie存储用户信息
* yarn add body-parser  //数据json格式
* yarn add utility  //md5加密
* yarn add prop-types   //react插件props校验工具
* 
* yarn add browser-cookies

# 高阶组件
* @装饰器
* 作用：属性代理，反向继承

### socket.io
* yarn add socket.io
* yarn add socket.io-client