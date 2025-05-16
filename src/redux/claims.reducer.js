import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => ({
    claims: {},
    chances_left: 6,
    players_count: 0
});

const claimsSlice = createSlice({
    name: 'claims',
    initialState: getInitialState(),
    reducers: {
        updateClaims: (state, { payload: { claims, players_count, chances_left, change_chances } }) => {
            if (claims && JSON.stringify(state.claims) !== JSON.stringify(claims)) state.claims = claims;
            if (players_count && state.players_count !== players_count) state.players_count = players_count;
            if (chances_left && state.chances_left !== chances_left) state.chances_left = chances_left;
            if (change_chances) state.chances_left += change_chances;
        }
    }
});

export const {
    updateClaims
} = claimsSlice.actions;

export default claimsSlice.reducer;