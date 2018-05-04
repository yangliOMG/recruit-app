/*
 * @Author: yangli 
 * @Date: 2018-04-28 09:57:53 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-05-04 14:12:22
 */
export function getRedirectPath({type,avatar}){
    let url = (type==='boss')?'/boss':'/genius'
    if(!avatar){
        url += 'info'
    }
    return url
}

export function getChatId(userId, targetId){
    return [userId,targetId].sort().join('_')
}