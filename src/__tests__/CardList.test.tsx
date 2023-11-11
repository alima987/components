import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResults from '../components/CardList';
import { CustomStateProvider } from '../components/Context';
import { MemoryRouter } from 'react-router-dom';

const mockSearchResults = [
  { name: 'Starship 1', model: 'Model 1', manufacturer: 'Manufacturer 1' },
  { name: 'Starship 2', model: 'Model 2', manufacturer: 'Manufacturer 2' },
];

test('renders search results with correct data', async () => {
  const { getByText, queryByText } = render(
    <MemoryRouter>
      <CustomStateProvider>
        <SearchResults searchResults={mockSearchResults} isLoading={false} />
      </CustomStateProvider>
    </MemoryRouter>
  );

  mockSearchResults.forEach((result) => {
    expect(getByText(result.name)).toBeInTheDocument();
    expect(getByText(`Model: ${result.model}`)).toBeInTheDocument();
    expect(
      getByText(`Manufacturer: ${result.manufacturer}`)
    ).toBeInTheDocument();
  });

  expect(queryByText('Loading...')).not.toBeInTheDocument();
});

test('calls navigate when card is clicked', async () => {
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  const { getByText } = render(
    <MemoryRouter>
      <CustomStateProvider>
        <SearchResults searchResults={mockSearchResults} isLoading={false} />
      </CustomStateProvider>
    </MemoryRouter>
  );

  fireEvent.click(getByText('Starship 1'));

  expect(mockNavigate);
});
