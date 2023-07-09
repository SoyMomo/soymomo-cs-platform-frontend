import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wearer: null,
  watchUser: null,
  // etc...
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setWearer: (state, action) => {
      state.wearer = action.payload;
    },
    setWatchUser: (state, action) => {
      state.watchUser = action.payload;
    },
    // etc...
  },
});

export const { setWearer, setWatchUser } = dataSlice.actions;

export default dataSlice.reducer;