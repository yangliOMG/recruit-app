import React from 'react'
import { Route, Switch} from 'react-router-dom';

import Login from './container/login/login.jsx';
import Register from './container/register/register.jsx';
import Bossinfo from './container/bossinfo/bossinfo.jsx';
import Geniusinfo from './container/geniusinfo/geniusinfo.jsx';
import AuthRoute from './component/authroute/authroute.jsx';
import Dashboard from './component/dashboard/dashboard.jsx';
import Chat from './component/chat/chat.jsx';

import Counter from './container/test/Counter';
import { Provider} from './container/test/context'

class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasError:false,
            counter :{
                value:0,
                inc: this.inc,
                dec: this.dec
            }
        }
    }
    inc = () => {
        this.setState( ({counter}) =>({
            counter: {
                ...counter,
                value: counter.value + 1
            }
        }))
    }
    dec = () => {
        this.setState( ({counter}) =>({
            counter: {
                ...counter,
                value: counter.value - 1
            }
        }))
    }
    componentDidCatch(err,info){
        this.setState({
            hasError:true
        })
    }
    render(){
        return this.state.hasError?
        <h2>页面出错了</h2>
        :(
            <div>
                {/* <AuthRoute></AuthRoute> */}
                {/* <Provider value={this.state.counter}> */}
                    <Switch>
                        <Route  path='/bossinfo' component={Bossinfo}></Route>
                        <Route  path='/geniusinfo' component={Geniusinfo}></Route>
                        <Route  path='/login' component={Login}></Route>
                        <Route  path='/register' component={Register}></Route>
                        {/* <Route  path='/counter' component={Counter}></Route> */}
                        <Route  path='/chat/:user' component={Chat}></Route>
                        <Route component={Dashboard}></Route>
                    </Switch>
                {/* </Provider> */}
            </div>
        )
    }
}
export default App