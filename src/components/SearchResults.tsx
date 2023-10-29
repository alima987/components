import React from 'react';

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
}

interface SearchResultsProps {
  searchResults: Starship[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  const render = () => {
    return (
      <div className="bottom-section">
        {searchResults.map((result) => (
          <div key={result.name}>
            <h2>{result.name}</h2>
            <p>Model: {result.model}</p>
            <p>Manufacturer: {result.manufacturer}</p>
          </div>
        ))}
      </div>
    );
  };
  return render();
};

export default SearchResults;
