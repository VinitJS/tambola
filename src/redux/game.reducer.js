import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => ({
    game_by: "",
    play_id: "",
    version: 0,
    coin_count: 0,
    speed: 10,
    players_count: 0
});

const gameSlice = createSlice({
    name: 'game',
    initialState: getInitialState(),
    reducers: {
        resetGame() {
            return getInitialState()
        },
        updateGame(state, { payload: { game_by, play_id, version, coin_count, speed, players_count, message } }) {
            if ((game_by !== undefined) && game_by !== state.game_by) {
                state.game_by = game_by;
            }
            if ((play_id !== undefined) && play_id !== state.play_id) {
                state.play_id = play_id;
            }
            if ((version !== undefined) && version !== state.version) {
                state.version = version;
            }
            if ((coin_count !== undefined) && coin_count !== state.coin_count) {
                state.coin_count = coin_count;
            }
            if ((speed !== undefined) && speed !== state.speed) {
                state.speed = speed;
            }
            if ((players_count !== undefined) && players_count !== state.players_count) {
                state.players_count = players_count;
            }
            if ((message !== undefined) && message !== state.message) {
                state.message = message;
            }
        }
    }
});

export const { resetGame, updateGame } = gameSlice.actions;
export default gameSlice.reducer;
