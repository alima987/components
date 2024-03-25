import React from 'react';
import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Search from './components/Search/Search';
import SearchResults from './components/SearchResults/CardList';
import Pagination from './components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { saveSearchTerm, saveItemsPerPage } from './reducers/characters';
import { RootState } from './reducers/rootReducer';
import { setAppLoading } from './reducers/characters';
import { Characters } from './components/SearchResults/CardList';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get('page') || '1');

  const { searchTerm } = useSelector((state: RootState) => state.characters);

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const [searchResults, setSearchResults] = useState<Characters[]>([]);
  const [displayResults, setDisplayResults] = useState<Characters[]>([]);

  const fetchDataWithPageSize = useCallback(
    async (pageSize: number) => {
      try {
        dispatch(setAppLoading(true));
        setIsLoading(true);

        let url = 'https://rickandmortyapi.com/api/character';
        if (searchTerm) {
          url += `/?name=${searchTerm.trim()}`;
        }
        const response = await fetch(url);
        await response.json();

        const allResults = [];
        for (let i = 1; i <= 42; i++) {
          const pageUrl = `https://rickandmortyapi.com/api/character/?page=${i}`;
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
    fetchDataWithPageSize(20);
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
    navigate(`/?page=${pageNumber}`);
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

export default App;
