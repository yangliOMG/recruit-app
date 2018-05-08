import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';

// import browserCookie from 'browser-cookies'
// import {Redirect} from 'react-router-dom'
// import {logoutSubmit} from '../../redux/user.redux.jsx'
@connect(
    state=>state
)
class Msg extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //     }
    // }
    getLast(arr){
        return arr[arr.length-1]
    }
    render(){

        const msgGroup = {}
        const userid = this.props.user._id
        const userinfo = this.props.chat.users

        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })
        return (
            <div>
                <QueueAnim type="left" duration="500">
                {chatList.map(v=>{
                    const lastItem = this.getLast(v)
                    const targetId = v[0].from === userid?v[0].to:v[0].from 
                    const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
                    if(!userinfo[targetId]){
                        return null
                    }
                    return (
                    <List key={lastItem._id}>
                        <List.Item 
                            extra={<Badge text={unreadNum}></Badge>}
                            thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                            arrow="horizontal"
                            onClick={()=>{
                                this.props.history.push(`/chat/${targetId}`)
                            }}
                        >
                            {lastItem.content}
                            <List.Item.Brief>{userinfo[targetId].name}</List.Item.Brief>
                        </List.Item>
                    </List>)
                })}
                </QueueAnim>
            </div>
        )
    }
}

export default Msg;