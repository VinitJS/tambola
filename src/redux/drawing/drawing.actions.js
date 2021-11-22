import DrawingActionTypes from "./drawing.types";
import { saveChosenDraw } from "../../utils/firebase";

export const setProcessingDraw = (bool) => (
    {
        type: DrawingActionTypes.SET_PROCESSING_DRAW,
        payload: bool
    }
)

export const setChosenDraw = (bool) => (
    {
        type: DrawingActionTypes.SET_CHOSEN_DRAW,
        payload: bool
    }
)

export const addNewDraw = (gameId, num, statement, userId) => ( // called from drawn
    (dispatch) => {
        dispatch(setProcessingDraw(true));
        saveChosenDraw(gameId, num, statement, userId)
            .then(res => {
                dispatch(setChosenDraw(false));
            }).catch((error) => {
                dispatch(setProcessingDraw(false));
                alert("Unable to get your chosen number now. Try again later!")
            })
    }
);