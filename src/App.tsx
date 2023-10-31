import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import './App.css';
import Search from './components/Search';
import SearchResults from './components/SearchResults';

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') || ''
  );
  const [searchResults, setSearchResults] = useState<Starship[]>([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = useCallback(async () => {
    try {
      let url = 'https://swapi.dev/api/starships/';
      if (searchTerm) {
        url += `?search=${searchTerm.trim()}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data.results);
      localStorage.setItem('searchResults', JSON.stringify(data.results));
    } catch (error) {
      setHasError(true);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  }, [searchTerm]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.trim();
    setSearchTerm(term);
  };

  const handleSearch = () => {
    fetchData();
  };

  const throwError = () => {
    throw new Error('Test error thrown by the button click');
  };

  useEffect(() => {
    fetchData();
    localStorage.setItem('searchTerm', searchTerm);
  }, [fetchData, searchTerm]);

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
          <SearchResults searchResults={searchResults} />
          <button type="button" onClick={throwError}>
            Error
          </button>
        </>
      )}
    </div>
  );
}

export default App;
