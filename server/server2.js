//mongoDB 相关
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'


const PORT = 9090

const app = express()
const server = require('http').Server(app)

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)  

server.listen(PORT,function(){
    console.log('node app start at port '+PORT)
})