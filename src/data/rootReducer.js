import { combineReducers } from 'redux';
import user from './user/reducers.js';
import item from './items/reducers.js';

export default combineReducers({
    user,
    item,
});