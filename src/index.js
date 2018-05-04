import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './container/login/login.jsx';
import Register from './container/register/register.jsx';
import Bossinfo from './container/bossinfo/bossinfo.jsx';
import Geniusinfo from './container/geniusinfo/geniusinfo.jsx';
import AuthRoute from './component/authroute/authroute.jsx';
import Dashboard from './component/dashboard/dashboard.jsx';
import Chat from './component/chat/chat.jsx';
import reducer from './reducer.jsx'
import './index.css'

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route  path='/bossinfo' component={Bossinfo}></Route>
                    <Route  path='/geniusinfo' component={Geniusinfo}></Route>
                    <Route  path='/login' component={Login}></Route>
                    <Route  path='/register' component={Register}></Route>
                    <Route  path='/chat/:user' component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>)
    , 
    document.getElementById('root')
);