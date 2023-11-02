import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import './App.css';
import Search from './components/Search';
import SearchResults from './components/SearchResults';

const App = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );
  const [searchResults, setSearchResults] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
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
      localStorage.setItem('searchResults', JSON.stringify(data.results));
    } catch (error) {
      setHasError(true);
      setErrorMessage('Something went wrong. Please try again later.');
      setIsLoading(false);
    }
  }, [searchTerm]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.trim();
    setSearchTerm(term);
  };

  const handleSearch = () => {
    setIsLoading(true);
    fetchData();
  };

  const throwError = () => {
    throw new Error('Test error thrown by the button click');
  };

  useEffect(() => {
    fetchData();
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm, fetchData]);

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
          <SearchResults searchResults={searchResults} isLoading={isLoading} />
        </>
      )}
    </div>
  );
};

export default App;
