import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';
import { useCustomState } from '../components/Context';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

jest.mock('./Context');

describe('Search component', () => {
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
    expect(screen.getByText('Search ships!')).toBeTruthy();
  });

  it('calls handleSearch and handleSearchChange on input change', () => {
    const handleSearch = jest.fn();
    const handleSearchChange = jest.fn();

    (useCustomState as jest.Mock).mockReturnValue({
      searchTerm: '',
      setSearchTerm: jest.fn(),
    });

    render(
      <Search
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        searchTerm=""
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Starships'), {
      target: { value: 'test' },
    });

    expect(handleSearchChange).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it('saves the entered value to local storage on button click', () => {
    const handleSearch = jest.fn();
    const handleSearchChange = jest.fn();

    (useCustomState as jest.Mock).mockReturnValue({
      searchTerm: 'test',
      setSearchTerm: jest.fn(),
    });

    render(
      <Search
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        searchTerm=""
      />
    );

    fireEvent.click(screen.getByText('Search ships!'));

    expect(localStorage.setItem).toHaveBeenCalledWith('searchTerm', 'test');
  });

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

    expect(localStorage.getItem).toHaveBeenCalledWith('searchTerm');
  });
});
