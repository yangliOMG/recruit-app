import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'

const ERROR_MSG = 'ERROR_MSG'

const initState = {
    msg:'asd',
}
export function test(state=initState, action){
    switch(action.type){
        case ERROR_MSG:
            return {...state,msg:action.msg }
        default:
            return state
    }
}

// function* login({user,pwd}){
//     console.log('Hello login!',user,pwd);
//     yield call(delay, 1000)
//     yield put({ type: 'ERROR_MSG',msg:'用户名密码必须输入' })
// }

// export default {
//   namespace: 'test',

//   state: {
//     msg: 'asd',
//   },

//   effects: {
//     *fetchProvince(_, { call, put }) {
//       yield put({
//         type: 'changeLoading',
//         payload: true,
//       });
//     },
//   },

//   reducers: {
//     changeLoading(state, action) {
//       return {
//         ...state,
//         isLoading: action.payload,
//       };
//     },
//   },
// };
