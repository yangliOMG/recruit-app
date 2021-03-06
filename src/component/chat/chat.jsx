import React from 'react'
import {List, InputItem, NavBar,Icon,Grid } from 'antd-mobile'
import {connect} from 'react-redux'
import QueueAnim from 'rc-queue-anim';

import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux.jsx'
import { getChatId } from '../../util';


@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {text: '',msg:[],showEmoji:false}
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    componentWillUnmount(){
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }
    fixBug(){
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 50);
    }
    handleSubmit(){
        // socket.emit('sendmsg',{text:this.state.text})
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({text: ''})
    }
    render(){
        const emoji = `😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 
        😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 
        🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 
        😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 
        👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 
        😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  
        💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀`.replace(/[\r\n]/g,"").split(' ').filter(v=>v).map(v=>({text:v}))

        
        const userid = this.props.match.params.user
        const users = this.props.chat.users
        if(!users[userid]){
            return null
        }
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
        return  (
            <div id='chat-page'>
                <NavBar  
                    mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={()=>this.props.history.goBack()}
                >
                    {users[userid].name}
                </NavBar >
                <QueueAnim type="left" className="abs">
                    {chatmsgs.map(v=>{
                        const avatar = require(`../img/${users[v.from].avatar}.png`)
                        return v.from === userid?(
                            <List key={v._id}>
                                <List.Item thumb={avatar}>{v.content}</List.Item>
                            </List>
                        ):(
                            <List key={v._id}>
                                <List.Item extra={<img src={avatar} alt="" />} className='chat-me'>{v.content}</List.Item>
                            </List>
                        )
                    })}
                </QueueAnim>
                <div className='stick-footer'>  
                {/* {this.props.match.params.user} */}
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra={
                                <div>
                                    <span className='emoji'  role="img" aria-labelledby="emoji"
                                        onClick={()=>{
                                            this.setState({showEmoji:!this.state.showEmoji})
                                            this.fixBug()
                                    }}>😄</span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji?
                    <Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el=>this.setState({text:this.state.text + el.text})}
                    />:null}
                    
                </div>
            </div>
        )
    }
}

export default Chat;