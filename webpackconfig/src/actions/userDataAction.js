import {api} from './api/Api';
import * as Types from  '../const/ActionTypes';

export function fetchUserDataById(id) {
    return dispatch => {

        dispatch({
            type: Types.FETCH_USER_DATA_BY_ID_REQUEST
        });

        api('/api/user/findById/' + id, 'GET').then(response => {
            dispatch(successUserData(response.result[0]));
        }, error => {

        })
    }
}

export function setOtherUserData(userData) {
    return {
        ype: Types.FETCH_USER_DATA_BY_ID_SUCCESS,
        userData
    }
}

function successUserData(userData) {
    return {
        type: Types.FETCH_USER_DATA_BY_ID_SUCCESS,
        userData
    }
}
export function errorUserData(errorResult) {
    return {
        type: Types.FETCH_USER_DATA_BY_ID_FAILED,
        errorResult
    }
}