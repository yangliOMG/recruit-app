/*
 * @Author: yangli 
 * @Date: 2018-04-27 16:13:37 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-28 17:21:35
 */
import {combineReducers} from 'redux'
import {user} from './redux/user.redux.jsx'
import {chatuser} from './redux/chatuser.redux.jsx'


export default combineReducers({user,chatuser})