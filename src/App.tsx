import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import Pagination from './components/pagination';

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
}

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get('page') || '1');

  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );
  //const [searchResults, setSearchResults] = useState([]);
  //const [displayResults, setDisplayResults] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const [searchResults, setSearchResults] = useState<Starship[]>([]);
  const [displayResults, setDisplayResults] = useState<Starship[]>([]);

  /*const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      let url = 'https://swapi.dev/api/starships/';
      if (searchTerm) {
        url += `?search=${searchTerm.trim()}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data.results);
      setIsLoading(false);
      setDisplayResults(
        data.results.slice((currentPage - 1) * 10, currentPage * 10)
      );
      localStorage.setItem('searchResults', JSON.stringify(data.results));
    } catch (error) {
      setHasError(true);
      setErrorMessage('Something went wrong. Please try again later.');
      setIsLoading(false);
    }
  }, [searchTerm, currentPage]);*/
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      let url = 'https://swapi.dev/api/starships/';
      if (searchTerm) {
        url += `?search=${searchTerm.trim()}`;
      }
      const response = await fetch(url);
      await response.json();

      const allResults: Starship[] = [];
      for (let i = 1; i <= 4; i++) {
        const pageUrl = `https://swapi.dev/api/starships/?page=${i}`;
        const pageResponse = await fetch(pageUrl);
        const pageData = await pageResponse.json();
        allResults.push(...pageData.results);
      }

      setSearchResults(allResults);
      setIsLoading(false);
      setDisplayResults(
        allResults.slice((currentPage - 1) * 10, currentPage * 10)
      );
      localStorage.setItem('searchResults', JSON.stringify(allResults));
    } catch (error) {
      setHasError(true);
      setErrorMessage('Something went wrong. Please try again later.');
      setIsLoading(false);
    }
  }, [searchTerm, currentPage]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.trim();
    setSearchTerm(term);
  };

  const handleSearch = () => {
    setIsLoading(true);
    fetchData();
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`/search?page=${pageNumber}`);
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
          />
        </>
      )}
    </div>
  );
};

export default App;
