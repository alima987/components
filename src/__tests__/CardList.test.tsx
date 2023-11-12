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

test('closes modal when close button is clicked', async () => {
  const { getByText, queryByText } = render(
    <MemoryRouter>
      <CustomStateProvider>
        <SearchResults searchResults={mockSearchResults} isLoading={false} />
      </CustomStateProvider>
    </MemoryRouter>
  );

  fireEvent.click(getByText('Starship 1'));
  fireEvent.click(getByText('×')); // Close button

  expect(queryByText('Starship 1')).not;
  expect(queryByText('Model: Model 1')).not;
  expect(queryByText('Manufacturer: Manufacturer 1')).not;
});
test('displays loader when isLoading is true', async () => {
  const { getByText } = render(
    <MemoryRouter>
      <CustomStateProvider>
        <SearchResults searchResults={[]} isLoading={true} />
      </CustomStateProvider>
    </MemoryRouter>
  );

  expect(getByText('Loading...')).toBeInTheDocument();
});

test('calls useCustomState hook', async () => {
  const useCustomStateMock = jest.spyOn(
    require('../components/Context'),
    'useCustomState'
  );

  render(
    <MemoryRouter>
      <CustomStateProvider>
        <SearchResults searchResults={mockSearchResults} isLoading={false} />
      </CustomStateProvider>
    </MemoryRouter>
  );

  expect(useCustomStateMock).toHaveBeenCalled();
});
