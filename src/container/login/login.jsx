import React from 'react'
import Logo from '../../component/logo/logo.jsx'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'
// import CounterDisplay from '../test/CounterDisplay'

import { Observable, of, from, fromEvent, Subject, Scheduler, AsyncSubject, } from 'rxjs'
import { mapTo, scan, throttleTime, concatMap, switchMap, mergeMap  } from 'rxjs/operators'
import './login.css';
// import './login.less';
// import './login.scss';
// import * as R from 'ramda'

@connect(
    state=>state.user,
    {login}
)
// @connect(({ testState }) => ({
//         msg:testState.msg
//     }),
//     (dispatch) => ({                 //写法二
//         fetchPosts: (state) => dispatch({ type: 'TO_LOGIN_IN', payload: state }),
//         fetchlists: (state) => dispatch({ type: 'TO_LIST', payload: state })
//     })
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
        // const { fetchPosts, fetchlists, state } = this.props;
        // fetchPosts(state)
        // fetchlists(state)
        // const { fetchPosts, state} = this.props          //写法二
        // fetchPosts(state)
    }
    componentDidMount(){
        var observable = 
            // Observable.create(function(observer) {
            //     observer.next('Jerry'); 
            //     setTimeout(() => {
            //         observer.next('RxJS 30 days!');
            //     }, 1)
            // })
            // from(['Jerry', 'Anna' ])
        //     // of('Jerry', 'Anna')
        //     // fromEvent(document.body, 'click')
            // new Subject()
        console.log("start")
        // // 订阅 observable  
        // observable.next(222,111)
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
        // observable.next(1222,1111)
        // from(['Jerry', 'Anna' ]).subscribe(observable)
        //-------异步一维化  concatMap switchMap mergeMap
        function getPostData() {
            return fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(res => res.json())
        }
        fromEvent(document.body, 'click').pipe(
            concatMap( e => from(getPostData()))
        ).subscribe(value => console.log(value));
        console.log("end");
    }
    render(){
        return (
                <div>
                    {(this.props.redirectTo&&this.props.redirectTo!=='/login')? <Redirect to={this.props.redirectTo}/> : null}
                    <Logo></Logo>
                    {/* <CounterDisplay/> */}
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