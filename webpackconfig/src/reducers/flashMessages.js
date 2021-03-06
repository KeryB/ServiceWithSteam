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
        default: return state;
    }
}