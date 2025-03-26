import GameActionTypes from './game.types';

const INITIAL_STATE = {
    gameLoading: false,
    gameBy: "",
    gameId: null,
    speed: 10000,
    counting: false,
    remaining: [],
    dReqArr: [],
    dReq: 0
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
                ...action.payload,
                gameLoading: false,
                counting: false,
                dReqArr: [],
                dReq: 0
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
                remaining: state.dReqArr.length > 0 
                    ? action.payload.filter(num => num !== state.dReqArr[0]).concat(state.dReqArr[0]) 
                    : action.payload,
                dReqArr: state.dReqArr.slice(1),
            };

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