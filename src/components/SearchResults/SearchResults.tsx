import './SearchResults.scss';
import { Component } from 'react';

interface Characters {
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
          <div key={result.id} className="card">
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
  }

  render() {
    return <div>{this.renderResults()}</div>;
  }
}

export default SearchResults;
