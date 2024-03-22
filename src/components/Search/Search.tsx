import { ChangeEvent } from 'react';
import './Search.scss';

interface SearchProps {
  handleSearch: () => void;
  searchTerm: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Search = (props: SearchProps) => {
  return (
    <div className="search">
      <input
        className="search_int"
        type="text"
        value={props.searchTerm}
        onChange={props.handleSearchChange}
        placeholder="Characters"
      />
      <button className="search_btn" type="button" onClick={props.handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
