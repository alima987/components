import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Characters } from '../components/SearchResults/CardList';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getStarships: builder.query<
      Characters[],
      { searchTerm?: string; page?: number }
    >({
      query: ({ searchTerm = '', page = 1 }) =>
        `character/?name=${searchTerm}&page=${page}`,
    }),
  }),
});

export const { useGetStarshipsQuery } = api;
