import {SET_CURRENT_USER,GET_USER_DATA,UPDATE_USER_DATA} from '../const/ActionTypes'

export function login(token) {

   return dispatch =>{
        dispatch(setCurrentUser(token))
    }
}

export function setCurrentUser(user) {
    return{
        type:SET_CURRENT_USER,
        user
    }
}
export function getUserData(user) {
    return {
        type:GET_USER_DATA,
        user
    };
}
export function updateUserData(user) {
    return{
        type:UPDATE_USER_DATA,
        user
    };
}

export function refreshToken() {
    return {

    };
}
