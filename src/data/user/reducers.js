import { ADD_MEMBER } from './actionTypes.js';

const initialState = {};

export default function user (state = initialState, action = {}) {
    switch (action.type) {
      case ADD_MEMBER:
        console.log(action.payload);
        const {email, name, id, password} = action.payload;
        return {
          email,
          name,
          id,
          password,
        };

      default:
        return state;
    }
  }