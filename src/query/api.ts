import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Starship } from '../pages';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getStarships: builder.query<Starship[], { searchTerm?: string; page?: number }>({
      query: ({ searchTerm = '', page = 1 }) => `starships/?search=${searchTerm}&page=${page}`,
    }),
  }),
});

export const { useGetStarshipsQuery } = api;

export type FetchDataResult = Promise<Starship[]>;

export const fetchData = async (page: number, searchTerm?: string): FetchDataResult => {
  const url = `https://swapi.dev/api/starships/?page=${page}${
    searchTerm ? `&search=${searchTerm}` : ''
  }`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};
