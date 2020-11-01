import {ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, KIND_ITEM, FIRST_ITEM, SEARCH_ITEM, REPLY_ITEM} from './actionType';

const initialState = [];

export default function item (state = initialState, action) {
    let id = action.payload;
    
    switch (action.type) {    //paylod를 넣어줄때 id값 하나만 넣어주면 나중에 힘들게 된다. 전체 객체를 넣어주기! 
        case ADD_ITEM:        //여기서 payload값이 헷갈리게 됨
            const items = state.filter((item) => {
                return item.itemId != action.payload.id
            });

            return [
                ...items,
                action.payload
            ];
            
         case DELETE_ITEM:
             return state.filter((item) => {
                 return item.itemId !== id;
             });
            
        case UPDATE_ITEM:
            return state.map((item) => {
                if (item.itemId === id) {
                    return {...item, heart: item.heart + 1, heartClickId: [...item.heartClickId, action.userId]};
                }
                return {...item};
            });
        
        case KIND_ITEM:
            return state.map((item) => {
                if (action.kind === item.kind) {
                    return {...item, isCheck: true}
                } else if (action.kind === '모두') {
                    return {...item, isCheck: true}
                }

                return {...item, isCheck: false}
            });

        case FIRST_ITEM:
             return [...action.payload];
        
        case SEARCH_ITEM:
            return state.map(item => {
                if (item.title.indexOf(action.value) > -1) {
                    return {...item, isCheck: true};
                } 
                
                return {...item, isCheck: false};
            });
        
        case REPLY_ITEM:
            return state.map((item) => {
                if (item.itemId === action.value.itemId) {
                    return {...item, replyPeople: [...action.value.replyPeople]};
                }
                return {...item}
            });
             
        default:
            return state;
    }
}