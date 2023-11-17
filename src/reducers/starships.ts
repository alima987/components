/*import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Starship } from '../App';

interface StarshipsState {
  data: Starship[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
}

const initialState: StarshipsState = {
  data: [],
  isLoading: false,
  error: null,
  searchTerm: '',
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
  },
});

export const {
  fetchStarshipsStart,
  fetchStarshipsSuccess,
  fetchStarshipsFailure,
  saveSearchTerm,
} = starshipsSlice.actions;

export default starshipsSlice.reducer;
*/
// reducers/starships.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Starship } from '../App';

interface StarshipsState {
  data: Starship[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  itemsPerPage: number;
}

const initialState: StarshipsState = {
  data: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  itemsPerPage: 5, // Set a default value for items per page
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
  },
});

export const {
  fetchStarshipsStart,
  fetchStarshipsSuccess,
  fetchStarshipsFailure,
  saveSearchTerm,
  saveItemsPerPage,
} = starshipsSlice.actions;

export default starshipsSlice.reducer;
