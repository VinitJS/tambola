import UserActionTypes from "./user.types";
import { resetTicket } from "../ticket/ticket.actions";
import { resetPlaying } from "../playing/playing.actions";
import { resetClaims } from "../claims/claims.actions";

export const setUserName = name => (
    {
        type: UserActionTypes.SET_USER_NAME,
        payload: { name, id: new Date().getTime(), v: 0 }
    }
);

export const updateUserName = name => (
    {
        type: UserActionTypes.UPDATE_USER_NAME,
        payload: name
    }
);

export const increaseUserV = (points) => (
    {
        type: UserActionTypes.INCREASE_USER_V,
        payload: points
    }
)

export const increasePoints = (points) => (
    {
        type: UserActionTypes.INCREASE_POINTS,
        payload: points
    }
)

export const resetUser = () => (
    {
        type: UserActionTypes.RESET_USER
    }
)

export const resetGame = () => (
    (dispatch) => {
        dispatch(resetUser());
        dispatch(resetTicket());
        dispatch(resetPlaying());
        dispatch(resetClaims());
    }
)