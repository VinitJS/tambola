import PlayingActionTypes from "./playing.types";
import { clap } from "../../utils/firebase";

export const setPlayFailure = (message) => (
    {
        type: PlayingActionTypes.SET_PLAY_ERROR,
        payload: message
    }
)

export const setPlaySuccess = (data) => (
    {
        type: PlayingActionTypes.SET_PLAY_SUCCESS,
        payload: data
    }
)

export const resetPlaying = () => (
    {
        type: PlayingActionTypes.RESET_PLAY
    }
)

export const setLoadingClap = (bool) => (
    {
        type: PlayingActionTypes.SET_CLAP_LOADING,
        payload: bool
    }
)

export const addToClapped = (id) => (
    {
        type: PlayingActionTypes.ADD_TO_CLAPPED,
        payload: id
    }
)

export const resetClapped = () => (
    {
        type: PlayingActionTypes.RESET_CLAPPED
    }
)

export const setClap = (gameId, playerId, userId) => ( // called from players
    (dispatch) => {
        dispatch(setLoadingClap(true));
        clap(gameId, playerId, userId)
            .then(res => {
                dispatch(setLoadingClap(false));
            }).catch((error) => {
                dispatch(setLoadingClap(false));
                alert("Unable to clap. Try again later!")
            })
    }
);