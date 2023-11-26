import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Starship } from '../pages';

interface StarshipsState {
  data: Starship[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  itemsPerPage: number;
  appLoading: boolean;
  detailsLoading: boolean;
}

const initialState: StarshipsState = {
  data: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  itemsPerPage: 5,
  appLoading: false,
  detailsLoading: false,
};

export const starshipsSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {
    fetchStarshipsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchStarshipsSuccess: (state, action: PayloadAction<Starship[]>) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    fetchStarshipsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    saveSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    saveItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload;
    },
    setDetailsLoading: (state, action: PayloadAction<boolean>) => {
      state.detailsLoading = action.payload;
    },
  },
});

export const {
  fetchStarshipsStart,
  fetchStarshipsSuccess,
  fetchStarshipsFailure,
  saveSearchTerm,
  saveItemsPerPage,
  setAppLoading,
  setDetailsLoading,
} = starshipsSlice.actions;

export default starshipsSlice.reducer;
