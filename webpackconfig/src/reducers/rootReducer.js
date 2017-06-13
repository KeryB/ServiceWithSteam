import {combineReducers} from "redux";
import flashMessages from './flashMessages';
import authenticaton from './authenticaton';


export default combineReducers({
    flashMessages,
    authenticaton
});