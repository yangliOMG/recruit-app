import React from 'react'
import {connect} from 'react-redux'

import {getUserList} from '../../redux/chatuser.redux.jsx'
import Userlist from '../userlist/userlist.jsx'


@connect(
    state=>state.chatuser,
    {getUserList}
)
class Genius extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        this.props.getUserList('genuis')
    }
    render(){
        return (
            <Userlist userList={this.props.userList}>
            </Userlist>
        )
    }
}

export default Genius;