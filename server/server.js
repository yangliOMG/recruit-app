import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
import model from './model'

import React from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk';
import {StaticRouter} from 'react-router-dom';
import App from '../src/app.jsx'
import reducer from '../src/reducer.jsx'

import {renderToString,renderToNodeStream} from 'react-dom/server'
import staticPath from '../build/asset-manifest.json'

assethook({
    extensions: ['png'],
    limit: 9000
});


const Chat = model.getModel('chat')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)     //io与express关联起来了

io.on('connection',function(socket){        //socket当前连接的请求，io是全局的连接请求
    socket.on('sendmsg',function(data){ 

        const {from,to,msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))     //发送信息
        })

        // console.log(data);
        // io.emit('recvmsg',data)
    })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter) //开启中间键？？
app.use(function(req, res, next){   //把不是/user(接口)，不是/static(静态资源)，都映射到index.html
    if(req.url.startsWith('/user/') || req.url.startsWith('/static')){
        return next()
    }
    // return res.sendFile(path.resolve('build/index.html'))



    const store = createStore(reducer, compose(
        applyMiddleware(thunk)
    ))
    let context = {}
    // const markup = renderToString(<Provider store={store}>
    //     <StaticRouter
    //         location={req.url}
    //         context={context}
    //     >
    //         <App></App>
    //     </StaticRouter>
    // </Provider>)
    const obj={
        '/msg':'React聊天消息列表',
        '/boss':'boss查看牛人列表'        
    }
    res.write(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
        <meta name="theme-color" content="#000000">
        <title>React App</title>
        <Link rel="stylesheet" href="/${staticPath['main.css']}">
        <meta name="keywords" content="React,Redux,Imooc,聊天,SSR">
        <meta name="description" content="${obj[req.url]}">
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">`)
    const markupStream = renderToNodeStream(
        <Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}
            >
                <App></App>
            </StaticRouter>
        </Provider>)
    markupStream.pipe(res,{end:false})
    markupStream.on('end',()=>{
        res.write(`</div>
            <script src="/${staticPath['main.js']}"></script>
        </body>
        </html>`)
        res.end()
    })
    // const pageHtml = `<!DOCTYPE html>
    // <html lang="en">
    //   <head>
    //     <meta charset="utf-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    //     <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
    //     <meta name="theme-color" content="#000000">
    //     <title>React App</title>
    //     <Link rel="stylesheet" href="/${staticPath['main.css']}">
    //     <meta name="keywords" content="React,Redux,Imooc,聊天,SSR">
    //     <meta name="description" content="${obj[req.url]}">
    //   </head>
    //   <body>
    //     <noscript>
    //       You need to enable JavaScript to run this app.
    //     </noscript>
    //     <div id="root">${markup}</div>
    //     <script src="/${staticPath['main.js']}"></script>
    //   </body>
    // </html>
    // `
    // res.send(pageHtml)
})
app.use('/',express.static(path.resolve('build')))
server.listen(9093,function(){
    console.log('node app start at port 9093')
})