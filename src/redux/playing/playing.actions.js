import PlayingActionTypes from "./playing.types";

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