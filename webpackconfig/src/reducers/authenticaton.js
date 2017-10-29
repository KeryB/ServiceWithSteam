import * as Types from '../const/ActionTypes';
import * as Roles from '../const/PathConstants';
import {putToken} from '../utils/tokenManager';

const initialState = {
    isAuthenticated: false,
    isFetching: false,
    errors: false,
    canTokenBeRefreshed: false,
    user: {}
};
export default (state = initialState, action = {}) => {
    switch (action.type) {

        case Types.MAKE_AUTH_REQUEST:
            return {
                ...initialState,
                isFetching: true,
            };
        case Types.MAKE_AUTH_SUCCESS:
            putToken(action.token);
            return {
                ...initialState,
                errors: false,
            };
        case Types.MAKE_AUTH_FAILED:
            return {
                ...initialState,
                errors: true,
                user: action.payload
            };
        case Types.FETCH_USER_DATA_REQUEST:
            return {
                ...initialState,
                isFetching: true
            };
        case Types.FETCH_USER_DATA_SUCCESS:
            return {
                isAuthenticated: true,
                errors: false,
                isFetching: false,
                user: action.user
            };
        case Types.FETCH_USER_DATA_FAILED:
            return {
                ...initialState,
                errors: true,
                isFetching: false
            };
        case Types.UPDATE_USER_DATA_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case Types.UPDATE_USER_DATA_SUCCESS:
            return {
                isFetching: false,
                isAuthenticated: true,
                errors: false,
                user: action.user
            };
        case Types.FETCH_USER_DATA_UPDATE:
            return {
                ...initialState
            };
        case Types.REFRESH_TOKEN_REQUEST:
            return {
                ...state,
                isFetching: true,
                canTokenBeRefreshed: true
            };
        case Types.REFRESH_TOKEN_SUCCESS:
            return{
                ...state,
                user:{},
                isFetching: false,
                canTokenBeRefreshed: false
            };
        case Types.REFRESH_TOKEN_ERROR:
            return{
                isFetching: false,
                canTokenBeRefreshed: false,
                errors: true
            };
        default:
            return state;
    }
}