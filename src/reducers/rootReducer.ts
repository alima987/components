import { combineReducers } from '@reduxjs/toolkit';
import starshipsReducer from './starships';

const rootReducer = combineReducers({
  starships: starshipsReducer,
  // Add other reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
