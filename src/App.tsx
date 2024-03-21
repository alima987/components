import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Search from './components/Search/Search';
import SearchResults from './components/SearchResults/SearchResults';
import Pagination from './components/pagination';
import { Characters } from './components/SearchResults/SearchResults';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get('page') || '1');

  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const [searchResults, setSearchResults] = useState<Characters[]>([]);
  const [displayResults, setDisplayResults] = useState<Characters[]>([]);

  const fetchDataWithPageSize = useCallback(
    async (pageSize: number) => {
      try {
        setIsLoading(true);

        let url = 'https://rickandmortyapi.com/api/character';
        if (searchTerm) {
          url += `?name=${searchTerm.trim()}`;
        }
        const response = await fetch(url);
        await response.json();

        const allResults = [];
        for (let i = 1; i <= 4; i++) {
          const pageUrl = `https://rickandmortyapi.com/api/character/?page=${i}`;
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
      } catch (error) {
        setHasError(true);
        setErrorMessage('Something went wrong. Please try again later.');
        setIsLoading(false);
      }
    },
    [searchTerm, currentPage]
  );
  const fetchData = useCallback(() => {
    fetchDataWithPageSize(5);
  }, [fetchDataWithPageSize]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.trim();
    if (term === '') {
      setSearchTerm('');
      fetchData();
    } else {
      setSearchTerm(term);
      localStorage.setItem('searchTerm', term);
    }
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
