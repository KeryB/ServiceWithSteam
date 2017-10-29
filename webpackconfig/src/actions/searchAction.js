import {api} from './api/Api';
import * as Types from  '../const/ActionTypes';
import {buildUrl} from "../utils/UrlUtils";

export function searchRequest(data) {
    return dispatch => {

        dispatch({
            type: Types.SEARCH_REQUEST
        });
        api('/api/user/findUsers', 'POST', data).then( response =>{
            console.log(response.result[0]);
            dispatch(successSearchRequest(response.result[0]));
        }, error => {
            errorSearchRequest(error)
        })

    }
}

function successSearchRequest(data) {
    return {
        type: Types.SEARCH_REQUEST_SUCCESS,
        data
    }
}

function errorSearchRequest(error) {
    return {
        type: Types.SEARCH_REQUEST_ERROR,
        error
    }
}