import { configureStore } from '@reduxjs/toolkit';
import memoryReducer from './memoriesSlice';

export const store = configureStore({
  reducer: {
    memories: memoryReducer,
  },
});
