import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCustomState } from '../Context';
import Card from './Card';
import './SearchResults.scss';

export interface Characters {
  id: number;
  name: string;
  species: string;
  gender: string;
  location: {
    name: string;
  };
  image: string;
}

interface SearchResultsProps {
  searchResults: Characters[];
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = (props) => {
  useCustomState();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<Characters | null>(null);

  const renderLoader = () => {
    return <div className="loader">Loading...</div>;
  };

  const handleItemClick = (item: Characters) => {
    setSelectedItem(item);
    navigate(`/?frontpage=2&details=${item.name}`);
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
            <div>
              <img src={selectedItem.image} className="details_img" />
            </div>
            <h2>{selectedItem.name}</h2>
            <p>Species: {selectedItem.species}</p>
            <p>Gender: {selectedItem.gender}</p>
            <p>Last known location: {selectedItem.location.name}</p>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
