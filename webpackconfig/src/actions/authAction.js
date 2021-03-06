import * as Types from  '../const/ActionTypes';
import {api} from './api/Api';
import {putToken,deleteToken, getToken} from '../utils/tokenManager';
import {browserHistory} from 'react-router';

export function makeAuth(data) {
    return dispatch => {

        dispatch({
            type: Types.MAKE_AUTH_REQUEST,
        });

        api('/api/auth/createAuthToken', 'POST', data).then(response => {

            if (response.result[0].token) {
                dispatch(successAuth(response.result[0].token));
                browserHistory.push('/');
            }
        }, error => {
            dispatch(errorAuth(error));
        });
    }
}
function successAuth(token) {
    return {
        type: Types.MAKE_AUTH_SUCCESS,
        token
    }
}

function errorAuth(error) {
    return {
        type: Types.MAKE_AUTH_FAILED,
        payload: error
    }

}

export function refreshToken(){
    return dispatch =>{
        dispatch ({
            type: Types.REFRESH_TOKEN_REQUEST
        });
        api('/api/auth/refresh_token', 'POST', getToken()).then(response => {
            dispatch(successRefreshToken());
            deleteToken();
            const token = response.result[0].token;
            putToken(token);
        }, error =>{
            dispatch(errorRefreshToken());
        })
    }
}

function successRefreshToken() {
    return {
        type: Types.REFRESH_TOKEN_SUCCESS
    }
}

function errorRefreshToken() {
    return {
        type: Types.REFRESH_TOKEN_ERROR
    }
}

export function fetchUserData() {

    return dispatch => {
        dispatch({
            type: Types.FETCH_USER_DATA_REQUEST,
        });
        api('/api/user/getData', 'POST').then(response => {
            console.log(response);
           dispatch(successUserData(response.result[0]))
        },error=>{
            dispatch(errorUserData());
            deleteToken();
        })
    };
}
function successUserData(user) {
    return {
        type: Types.FETCH_USER_DATA_SUCCESS,
        user
    }
}
function errorUserData() {
    return{
        type:Types.FETCH_USER_DATA_FAILED
    }
}

export function updateUserData(user) {
    return dispatch=>{
        dispatch({
            type:Types.UPDATE_USER_DATA_REQUEST
        });
        api('/api/user/updateUserData', 'POST',user).then(response =>{
            dispatch(successUpdateUserData(response.result[0]))
        },error =>{
            console.log(error);
        })
    };
}

function successUpdateUserData(user) {
    return{
        type:Types.UPDATE_USER_DATA_SUCCESS,
        user
    }
}
function errorUpdateUserData(user) {
    return{

    }
}
export function makeLogoutUser(user) {
    return {
        type: Types.FETCH_USER_DATA_UPDATE,
        user
    };
}

