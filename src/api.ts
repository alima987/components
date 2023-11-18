import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Starship } from './App';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getStarships: builder.query<Starship[], string>({
      query: (searchTerm = '') => `starships/?search=${searchTerm}`,
    }),
  }),
});

export const { useGetStarshipsQuery } = api;
