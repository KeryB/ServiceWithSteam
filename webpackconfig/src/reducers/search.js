import * as Types from '../const/ActionTypes';
import * as Roles from '../const/PathConstants';
import {putToken} from '../utils/tokenManager';

const initialState = {
    isFetching: false,
    errors: false,
    data:{}
};

export default (state = initialState, action = {}) => {
    switch (action.type){
        case Types.SEARCH_REQUEST:
            return{
                ...initialState,
                isFetching: true,
            };
        case Types.SEARCH_REQUEST_SUCCESS:
            return{
                ...initialState,
                data: action.data,
                isFetching: false,
            };
        default:
            return state;
    }
}