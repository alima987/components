import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import './App.css';
import Search from './components/Search';
import SearchResults from './components/SearchResults';

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, errorMessage: error.message });
  }

  render() {
    const { children } = this.props;
    const { hasError, errorMessage } = this.state;
    if (hasError) {
      return <p>{errorMessage}</p>;
    }
    return children;
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') || ''
  );
  const [searchResults, setSearchResults] = useState<Starship[]>([]);

  const fetchData = useCallback(async () => {
    try {
      let url = 'https://swapi.dev/api/starships/';
      if (searchTerm) {
        url += `?search=${searchTerm.trim()}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      throw new Error('Something went wrong. Please try again later.');
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
    localStorage.setItem('searchTerm', searchTerm);
  }, [fetchData, searchTerm]);

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

  return (
    <ErrorBoundary>
      <div className="App">
        <Search
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <SearchResults searchResults={searchResults} />
        <button type="button" onClick={throwError}>
          Error
        </button>
      </div>
    </ErrorBoundary>
  );
}

export default App;
