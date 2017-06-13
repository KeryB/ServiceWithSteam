import {SET_CURRENT_USER,GET_USER_DATA,UPDATE_USER_DATA} from '../const/ActionTypes'
import isEmpty from 'lodash/isEmpty'
import * as Roles from '../const/PathConstants';

const initialState = {
    isAuthenticated: false,
    isFetched:false,
    user: {}
};
export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.user),
                isFetched:false,
                user: action.user
            };
        case GET_USER_DATA:
            return{
                isAuthenticated: true,
                isFetched:true,
                user:action.user
            };
        case UPDATE_USER_DATA:
            return{
                ...initialState
            };
        default:
            return state;
    }
}