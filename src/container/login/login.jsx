import React from 'react'
import Logo from '../../component/logo/logo.jsx'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
// import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

// import {login} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form.jsx'
import CounterDisplay from '../test/CounterDisplay'

// import { Observable, of, from, fromEvent, Subject, Scheduler, AsyncSubject, } from 'rxjs'
// import { mapTo, scan, throttleTime  } from 'rxjs/operators'
import './login.css';
// import './login.less';
// import './login.scss';

// @connect(
//     state=>state.user,
//     {login}
// )
@imoocForm
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = { count: 0 };
        // this.subject = new Subject();
        // this.subject.pipe(
        //     throttleTime(1000),
        //     mapTo(2),
        //     scan((origin, next) => origin + next),
        // ).subscribe(x => 
        //     this.setState({ count: x })
        // )
    }
    register(){
        this.props.history.push('/counter');
        // this.setState({count:this.state.count+1})
        // this.setState( ({count}) => ({+
        //     count: count+1
        // }))
        // this.setState( (prevState, props) => {
        //     return console.log(prevState, props)
        // })
    }
    handleLogin(){
        this.props.login(this.props.state)
    }
    
    render(){
        // var observable = 
        //     // Observable.create(function(observer) {
        //     //     observer.next('Jerry'); 
        //     //     observer.next('Anna');observer.complete();
        //     //     observer.error(observer)
        //     //     setTimeout(() => {
        //     //         observer.next('RxJS 30 days!');
        //     //     }, 1)
        //     // })
        //     // from(['Jerry', 'Anna' ])
        //     // of('Jerry', 'Anna')
        //     // fromEvent(document.body, 'click')
        //     new Subject()
        // console.log("start")
        // // 订阅 observable  
        // observable.next(222)
        // observable.subscribe( {
        //     next: function(value) {
        //         console.log(value);
        //     },
        //     error: function(error) {
        //         console.log(error)
        //     },
        //     complete: function() {
        //         console.log('complete')
        //     }
        // })
        // observable.next(1222)
        // from(['Jerry', 'Anna' ]).subscribe(observable)
        // console.log("end");
        return (
                <div>
                    {(this.props.redirectTo&&this.props.redirectTo!=='/login')? <Redirect to={this.props.redirectTo}/> : null}
                    <Logo></Logo>
                    <CounterDisplay/>
                    {/* <div className="test box post">test
                        <div className="as"></div>
                    </div> */}
                    <WingBlank>
                        {this.props.msg? <p className="error-msg">{this.props.msg}</p>:null}
                        <List>
                            <InputItem 
                                onChange={v=>this.props.handleChange('user',v)}
                                >用户</InputItem>
                            <InputItem type="password"
                                onChange={v=>this.props.handleChange('pwd',v)}
                                >密码</InputItem>
                        </List>
                        <Button type='primary' onClick={()=>this.handleLogin()}>登录</Button>
                        <WhiteSpace/>
                        <Button onClick={()=>this.register()} type='primary'>注册</Button>
                        {/* <Button onClick={event => this.subject.next(event)} type='primary'>{this.state.count}</Button> */}
                    </WingBlank>
                </div>
        )
    }
}

export default Login;