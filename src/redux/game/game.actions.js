import GameActionTypes from "./game.types";
import { getGameRef } from "../../utils/firebase";

export const setSpeed = (speed) => (
    {
        type: GameActionTypes.SET_GAME_SPEED,
        payload: speed
    }
)

export const setGameLoading = (isLoading) => (
    {
        type: GameActionTypes.SET_GAME_LOADING,
        payload: isLoading
    }
)

export const setGameFailure = (msg) => (
    {
        type: GameActionTypes.SET_GAME_ERROR,
        payload: msg
    }
)

export const setGameSuccess = (gameId, gameBy, gVersion) => (
    {
        type: GameActionTypes.SET_GAME_SUCCESS,
        payload: { gameId, gameBy, gVersion }
    }
)

export const createGame = (gameBy, gameId, gVersion) => (
    (dispatch) => {
        dispatch(setGameLoading(true));
        let newGameRef = getGameRef(gameId.toString());
        let game = {
            gameBy: gameBy,
            claims: [],
            coins: [],
            players: [],
            gVersion,
            chances: 0,
            dreq: 0,
            totalPoints: 0
        };

        newGameRef.set(game)
            .then(() => {
                dispatch(setGameSuccess(gameId, gameBy, gVersion));
            }).catch(error => {
                console.error(error);
                dispatch(setGameFailure(error.message));
            });
    }
)

export const updateRemaining = (calledUpto, playersNumsCalledCount) => (
    {
        type: GameActionTypes.UPDATE_GAME_REMAINING,
        payload: { calledUpto, playersNumsCalledCount }
    }
)

export const setDrawFailure = (msg) => (
    {
        type: GameActionTypes.SET_DRAW_ERROR,
        payload: msg
    }
)

export const setChancesFailure = (msg) => (
    {
        type: GameActionTypes.SET_CHANCES_ERROR,
        payload: msg
    }
)

export const setCounting = (bool) => (
    {
        type: GameActionTypes.SET_COUNTING,
        payload: bool
    }
)

export const updateRemWithReq = (dReq) => (
    {
        type: GameActionTypes.UPDATE_REM_WITH_REQ,
        payload: dReq
    }
)

export const resetGame = () => (
    {
        type: GameActionTypes.RESET_GAME
    }
)