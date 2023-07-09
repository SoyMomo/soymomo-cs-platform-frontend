import { configureStore } from '@reduxjs/toolkit';
import yourReducer from './yourReducer'; // Import your reducers here

export const store = configureStore({
  reducer: {
    yourSlice: yourReducer, // Register your reducers here
  },
});