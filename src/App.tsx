import './App.css';
import Search from './components/Search/Search';
import SearchResults from './components/SearchResults/SearchResults';
import { Component, ChangeEvent } from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    searchResults: [],
    hasError: false,
    errorMessage: '',
    isLoading: false,
  };
  fetchData = async () => {
    try {
      this.setState({ isLoading: true });

      let url = 'https://rickandmortyapi.com/api/character';
      if (this.state.searchTerm) {
        url += `?name=${this.state.searchTerm.trim()}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        searchResults: data.results,
        isLoading: false,
      });
      localStorage.setItem('searchResults', JSON.stringify(data.results));
    } catch (error) {
      this.setState({
        hasError: true,
        errorMessage: 'Something went wrong. Please try again later.',
        isLoading: false,
      });
    }
  };
  handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.trim();
    if (term === '') {
      this.setState({ searchTerm: '' }, () => {
        this.fetchData();
      });
    } else {
      this.setState({ searchTerm: term }, () => {
        localStorage.setItem('searchTerm', term);
      });
    }
  };

  handleSearch = () => {
    this.setState({ isLoading: true });
    this.fetchData();
  };

  throwError = () => {
    throw new Error('Test error thrown by the button click');
  };

  componentDidMount() {
    this.fetchData();
    localStorage.setItem('searchTerm', this.state.searchTerm);
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="App">
          {this.state.hasError ? (
            <p>{this.state.errorMessage}</p>
          ) : (
            <>
              <Search
                handleSearch={this.handleSearch}
                searchTerm={this.state.searchTerm}
                handleSearchChange={this.handleSearchChange}
              />
              <button
                type="button"
                onClick={this.throwError}
                className="error-button"
              >
                Error
              </button>
              <SearchResults
                searchResults={this.state.searchResults}
                isLoading={this.state.isLoading}
              />
            </>
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
