const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

const _filter = {'pwd':0,"__v":0}
Router.get('/list.do',function(req,res){
    // User.remove({},function(e,d){})
    const {type} = req.query
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
    })
})
Router.get('/getmsglist.do',function(req,res){
    const user = req.cookies.userid

    User.find({},function(e,userdoc){
        let users = {}
        userdoc.forEach(v=>{
            users[v._id] = {name:v.user, avatar:v.avatar}
        })
        Chat.find({"$or":[{from:user},{to:user}]},function(err,doc){
            if(!err){
                return res.json({code:0,msgs:doc, users:users})
            }
        })
    })
    
})
Router.post('/readmsg.do',function(req,res){
    const userid = req.cookies.userid
    const {from} = req.body
    Chat.update({from,to:userid},{'$set':{read:true}},{'multi':true},function(err,doc){
        if(!err){
            return res.json({code:0,num:doc.nModified})
        }
        return res.json({code:1,msg:'修改失败'})
    })
})
Router.post('/update.do',function(req,res){
    const userid = req.cookies.userid
    if(!userid){
        return res.json({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){    
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
})
Router.post('/login.do',function(req,res){
    const {user, pwd}  = req.body
    console.log(user,pwd)
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){    //第一个是查询条件，第二个是显示条件，
        if(!doc){                                                       //{'pwd':0}=>不显示该字段
            return res.json({code:1,msg:'用户名不存在或密码存在'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})
Router.post('/register.do',function(req,res){
    const {user, pwd, type}  = req.body
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }

        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错了'})
            }
            const {user, type, _id} = d
            res.cookie('userid', _id)
            return res.json({code:0,data:{user ,type, _id}})
        })

        // User.create({user,type,pwd:md5Pwd(pwd)},function(e,d){   //该方法不能拿到用户的id
        //     if(e){
        //         return res.json({code:1,msg:'后端出错了'})
        //     }
        //     return res.json({code:0})
        // })
    })
})
Router.get('/info.do',function(req,res){
    const {userid} = req.cookies
    if(!userid){
        return res.send({code:1})
    }
    User.findOne({_id:userid} ,_filter, function(err,doc){
        if(err){
            return res.json({code:1, msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})

function md5Pwd(pwd){
    const salt = 'imooc_is_good_3957x@UIWEGfas~~'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router