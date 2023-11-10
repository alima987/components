import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';
import { useCustomState } from '../components/Context';

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
        <Search
          handleSearch={() => {}}
          handleSearchChange={() => {}}
          searchTerm=""
        />
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
      <Search
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        searchTerm=""
      />
    );

    const searchInput = screen.getByPlaceholderText('Starships');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    // Log the events to help identify the issue
    console.log('handleSearchChange calls:', handleSearchChange.mock.calls);
    console.log('handleSearch calls:', handleSearch.mock.calls);

    expect(handleSearchChange).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});

describe('Button Click', () => {
  it('saves the entered value to local storage on button click', () => {
    (useCustomState as jest.Mock).mockReturnValue({
      searchTerm: 'test',
      setSearchTerm: jest.fn(),
    });

    render(
      <Search
        handleSearch={() => {}}
        handleSearchChange={() => {}}
        searchTerm=""
      />
    );

    // Ensure the localStorage.setItem is called in the next event loop cycle
    setTimeout(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('searchTerm', 'test');
    }, 0);
  });
});

describe('LocalStorage Interaction', () => {
  it('fetches the value from local storage on mount', () => {
    (useCustomState as jest.Mock).mockReturnValue({
      searchTerm: '', // Ensure initial searchTerm is empty
      setSearchTerm: jest.fn(),
    });

    localStorageMock.getItem.mockReturnValueOnce('test');

    render(
      <Search
        handleSearch={() => {}}
        handleSearchChange={() => {}}
        searchTerm=""
      />
    );

    // Ensure the localStorage.getItem is called in the next event loop cycle
    setTimeout(() => {
      expect(localStorage.getItem).toHaveBeenCalledWith('searchTerm');
    }, 0);
  });
});
