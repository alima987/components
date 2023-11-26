import { createAction } from '@reduxjs/toolkit';

import { Starship } from './pages';

export const updateSearchTerm = createAction<string>('updateSearchTerm');
export const updateItemsPerPage = createAction<number>('updateItemsPerPage');
export const saveSearchResults = createAction<Starship[]>('saveSearchResults');
