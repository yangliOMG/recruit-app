const ADD_GUN = "加";

export function counter(state=11, action){
    switch(action.type){
        case ADD_GUN:
            return state + 1
        default:
            return state
    }
}

export function addGun(){
    return {type:ADD_GUN}
}

export function addGunAsync(){
    return dispatch=>{
        setTimeout(()=>{
            dispatch(addGun())
        },2000)
    }
}