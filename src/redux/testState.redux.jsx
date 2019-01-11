const ERROR_MSG = 'ERROR_MSG'

const initState = {
    redirectTo:'',
    msg:'',
    user:'',
    type:''
}
export function testState(state=initState, action){
    switch(action.type){
        case ERROR_MSG:
            return {...state,msg:action.msg }
        default:
            return state
    }
}
