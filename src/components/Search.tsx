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
          type="text"
          value={this.props.searchTerm}
          onChange={this.props.handleSearchChange}
          placeholder="Starships"
        />
        <button type="button" onClick={this.props.handleSearch}>
          Search ships!
        </button>
      </div>
    );
  }
}

export default Search;
