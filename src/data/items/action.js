import {ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, KIND_ITEM} from './actionType';

export const itemAdd = (payload) => {
    return {
        type: ADD_ITEM,
        payload,
    };
};

export const itemDelete = (payload) => {
    return {
        type: DELETE_ITEM,
        payload,
    };
};

export const itemUpdate = (payload) => {
    return {
        type: UPDATE_ITEM,
        payload,
    };
};

export const kindItem = (kind) => {
    return {
        type: KIND_ITEM,
        kind,
    };
};
