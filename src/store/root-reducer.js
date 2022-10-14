import { combineReducers } from "redux";
import { gameReducer } from "./game/game.reducer";
import { modalReducer } from "./modal/modal.reducer";
import { playersReducer } from "./players/players.reducer";

export const rootReducer = combineReducers({
    game: gameReducer,
    modal: modalReducer,
    players: playersReducer
})