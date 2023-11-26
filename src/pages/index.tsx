import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from 'src/query/api';

import SearchResults from '../components/CardList';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import { RootState } from '../reducers/rootReducer';
import { saveItemsPerPage, saveSearchTerm } from '../reducers/starships';
import { setAppLoading } from '../reducers/starships';

interface IndexProps {
  searchData: Starship[];
  currentPage: number;
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
}

export const App = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryParams = new URLSearchParams(router.asPath.split(/\?/)[1] || '');

  const page = parseInt(queryParams.get('page') || '1');

  const { searchTerm } = useSelector((state: RootState) => state.starships);

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const [searchResults, setSearchResults] = useState<Starship[]>([]);
  const [displayResults, setDisplayResults] = useState<Starship[]>([]);

  const fetchDataWithPageSize = useCallback(
    async (pageSize: number) => {
      try {
        dispatch(setAppLoading(true));
        setIsLoading(true);

        let url = 'https://swapi.dev/api/starships/';
        if (searchTerm) {
          url += `?search=${searchTerm.trim()}`;
        }
        const response = await fetch(url);
        await response.json();

        const allResults = [];
        for (let i = 1; i <= 4; i++) {
          const pageUrl = `https://swapi.dev/api/starships/?page=${i}`;
          const pageResponse = await fetch(pageUrl);
          const pageData = await pageResponse.json();
          allResults.push(...pageData.results);
        }

        setSearchResults(allResults);
        setIsLoading(false);
        dispatch(setAppLoading(false));

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, allResults.length);
        setDisplayResults(allResults.slice(startIndex, endIndex));

        localStorage.setItem('searchResults', JSON.stringify(allResults));
        dispatch(saveItemsPerPage(pageSize));
      } catch (error) {
        dispatch(setAppLoading(false));
        setHasError(true);
        setErrorMessage('Something went wrong. Please try again later.');
        setIsLoading(false);
      }
    },
    [searchTerm, currentPage, dispatch]
  );
  const fetchData = useCallback(() => {
    fetchDataWithPageSize(5);
  }, [fetchDataWithPageSize]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.trim();
    dispatch(saveSearchTerm(term));
  };

  const handleSearch = () => {
    setIsLoading(true);
    fetchData();
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    router.push(`/search?page=${pageNumber}`);
  };
  const handlePageSizeChange = (pageSize: number) => {
    setCurrentPage(1);
    fetchDataWithPageSize(pageSize);
    dispatch(saveItemsPerPage(pageSize));
  };

  const throwError = () => {
    throw new Error('Test error thrown by the button click');
  };

  useEffect(() => {
    dispatch(setAppLoading(true));
    fetchData();
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm, fetchData, currentPage, dispatch]);

  return (
    <div className="App">
      {hasError ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <Search
            handleSearch={handleSearch}
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
          />
          <button type="button" onClick={throwError} className="error-button">
            Error
          </button>
          <SearchResults searchResults={displayResults} isLoading={isLoading} />
          <Pagination
            currentPage={currentPage}
            totalCount={searchResults.length}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </div>
  );
};
export const getServerSideProps: GetServerSideProps<IndexProps> = async (context) => {
  const page = context.query.page || '1';
  const searchTerm = context.query.searchTerm || '';
  const searchData = await fetchData(parseInt(page as string), searchTerm as string);

  return {
    props: {
      searchData,
      currentPage: parseInt(page as string),
    },
  };
};

export default App;
