import { createAction } from '@reduxjs/toolkit';
import { Characters } from './components/SearchResults/CardList';

export const updateSearchTerm = createAction<string>('updateSearchTerm');
export const updateItemsPerPage = createAction<number>('updateItemsPerPage');
export const saveSearchResults =
  createAction<Characters[]>('saveSearchResults');
