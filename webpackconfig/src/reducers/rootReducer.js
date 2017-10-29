import {combineReducers} from "redux";
import flashMessages from './flashMessages';
import authenticaton from './authenticaton';
import otherUserData from './otherUserData';
import search from './search';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    flashMessages,
    authenticaton,
    otherUserData,
    search
});