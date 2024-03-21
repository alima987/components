import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<Characters | null>(null);

  const renderLoader = () => {
    return <div className="loader">Loading...</div>;
  };

  const renderResults = () => {
    const handleItemClick = (item: Characters) => {
      setSelectedItem(item);
      navigate(`/?frontpage=2&details=${item.name}`);
    };

    return (
      <div className={`bottom-section${selectedItem ? ' shift-left' : ''}`}>
        {props.isLoading ? renderLoader() : null}
        {props.searchResults.map((result) => (
          <div
            key={result.id}
            className="card"
            onClick={() => handleItemClick(result)}
          >
            <div className="img_card">
              <img src={result.image} className="card_img" />
            </div>
            <div className="card_item">
              <h2>{result.name}</h2>
              <p>Species: {result.species}</p>
              <p>Gender: {result.gender}</p>
              <p>Last known location: {result.location.name}</p>
            </div>
          </div>
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
            <p>Species: {selectedItem.species}</p>
            <p>Gender: {selectedItem.gender}</p>
            <p>Last known location: {selectedItem.location.name}</p>
            <Outlet></Outlet>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
