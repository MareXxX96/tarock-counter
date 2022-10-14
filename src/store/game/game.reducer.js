import { GAME_ACTION_TYPES } from "./game.types";

const GAME_INITIAL_STATE = {
    rounds: [],
    roundCount: 0
  };
  
export const gameReducer = (state = GAME_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
  
    switch (type) {
        case GAME_ACTION_TYPES.SET_ROUND_ITEMS:
            return {
                ...state,
                rounds: payload
            };
        case GAME_ACTION_TYPES.SET_ROUND_COUNT:
            return {
                ...state,
                roundCount: payload
            }
      default:
        return state;
    }
  };