import DrawActionTypes from './drawing.types';

const INITIAL_STATE = {
    processChosen: false,
    dchance: true
}

const drawReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DrawActionTypes.SET_PROCESSING_DRAW:
            return {
                ...state,
                processChosen: action.payload
            }
        case DrawActionTypes.SET_CHOSEN_DRAW:
            return {
                ...state,
                dchance: action.payload,
                processChosen: false
            }
        case DrawActionTypes.SET_CHOSEN_DRAW_RESET:
            return {
                ...state,
                dchance: true,
                processChosen: false
            }
        default:
            return state;
    }
}

export default drawReducer;