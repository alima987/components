import React from 'react';

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
}

interface SearchResultsProps {
  searchResults: Starship[];
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = (props) => {
  const renderLoader = () => {
    return <div className="loader">Loading...</div>;
  };

  const renderResults = () => {
    return (
      <div className="bottom-section">
        {props.isLoading ? renderLoader() : null}
        {props.searchResults.map((result) => (
          <div key={result.name}>
            <h2>{result.name}</h2>
            <p>Model: {result.model}</p>
            <p>Manufacturer: {result.manufacturer}</p>
          </div>
        ))}
      </div>
    );
  };

  return <div>{renderResults()}</div>;
};

export default SearchResults;
