import { Component } from 'react';

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
}

interface SearchResultsProps {
  searchResults: Starship[];
  isLoading: boolean;
}

class SearchResults extends Component<
  SearchResultsProps,
  { isLoading: boolean }
> {
  constructor(props: SearchResultsProps) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  renderLoader() {
    return <div className="loader">Loading...</div>;
  }

  renderResults() {
    return (
      <div className="bottom-section">
        {this.props.isLoading ? this.renderLoader() : null}
        {this.props.searchResults.map((result) => (
          <div key={result.name}>
            <h2>{result.name}</h2>
            <p>Model: {result.model}</p>
            <p>Manufacturer: {result.manufacturer}</p>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return <div>{this.renderResults()}</div>;
  }
}

export default SearchResults;
