import { MODAL_ACTION_TYPES } from "./modal.types";

const MODAL_INITIAL_STATE = {
    page: 0,
    visibility: false
  };
  
export const modalReducer = (state = MODAL_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
  
    switch (type) {
        case MODAL_ACTION_TYPES.SET_MODAL_PAGE:
            return {
                ...state,
                page: payload
            };
        case MODAL_ACTION_TYPES.SET_VISIBILITY:
            return {
                ...state,
                visibility: payload
            }
      default:
        return state;
    }
  };