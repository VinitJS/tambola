import DrawingActionTypes from "./drawing.types";
import { saveChosenDraw } from "../../utils/firebase";
import { increasePoints } from "../user/user.actions";

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

export const chosenDrawReset = () => (
    {
        type: DrawingActionTypes.SET_CHOSEN_DRAW_RESET
    }
)

export const addNewDraw = (gameId, num, statement, userId, points, size) => ( // called from drawn
    (dispatch) => {
        dispatch(setProcessingDraw(true));
        saveChosenDraw(gameId, num, statement, userId, points)
            .then(res => {
                dispatch(setChosenDraw(false));
                if (size > 3) dispatch(increasePoints(points));
            }).catch((error) => {
                dispatch(setProcessingDraw(false));
                alert("Unable to get your chosen number now. Try again later!")
            })
    });