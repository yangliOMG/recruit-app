import React from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import AvatarSelector from '../../component/avatar-selector/avatar-selector.jsx'
import {update} from '../../redux/user.redux'

@connect(
    state=>state.user,
    {update}
)
class Geniusinfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
            desc:'',
            company:'',
            money:''
        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect&&redirect!==path ? <Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark" >牛人完善信息页面</NavBar>
                <AvatarSelector
                    selectAvatar={avatar=>this.handleChange('avatar',avatar)}
                ></AvatarSelector>
                <InputItem onChange={v=>this.handleChange('title',v)}>
                   求职职位
                </InputItem>
                <TextareaItem 
                    onChange={v=>this.handleChange('desc',v)}
                    rows={3}
                    autoHeight
                    title={'个人简介'}>
                </TextareaItem>
                <Button type='primary'
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                >保存</Button>
            </div>
        )
    }
}

export default Geniusinfo;