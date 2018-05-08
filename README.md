# 操作步骤
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

### socket.io
* yarn add socket.io
* yarn add socket.io-client


# react进阶
* shouldComponentUpdate(nextProps, nextState)   //update之前的回调
* this.setState()  //state中，包含队列的概念(当多个state改变时，render执行一次)，所以更新用setstate，而不是赋值。
* render中不要setstate，否则有死循环的风险
* 祖先组件给后代组件传递参数，可以使用prop-types，以此节省内存
```
class Child extends React.Component{
    static contextTypes = {
        user:PropTypes.string
    }
    render(){
        return <div>{this.context.user}</div>
    }
}
class Paren extends React.Component{
    static childContextTypes = {
        user:PropTypes.string
    }
    constructor(props){
        super(props)
        this.state = {user:'xxx'}
    }
    getChildContext(){
        return this.state
    }
}
```

### 高阶组件
* @装饰器
* 作用：属性代理，反向继承
### redux实现
### react-redux实现
### redux-thunk实现
### redux-arrayThunk实现
### react性能优化
* 构造函数的优化选择
```
()=>this.handleClick()      每次执行render会重新构建箭头函数
this.handleClick = this.handleClick.bind(this)      constructor执行一次
```
* 利用shouldComponentUpdate，对值变化与否监测，实现性能优化
```
shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.title === this.props.title){
        return false
    }
    return true
}
=======>方法一
React.Component改为React.PureComponent  直接实现（只做浅层比较，放弃性能低的深层比较）
=======>方法二
npm install immutable       值创建后不会被覆盖，比较大小 复杂度低 
const { Map, is } = require('immutable')
const map1 = Map({ a: 1, b: 2, c: 3 })
const map2 = map1.set('b', 50)
map1.get('b') + " vs. " + map2.get('b') // 2 vs. 50
is(map1,map2)
==>改造项目:
赋值：this.setState(this.state.set(this.state.set('num',this.state.get('num'))))
比较：shouldComponentUpdate(nextProps, nextState) {
        return is(nextProps,this.props)
    }
减少内存使用，并发安全，降低复杂度，便于比较    /  库大，对项目入侵严重==>yarn add seamless-immutable更精简的库
```
* url+'?react_perf' =>f12-performance=>UserTiming   //检测渲染性能

### redux性能优化
* yarn add reselect     备忘录，做缓存，不用重新计算
```
@connect(
  state=>({num:state}), 
  {。。。} 
)
====>改造：
import { createSelector } from 'reselect'
const numSelector = createSelector(
  state=>state,
  state=>({num:state})
)
@connect(
  state=>numSelector(state),
  {。。。} 
)
```

### react服务端渲染
* yarn add babel-cli    //内含babel-node使nodejs兼容es6
* 修改package.json
```
"scripts": {
    "server": "set NODE_ENV=test&&nodemon --exec babel-node server/server.js",  //windows
    //"server": "NODE_ENV=test nodemon --exec babel-node server/server.js", //linux
    "server_bak": "nodemon server/server.js",
    。。。
},
```
* 添加.babelrc，使nodejs支持React

### 服务端渲染方法--renderToString
* 修改server.js
```
import {renderToString} from 'react-dom/server'
。。。
app.use(function(req, res, next){  
    。。。
    const htmlRes = renderToString(<App></App>)
    res.send(htmlRes)
})
```
* 
### 客户端代码改造
* 创建app,jsx，将index.js中的路由相关dom抽离到其中
* 将index.js的结构复制到server.js中，使renderToString在服务端渲染index的基础数据
```
const store = createStore(reducer, compose(
    applyMiddleware(thunk)
))
let context = {}
const markup = renderToString(<Provider store={store}>
    <StaticRouter
        location={req.url}
        context={context}
    >
        <App></App>
    </StaticRouter>
</Provider>)
res.send(markup)
```
### 服务端代码改造
* npm i css-modules-require-hook --save      //服务器处理css的钩子
* 新建cmrh.conf.js
* npm install asset-require-hook --save
* 修改server.js
```
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'

assethook({
    extensions: ['png']
});
```
* 将public/index.html中的html结构放到server.js中，使服务器渲染的页面有基础结构
* 将js、css引入html结构当中,使其页面有css样式，和js事件
```
import staticPath from '../build/asset-manifest.json'

<Link rel="stylesheet" href="/${staticPath['main.css']}">
<script src="/${staticPath['main.js']}"></script>
```
* 添加<meta name="keywords" content="React,Redux,Imooc,聊天,SSR">，搜索引擎优化seo

# react16--renderToNodeStream
* server.js中  将renderToString改为renderToNodeStream，以字符串形式改为以流的形式，渲染速度会快三倍
* index.js中 ReactDOM.render改为ReactDOM.hydrate