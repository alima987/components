import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import './App.css';

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
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }
    return children;
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
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
      // Handle the error here, such as logging it or displaying a user-friendly message
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
        <div className="top-section">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Starships"
          />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="bottom-section">
          {searchResults.map((result) => (
            <div key={result.name}>
              <h2>{result.name}</h2>
              <p>{result.model}</p>
              <p>{result.manufacturer}</p>
            </div>
          ))}
        </div>
        <button type="button" onClick={throwError}>
          Throw Error
        </button>
      </div>
    </ErrorBoundary>
  );
}

export default App;
