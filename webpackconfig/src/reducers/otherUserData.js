import * as Types from '../const/ActionTypes';

const initialState={
    isFetching:false,
    isFetched:false,
    error:'',
    user:{}
};

export default (state=initialState, action = {}) => {
    switch (action.type){

        case Types.FETCH_USER_DATA_BY_ID_REQUEST:
            return{
                ...initialState,
                isFetched:true,
                isFetching:true
            };
        case Types.FETCH_USER_DATA_BY_ID_SUCCESS:
            return{
                ...initialState,
                isFetching:false,
                isFetched:true,
                user:action.userData
            };
        case Types.FETCH_USER_DATA_BY_ID_FAILED:
            return{
                ...initialState,
                error:action.errorResult
            };
        default: return state;
    }
}
