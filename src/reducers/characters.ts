import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Characters } from '../components/SearchResults/CardList';

interface CharactersState {
  data: Characters[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  itemsPerPage: number;
  appLoading: boolean;
  detailsLoading: boolean;
}

const initialState: CharactersState = {
  data: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  itemsPerPage: 20,
  appLoading: false,
  detailsLoading: false,
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    fetchCharactersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchCharactersSuccess: (state, action: PayloadAction<Characters[]>) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    fetchCharactersFailure: (state, action: PayloadAction<string>) => {
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
  fetchCharactersStart,
  fetchCharactersSuccess,
  fetchCharactersFailure,
  saveSearchTerm,
  saveItemsPerPage,
  setAppLoading,
  setDetailsLoading,
} = charactersSlice.actions;

export default charactersSlice.reducer;
