import {ADD_FLASH_MESSAGE , DELETE_FLASH_MESSAGE} from '../const/ActionTypes';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex'

export default  (state = [], action = {}) => {
    switch (action.type){
        case ADD_FLASH_MESSAGE:
            return[
                ...state,
                {
                    id:shortid.generate(),
                    type: action.message.type,
                    text: action.message.text
                }
            ];
        case DELETE_FLASH_MESSAGE:
            const index = findIndex(state,{id:action.id});
            console.log(index);
            console.log(...state.slice(0,index));
            console.log(...state.slice(index+1));
            if(index>=0){
                return[
                    ...state.slice(0,index),
                    ...state.slice(index+1)
                ];
            }
            return state;
        default: return state;
    }
}