const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
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

server.listen(9093,function(){
    console.log('node app start at port 9093')
})