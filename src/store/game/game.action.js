import { createAction } from "../../utils/reducer/reducer.utils";
import { GAME_ACTION_TYPES } from "./game.types";

export const setGameRoundItems = (gameRounds, newRound) => {
    const newGameRoundsArray = gameRounds.concat([newRound]);
    return createAction(GAME_ACTION_TYPES.SET_ROUND_ITEMS, newGameRoundsArray);
}

export const setFahrenRoundItems = (gameRounds, fahrenRounds) => {
    const newGameRoundsArray = gameRounds.concat(fahrenRounds);
    return createAction(GAME_ACTION_TYPES.SET_ROUND_ITEMS, newGameRoundsArray);
}

export const setCurrentGameRound = (newRoundStatus) => 
    createAction(GAME_ACTION_TYPES.SET_ROUND_ITEMS, newRoundStatus)
    

export const deleteAllRounds = () => 
    createAction(GAME_ACTION_TYPES.SET_ROUND_ITEMS, [])


export const setGameRoundCount = (count) => 
    createAction(GAME_ACTION_TYPES.SET_ROUND_COUNT, count)