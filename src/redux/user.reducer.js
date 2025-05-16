import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => ({
  id: Date.now().toString(36),
  name: '',
  total_stars: 0,
  total_points: 0
});

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    resetUser() {
      return getInitialState()
    },
    updateUser(state, { payload }) {
      const { name, increment_stars, increment_points } = payload || {};
      if (name) state.name = name;
      if (increment_stars) state.total_stars += increment_stars;
      if (increment_points) state.total_points += increment_points;
    }
  }
});

export const { resetUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
