/*
import React, { useState, useEffect } from 'react';
import './App.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }
    return this.props.children;
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'https://swapi.dev/api/starships/';
        if (searchTerm) {
          url += `?search=${searchTerm.trim()}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (event) => {
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
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="bottom-section">
          {searchResults.map((result, index) => (
            <div key={index}>
              <h2>{result.name}</h2>
              <p>{result.model}</p>
              <p>{result.manufacturer}</p>
            </div>
          ))}
        </div>
        <button onClick={throwError}>Throw Error</button>
      </div>
    </ErrorBoundary>
  );
}

export default App
*/
