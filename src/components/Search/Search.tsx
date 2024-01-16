import './Search.scss';
import { Component, ChangeEvent } from 'react';

interface SearchProps {
  handleSearch: () => void;
  searchTerm: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

class Search extends Component<SearchProps> {
  render() {
    return (
      <div className="search">
        <input
          className="search_int"
          type="text"
          value={this.props.searchTerm}
          onChange={this.props.handleSearchChange}
          placeholder="Characters"
        />
        <button
          className="search_btn"
          type="button"
          onClick={this.props.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
