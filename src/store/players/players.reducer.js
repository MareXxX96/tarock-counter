import { PLAYERS_ACTION_TYPES } from "./players.types";

export const Player = (id, name, currentBalance) => ({
    id: id,
    name: name,
    currentBalance: currentBalance
  });

const PLAYERS_INITIAL_STATE = {
    playersArray: [
      {id: 0, name: 'Spieler 1', currentBalance: 0},
      {id: 1, name: 'Spieler 2', currentBalance: 0},
      {id: 2, name: 'Spieler 3', currentBalance: 0},
      {id: 3, name: 'Spieler 4', currentBalance: 0}
    ],
    idCounter: 0
  };
  
export const playersReducer = (state = PLAYERS_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
  
    switch (type) {
        case PLAYERS_ACTION_TYPES.SET_PLAYERS_ARRAY:
            return {
                ...state,
                playersArray: payload
            };
        case PLAYERS_ACTION_TYPES.SET_PLAYERS_ID_COUNTER:
            return {
                ...state,
                idCounter: payload
            }
      default:
        return state;
    }
  };