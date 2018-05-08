import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import { Route, Redirect} from 'react-router-dom' 
import QueueAnim from 'rc-queue-anim';


import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss.jsx'
import Genius from '../../component/genius/genius.jsx'
import User from '../../component/user/user.jsx'
import Msg from '../../component/msg/msg.jsx'
import {getMsgList,recvMsg} from '../../redux/chat.redux.jsx'

@connect(
    state=>state,
    {getMsgList,recvMsg}
)
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    render(){
        const {pathname}  = this.props.location
        const user = this.props.user
        const navList = [
            {
                path:'/genius',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Genius,
                hide:user.type==='genuis',
                type:'left'
            },{
                path:'/boss',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Boss,
                hide:user.type==='boss',
                type:'left'
            },{
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg,
                type:'alpha'
            },{
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User,
                type:'right'
            }
        ]
        const page = navList.find(v=>v.path===pathname)
        return page?(
            <div>
                <NavBar className='fixd-header' mode='dard'>{page.title}</NavBar>
                <div style={{marginTop:45}}>
                    <QueueAnim type={page.type}>
                        {/* <Switch>
                            {navList.map(v=> */}
                                <Route key={page.path} path={page.path} component={page.component}></Route>
                            {/* )}
                        </Switch> */}
                    </QueueAnim>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        ): <Redirect to='/msg'></Redirect>
    }
}

export default Dashboard;