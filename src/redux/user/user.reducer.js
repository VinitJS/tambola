import UserActionTypes from './user.types';

const INITIAL_STATE = {
    name: "",
    id: null,
    v: 0,
    p: 0
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_USER_NAME:
            return {
                ...state,
                ...action.payload
            }
        case UserActionTypes.RESET_USER:
            return {
                ...INITIAL_STATE
            }
        case UserActionTypes.UPDATE_USER_NAME:
            return {
                ...state,
                name: action.payload
            }
        case UserActionTypes.INCREASE_USER_V:
            return {
                ...state,
                v: state.v + 1,
                p: state.p + action.payload
            }
        case UserActionTypes.INCREASE_POINTS:
            return {
                ...state,
                p: state.p + action.payload
            }
        default:
            return state;
    }
}

export default userReducer;