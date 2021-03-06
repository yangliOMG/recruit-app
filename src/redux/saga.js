import { delay } from 'redux-saga'
import { put, call, all, fork, take } from 'redux-saga/effects'

export function * rootSaga(){
    yield all([
        fork(watchIsLogin),
        fork(watchlist),
    ]);
}

export function* watchIsLogin(){
    while(true){
        const action1 = yield take('TO_LOGIN_IN')
        const { user, pwd } = action1.payload
        yield call(delay, 2000)
        if(!user||!pwd){
            yield put({ type: 'ERROR_MSG',msg:'用户名密码必须输入' })
        }
    }

}
export function* watchlist(){
    while(true){
        const action1 = yield take('TO_LIST')
        const { user, pwd } = action1.payload
        yield call(delay, 1000)
        if(!user||!pwd){
            yield put({ type: 'ERROR_MSG',msg:'list' })
        }
    }

}
