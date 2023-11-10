import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import SearchResults, { Starship } from '../components/SearchResults';
import { useCustomState } from '../components/Context';

jest.mock('../components/Context');
const mockApiFetch = jest.fn(() => Promise.resolve({}));

const mockSearchResults: Starship[] = [
  { name: 'Starship 1', model: 'Model 1', manufacturer: 'Manufacturer 1' },
  { name: 'Starship 2', model: 'Model 2', manufacturer: 'Manufacturer 2' },
];

describe('SearchResults component', () => {
  beforeEach(() => {
    (useCustomState as jest.Mock).mockReturnValue({});
  });

  it('renders the loading indicator', () => {
    render(
      <MemoryRouter>
        <SearchResults searchResults={[]} isLoading={true} />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <SearchResults searchResults={mockSearchResults} isLoading={false} />
      </MemoryRouter>
    );

    const cardElements = screen.getAllByTestId('result-item');
    expect(cardElements).toHaveLength(mockSearchResults.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    render(
      <MemoryRouter>
        <SearchResults searchResults={[]} isLoading={false} />
      </MemoryRouter>
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('opens a detailed card component on card click', async () => {
    render(
      <MemoryRouter>
        <SearchResults searchResults={mockSearchResults} isLoading={false} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Starship 1'));

    // Wait for the API call to be triggered
    await act(async () => {
      await waitFor(() => expect(mockApiFetch).toHaveBeenCalled());
    });
  });

  it('triggers an additional API call on card click', async () => {
    render(
      <MemoryRouter>
        <SearchResults searchResults={mockSearchResults} isLoading={false} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Starship 1'));

    // Wait for the API call to be triggered
    await act(async () => {
      await waitFor(() => expect(mockApiFetch).toHaveBeenCalled());
    });
  });
});
