import { ChangeEvent } from 'react';
import { useCustomState } from './Context';

interface SearchProps {
  handleSearch: () => void;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

const Search = (props: SearchProps) => {
  const { searchTerm, setSearchTerm } = useCustomState();

  return (
    <div className="search">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          props.handleSearchChange(e);
        }}
        placeholder="Starships"
      />
      <button type="button" onClick={props.handleSearch}>
        Search ships!
      </button>
    </div>
  );
};

export default Search;
