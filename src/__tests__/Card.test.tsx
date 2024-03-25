import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from '../components/SearchResults/Card';

const mockItem = {
  name: 'Starship 1',
  model: 'Model 1',
  manufacturer: 'Manufacturer 1',
};

test('renders card with correct data', () => {
  const onItemClick = jest.fn();
  render(<Card item={mockItem} onItemClick={onItemClick} />);

  expect(screen.getByText(mockItem.name)).toBeInTheDocument();
  expect(screen.getByText(`Model: ${mockItem.model}`)).toBeInTheDocument();
  expect(
    screen.getByText(`Manufacturer: ${mockItem.manufacturer}`)
  ).toBeInTheDocument();
});

test('calls onItemClick when card is clicked', () => {
  const onItemClick = jest.fn();
  render(<Card item={mockItem} onItemClick={onItemClick} />);

  fireEvent.click(screen.getByText(mockItem.name));

  expect(onItemClick).toHaveBeenCalledWith(mockItem);
});
