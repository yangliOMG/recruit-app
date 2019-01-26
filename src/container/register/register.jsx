import React from 'react'
import {List, InputItem,Radio, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {regisger} from '../../redux/user.redux.jsx'
import Logo from '../../component/logo/logo.jsx'
import imoocForm from '../../component/imooc-form/imooc-form.tsx'

@connect(
    state=>state.user,
    {regisger}
)
@imoocForm
class Register extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         user:'',
    //         pwd:'',
    //         repeatpwd:'',
    //         type:'genuis'
    //     }
    // }
    componentDidMount(){
        this.props.handleChange('type','genuis')
    }
    handleRegister(){
        // this.props.history.push('/register');
        this.props.regisger(this.props.state)
    }
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <List>
                    {this.props.msg?
                        <p className="error-msg">{this.props.msg}</p>:null
                    }
                    <InputItem
                        onChange={v=>this.props.handleChange('user',v)}
                    >用户名</InputItem>
                    <InputItem  type="password"
                        onChange={v=>this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                    <InputItem  type="password"
                        onChange={v=>this.props.handleChange('repeatpwd',v)}
                    >确认密码</InputItem>
                    <RadioItem 
                        checked={this.props.state.type==='genuis'}
                        onChange={()=>this.props.handleChange('type','genuis')}
                        >
                        牛人
                    </RadioItem>
                    <RadioItem 
                        checked={this.props.state.type==='boss'}
                        onChange={()=>this.props.handleChange('type','boss')}
                    >
                        boss
                    </RadioItem>
                    <Button onClick={()=>this.handleRegister()} type='primary'>注册</Button>
                    
                </List>
            </div>
        )
    }
}

export default Register;