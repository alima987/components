import { combineReducers } from '@reduxjs/toolkit';
import charactersReducer from './characters';

const rootReducer = combineReducers({
  characters: charactersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
