import PlayActionTypes from './playing.types';

const INITIAL_STATE = {
    gameBy: "",
    gameId: null,
    coins: [],
    players: [],
    playersNums: {},
    claims: {},
    error: "",
    chances: 0,
    emo: ["front-facing_baby_chick", "badger-emoji", "bear-emoji", "blow-fish", "butterfly-emoji", "bear-emoji", "cat-face--v1", "chicken-emoji", "chimpanzee-emoji", "chipmunk", "crocodile", "dog-face", "duck-emoji", "eagle--v2", "flamingo-emoji", "fox-emoji", "frog-emoji", "gorilla-emoji", "hamster-emoji", "koala-emoji", "lion-emoji", "monkey-face--v1", "mouse-emoji", "owl-emoji", "panda-emoji", "otter-emoji", "penguin--v2", "rabbit-emoji", "rooster--v2", "raccoon", "rooster--v2", "turkey-emoji"],
    isValidGame: true,
    size: 0,
    c: ""
}

const playReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PlayActionTypes.SET_PLAY_ERROR:
            return {
                ...state,
                error: action.payload,
                isValidGame: false
            }
        case PlayActionTypes.SET_PLAY_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case PlayActionTypes.RESET_PLAY:
            return {
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}

export default playReducer;