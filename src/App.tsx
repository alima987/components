import React from 'react';
import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import SearchResults from './components/CardList';
import Pagination from './components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { saveSearchTerm, saveItemsPerPage } from './reducers/starships';
import { RootState } from './reducers/rootReducer';

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
}

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
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

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, allResults.length);
        setDisplayResults(allResults.slice(startIndex, endIndex));

        localStorage.setItem('searchResults', JSON.stringify(allResults));
        dispatch(saveItemsPerPage(pageSize));
      } catch (error) {
        setHasError(true);
        setErrorMessage('Something went wrong. Please try again later.');
        setIsLoading(false);
      }
    },
    /*[searchTerm, currentPage, setSearchResults]*/ [
      searchTerm,
      currentPage,
      dispatch,
    ]
  );
  const fetchData = useCallback(() => {
    fetchDataWithPageSize(5);
  }, [fetchDataWithPageSize]);

  /*const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.trim();
    setSearchTerm(term);
  };*/
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.trim();
    //setSearchTerm(term);
    dispatch(saveSearchTerm(term)); // Dispatch the action to save the search term
  };

  const handleSearch = () => {
    setIsLoading(true);
    fetchData();
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`/search?page=${pageNumber}`);
  };

  /*const handlePageSizeChange = (pageSize: number) => {
    setCurrentPage(1);
    fetchDataWithPageSize(pageSize);
  };*/
  const handlePageSizeChange = (pageSize: number) => {
    setCurrentPage(1);
    fetchDataWithPageSize(pageSize);
    dispatch(saveItemsPerPage(pageSize)); // Dispatch the action to save items per page
  };

  const throwError = () => {
    throw new Error('Test error thrown by the button click');
  };

  useEffect(() => {
    fetchData();
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm, fetchData, currentPage]);

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

export default App;
