import { combineReducers } from '@reduxjs/toolkit';
import starshipsReducer from './starships';

const rootReducer = combineReducers({
  starships: starshipsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
