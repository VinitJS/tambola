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

export const setGameSuccess = (gameId, gameBy, gVersion, remaining) => ( // 2.1
    {
        type: GameActionTypes.SET_GAME_SUCCESS,
        payload: { gameId, gameBy, gVersion, remaining }
    }
)

export const createGame = (gameBy, gameId, gVersion) => ( // 1
    (dispatch) => {
        dispatch(setGameLoading(true));
        let newGameRef = getGameRef(gameId.toString());
        let game = {
            gameBy: gameBy,
            claims: [],
            coins: [],
            players: [],
            size: 0,
            gVersion,
            chances: 0,
            dreq: 0
        };

        const coins = [[1, 2, 3, 4, 5, 6, 7, 8, 9], [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], [50, 51, 52, 53, 54, 55, 56, 57, 58, 59], [60, 61, 62, 63, 64, 65, 66, 67, 68, 69], [70, 71, 72, 73, 74, 75, 76, 77, 78, 79], [80, 81, 82, 83, 84, 85, 86, 87, 88, 89]];
        const remaining = [];
        let tens, randRangeI, selectedRange, randI, selectedNum;
        while (remaining.length < 89) {
            tens = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            while (tens.length > 0) {
                randRangeI = Math.floor(Math.random() * tens.length);
                selectedRange = tens.splice(randRangeI, 1)[0];
                randI = Math.floor(Math.random() * coins[selectedRange].length);
                selectedNum = coins[selectedRange].splice(randI, 1)[0];
                if (selectedNum) {
                    remaining.push(selectedNum);
                }
            }
        }

        newGameRef.set(game)
            .then(response => {
                dispatch(setGameSuccess(gameId, gameBy, gVersion, remaining)); // 2
            }).catch(error => {
                console.error(error);
                dispatch(setGameFailure(error.message));
            });
    }
)

export const updateRemaining = (remaining) => (
    {
        type: GameActionTypes.UPDATE_GAME_REMAINING,
        payload: remaining
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