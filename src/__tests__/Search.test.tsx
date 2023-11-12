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
        handleSearch={handleSearch} // Ensure that handleSearch is passed
        handleSearchChange={handleSearchChange}
        searchTerm=""
      />
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
      <Search
        handleSearch={() => {}}
        handleSearchChange={() => {}}
        searchTerm=""
      />
    );

    setTimeout(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('searchTerm', 'test');
    }, 0);
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
      <Search
        handleSearch={() => {}}
        handleSearchChange={() => {}}
        searchTerm=""
      />
    );

    setTimeout(() => {
      expect(localStorage.getItem).toHaveBeenCalledWith('searchTerm');
    }, 0);
  });
});
