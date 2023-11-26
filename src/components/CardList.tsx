import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Card from './Card';
import { useCustomState } from './Context';

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
  useCustomState();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<Starship | null>(null);

  const renderLoader = () => {
    return <div className="loader">Loading...</div>;
  };

  const handleItemClick = (item: Starship) => {
    setSelectedItem(item);
    router.push(`/?frontpage=2&details=${item.name}`);
  };

  const renderResults = () => {
    return (
      <div className={`bottom-section${selectedItem ? ' shift-left' : ''}`}>
        {props.isLoading ? renderLoader() : null}
        {props.searchResults.map((result) => (
          <Card key={result.name} item={result} onItemClick={handleItemClick} />
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderResults()}
      {selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedItem(null)}>
              &times;
            </span>
            <h2>{selectedItem.name}</h2>
            <p>Model: {selectedItem.model}</p>
            <p>Manufacturer: {selectedItem.manufacturer}</p>
            <Outlet></Outlet>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
