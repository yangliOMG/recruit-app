/*
 * @Author: yangli 
 * @Date: 2018-04-27 16:13:37 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-12-17 12:09:49
 */
import {combineReducers} from 'redux'
import {user} from './redux/user.redux.jsx'
import {chatuser} from './redux/chatuser.redux.jsx'
import {chat} from './redux/chat.redux.jsx'


export default combineReducers({user,chatuser,chat})