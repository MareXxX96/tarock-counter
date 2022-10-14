import { createAction } from "../../utils/reducer/reducer.utils";
import { PLAYERS_ACTION_TYPES } from "./players.types";

export const setPlayersIdCounter = (no) => 
    createAction(PLAYERS_ACTION_TYPES.SET_PLAYERS_ID_COUNTER, no)
    
export const setPlayersArray = (playersArray, newPlayer) => {
    const newPlayersArray = playersArray.concat([newPlayer]);
    return createAction(PLAYERS_ACTION_TYPES.SET_PLAYERS_ARRAY, newPlayersArray);
};

export const updatePlayersArray = (playersArray) => 
    createAction(PLAYERS_ACTION_TYPES.SET_PLAYERS_ARRAY, playersArray)


export const deleteAllPlayers = () => 
    createAction(PLAYERS_ACTION_TYPES.SET_PLAYERS_ARRAY, [])
