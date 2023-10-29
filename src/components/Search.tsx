import React, { ChangeEvent } from 'react';

interface SearchProps {
  handleSearch: () => void;
  searchTerm: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({
  handleSearch,
  searchTerm,
  handleSearchChange,
}) => {
  const render = () => {
    return (
      <div className="search">
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
    );
  };

  return render();
};

export default Search;
