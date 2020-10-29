import { ADD_MEMBER } from './actionTypes.js';

const initialState = {};

export default function user (state = initialState, action = {}) {
    switch (action.type) {
      case ADD_MEMBER:
        const {email, name, _id, password} = action.payload;
        return {
          email,
          name,
          _id,
          password,
        };

      default:
        return state;
    }
  }