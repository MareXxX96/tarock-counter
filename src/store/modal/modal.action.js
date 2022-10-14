import { createAction } from "../../utils/reducer/reducer.utils";
import { MODAL_ACTION_TYPES } from "./modal.types";

export const setModalPage = (page) => 
    createAction(MODAL_ACTION_TYPES.SET_MODAL_PAGE, page);

export const setVisible = (visibilityBool) => 
    createAction(MODAL_ACTION_TYPES.SET_VISIBILITY, visibilityBool)