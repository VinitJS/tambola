import GameActionTypes from './game.types';

const INITIAL_STATE = {
    gameLoading: false,
    gameBy: "",
    gameId: null,
    speed: 10000,
    counting: false,
    remaining: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
    dReqArr: [],
    dReq: 0,
    calledUpto: -1,
    playersNumsCalledCount: {}
}

const gameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GameActionTypes.SET_COUNTING: // true or false counting
            return {
                ...state,
                counting: action.payload
            }

        case GameActionTypes.SET_GAME_LOADING: // loading game
            return {
                ...state,
                gameLoading: action.payload
            }

        case GameActionTypes.SET_GAME_SUCCESS: // created new game successfully
            return {
                ...INITIAL_STATE,
                ...action.payload
            }

        case GameActionTypes.SET_GAME_ERROR: // error creating game
            return {
                ...state,
                error: action.payload,
                gameLoading: false,
                counting: false
            }

        case GameActionTypes.SET_DRAW_ERROR: // error in drawing new number
            return {
                ...state,
                error: action.payload,
                counting: false
            }

        case GameActionTypes.SET_CHANCES_ERROR: // error in drawing new number
            return {
                ...state,
                error: action.payload,
                counting: false
            }

        case GameActionTypes.SET_GAME_SPEED: // set speed of drawing
            return {
                ...state,
                speed: action.payload,
                counting: false
            }

        case GameActionTypes.UPDATE_GAME_REMAINING: // update remaining
            return {
                ...state,
                ...action.payload
            }

        case GameActionTypes.RESET_GAME_SUCCESS: // restart game successfully
            return {
                ...INITIAL_STATE,
                gameBy: state.gameBy,
                gameId: state.gameId
            }

        case GameActionTypes.UPDATE_REM_WITH_REQ:
            return {
                ...state,
                dReq: action.payload,
                dReqArr: [...state.dReqArr, action.payload],
            }

        case GameActionTypes.RESET_GAME:
            return {
                ...INITIAL_STATE
            }

        default:
            return state;
    }
}

export default gameReducer;