import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => ({
    players: []
});

const playersSlice = createSlice({
    name: 'players',
    initialState: getInitialState(),
    reducers: {
        updatePlayers(state, { payload: { players } }) {
            if (players !== undefined) {
                state.players = players.sort((a, b) => b.points - a.points);
            }
        }
    }
});

export const { updatePlayers } = playersSlice.actions;
export default playersSlice.reducer;
