import { ChangeEvent } from 'react';

interface SearchProps {
  handleSearch: () => void;
  searchTerm: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Search = (props: SearchProps) => {
  return (
    <div className="search">
      <input
        type="text"
        value={props.searchTerm}
        onChange={props.handleSearchChange}
        placeholder="Starships"
      />
      <button type="button" onClick={props.handleSearch}>
        Search ships!
      </button>
    </div>
  );
};

export default Search;
