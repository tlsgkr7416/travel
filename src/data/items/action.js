import {ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, KIND_ITEM, FIRST_ITEM, SEARCH_ITEM} from './actionType';

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

export const firstItem = (payload) => {
    return {
        type: FIRST_ITEM,
        payload,
    };
};

export const searchItem = (value) => {
    return {
        type: SEARCH_ITEM,
        value,
    };
};
