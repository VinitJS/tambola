import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => ({
  count: 0,
  coins: [],
  coin_latest: -1
});

const coinsSlice = createSlice({
  name: 'coins',
  initialState: getInitialState(),
  reducers: {
    updateCoins(state, { payload: { coins }}) {
      if (state.coins.join("") !== coins.join("")) {
        state.coins = coins;
        state.count = coins.length;
        state.coin_latest = coins.length ? coins[coins.length-1] : -1
      }
    }
  }
});

export const { updateCoins } = coinsSlice.actions;
export default coinsSlice.reducer;
