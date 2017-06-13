import {tokenHeader} from '../actions/api/Api';

export function putToken(token) {
    window.localStorage.setItem(tokenHeader,token)
}

export function getToken() {
    return window.localStorage.getItem(tokenHeader)
}
export function deleteToken() {
    return window.localStorage.removeItem(tokenHeader);
}