import {ADD_ITEM, DELETE_ITEM, UPDATE_ITEM} from './actionType';

const initialState = [];

export default function item (state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return [
                ...state,
                action.payload
            ];
            
         case DELETE_ITEM:
            
            
        case UPDATE_ITEM:
            
            
    
        default:
            return state;
    }
}