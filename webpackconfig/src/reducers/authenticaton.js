import * as Types from '../const/ActionTypes';
import * as Roles from '../const/PathConstants';
import {putToken} from '../utils/tokenManager';

const initialState = {
    isAuthenticated: false,
    isFetching:false,
    errors:false,
    user: {}
};
export default (state = initialState, action = {}) => {
    switch (action.type) {

        case Types.MAKE_AUTH_REQUEST:
            console.log(action);
            return{
                ...initialState,
                isFetching:true,
            };
        case Types.MAKE_AUTH_SUCCESS:
            console.log(action.token);
            putToken(action.token);
            return{
                ...initialState,
                errors:false
            };
        case Types.MAKE_AUTH_FAILED:
            return{
                ...initialState,
                errors:true,
                user:action.payload
            };
        case Types.FETCH_USER_DATA_REQUEST:
            return{
                ...initialState,
                isFetching:true
            };
        case Types.FETCH_USER_DATA_SUCCESS:
            return{
                isAuthenticated:true,
                errors:false,
                isFetching:false,
                user:action.user
            };
        case Types.FETCH_USER_DATA_FAILED:
            return{
                ...initialState,
                errors:true,
                isFetching:false
            };
        case Types.UPDATE_USER_DATA_REQUEST:
            return{
                ...state,
                isFetching:true
            };
        case Types.UPDATE_USER_DATA_SUCCESS:
            return{
                isFetching:false,
                isAuthenticated:true,
                errors:false,
                user:action.user
            };
        case Types.FETCH_USER_DATA_UPDATE:
            return{
                ...initialState
            };
        default:
            return state;
    }
}