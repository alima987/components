import { createAction } from '@reduxjs/toolkit';

import { Starship } from './pages/App';

export const updateSearchTerm = createAction<string>('updateSearchTerm');
export const updateItemsPerPage = createAction<number>('updateItemsPerPage');
export const saveSearchResults = createAction<Starship[]>('saveSearchResults');
