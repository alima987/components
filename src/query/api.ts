import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Starship } from '../App';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getStarships: builder.query<
      Starship[],
      { searchTerm?: string; page?: number }
    >({
      query: ({ searchTerm = '', page = 1 }) =>
        `starships/?search=${searchTerm}&page=${page}`,
    }),
  }),
});

export const { useGetStarshipsQuery } = api;
