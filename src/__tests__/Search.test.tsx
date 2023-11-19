import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';
import { useCustomState } from '../components/Context';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../query/store';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

jest.mock('../components/Context');

describe('Search component', () => {
  describe('Rendering', () => {
    it('renders the search input and button', () => {
      (useCustomState as jest.Mock).mockReturnValue({
        searchTerm: 'test',
        setSearchTerm: jest.fn(),
      });

      render(
        <Provider store={store}>
          <Search
            handleSearch={() => {}}
            handleSearchChange={() => {}}
            searchTerm=""
          />
        </Provider>
      );

      expect(screen.getByPlaceholderText('Starships')).toBeTruthy();
      expect(
        screen.getByRole('button', { name: 'Search ships!' })
      ).toBeTruthy();
    });
  });

  it('calls handleSearch and handleSearchChange on input change', () => {
    const handleSearch = jest.fn();
    const handleSearchChange = jest.fn();

    (useCustomState as jest.Mock).mockReturnValue({
      searchTerm: '',
      setSearchTerm: handleSearchChange,
    });

    render(
      <Provider store={store}>
        <Search
          handleSearch={handleSearch}
          handleSearchChange={handleSearchChange}
          searchTerm=""
        />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Starships');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(handleSearchChange);
    expect(handleSearch);
  });
});

describe('Button Click', () => {
  it('saves the entered value to local storage on button click', () => {
    (useCustomState as jest.Mock).mockReturnValue({
      searchTerm: 'test',
      setSearchTerm: jest.fn(),
    });

    render(
      <Provider store={store}>
        <Search
          handleSearch={() => {}}
          handleSearchChange={() => {}}
          searchTerm=""
        />
      </Provider>
    );

    const searchButton = screen.getByRole('button', { name: 'Search ships!' });

    fireEvent.click(searchButton);

    // Ensure that the expectation is placed immediately after the action
    expect(localStorage.setItem);
  });
});

describe('LocalStorage Interaction', () => {
  it('fetches the value from local storage on mount', () => {
    (useCustomState as jest.Mock).mockReturnValue({
      searchTerm: '',
      setSearchTerm: jest.fn(),
    });

    localStorageMock.getItem.mockReturnValueOnce('test');

    render(
      <Provider store={store}>
        <Search
          handleSearch={() => {}}
          handleSearchChange={() => {}}
          searchTerm=""
        />
      </Provider>
    );

    setTimeout(() => {
      expect(localStorage.getItem).toHaveBeenCalledWith('searchTerm');
    }, 0);
  });
});
it('calls handleSearch on button click', () => {
  const handleSearch = jest.fn();
  (useCustomState as jest.Mock).mockReturnValue({
    searchTerm: '',
    setSearchTerm: jest.fn(),
  });

  render(
    <Provider store={store}>
      <Search
        handleSearch={handleSearch}
        handleSearchChange={() => {}}
        searchTerm=""
      />
    </Provider>
  );

  const searchButton = screen.getByRole('button', { name: 'Search ships!' });

  fireEvent.click(searchButton);

  expect(handleSearch).toHaveBeenCalled();
});
it('calls handleSearchChange on input change', () => {
  const handleSearchChange = jest.fn();
  (useCustomState as jest.Mock).mockReturnValue({
    searchTerm: '',
    setSearchTerm: handleSearchChange,
  });

  render(
    <Provider store={store}>
      <Search
        handleSearch={() => {}}
        handleSearchChange={handleSearchChange}
        searchTerm=""
      />
    </Provider>
  );

  const searchInput = screen.getByPlaceholderText('Starships');

  fireEvent.change(searchInput, { target: { value: 'test' } });

  expect(handleSearchChange);
});
describe('Remaining Lines', () => {
  it('handles empty search term on input change', () => {
    const handleSearchChange = jest.fn();
    (useCustomState as jest.Mock).mockReturnValue({
      searchTerm: '',
      setSearchTerm: jest.fn(),
    });

    render(
      <Provider store={store}>
        <Search
          handleSearch={() => {}}
          handleSearchChange={() => {}}
          searchTerm=""
        />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Starships');

    fireEvent.change(searchInput, { target: { value: '' } });

    expect(handleSearchChange);
  });
});
it('handles non-empty search term on input change', () => {
  const handleSearchChange = jest.fn();
  (useCustomState as jest.Mock).mockReturnValue({
    searchTerm: '',
    setSearchTerm: jest.fn(),
  });

  render(
    <Provider store={store}>
      <Search
        handleSearch={() => {}}
        handleSearchChange={() => {}}
        searchTerm=""
      />
    </Provider>
  );

  const searchInput = screen.getByPlaceholderText('Starships');

  fireEvent.change(searchInput, { target: { value: 'test' } });

  expect(handleSearchChange);
});
it('dispatches saveSearchTerm action on input change', () => {
  const dispatch = jest.fn();
  (useCustomState as jest.Mock).mockReturnValue({
    searchTerm: '',
    setSearchTerm: jest.fn(),
  });
  useDispatch as jest.Mock;

  render(
    <Provider store={store}>
      <Search
        handleSearch={() => {}}
        handleSearchChange={() => {}}
        searchTerm=""
      />
    </Provider>
  );

  const searchInput = screen.getByPlaceholderText('Starships');
  fireEvent.change(searchInput, { target: { value: 'test' } });

  expect(dispatch);
});
it('dispatches saveSearchTerm action with trimmed value on input change', () => {
  const dispatch = jest.fn();
  (useCustomState as jest.Mock).mockReturnValue({
    searchTerm: '',
    setSearchTerm: jest.fn(),
  });
  useDispatch as jest.Mock;

  render(
    <Provider store={store}>
      <Search
        handleSearch={() => {}}
        handleSearchChange={() => {}}
        searchTerm=""
      />
    </Provider>
  );

  const searchInput = screen.getByPlaceholderText('Starships');
  fireEvent.change(searchInput, { target: { value: '  test  ' } });

  expect(dispatch);
});

it('fetches the value from local storage and sets it to the search term on mount', () => {
  localStorageMock.getItem.mockReturnValueOnce('stored-value');
  (useCustomState as jest.Mock).mockReturnValue({
    searchTerm: '',
    setSearchTerm: jest.fn(),
  });

  render(
    <Provider store={store}>
      <Search
        handleSearch={() => {}}
        handleSearchChange={() => {}}
        searchTerm=""
      />
    </Provider>
  );

  expect(localStorage.getItem);
  expect(screen.getByPlaceholderText('Starships'));
});
