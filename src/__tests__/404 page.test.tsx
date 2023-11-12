import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../components/404 page';
import { MemoryRouter } from 'react-router-dom';

test('renders 404 Not Found message', () => {
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );

  const headingElement = screen.getByRole('heading', {
    name: /404 Not Found/i,
  });
  const messageElement = screen.getByText(
    /Sorry, the page you are looking for does not exist/i
  );

  expect(headingElement);
  expect(messageElement);
});

test('renders 404 page for invalid route', () => {
  render(
    <MemoryRouter initialEntries={['/invalid-route']}>
      <NotFoundPage />
    </MemoryRouter>
  );

  const headingElement = screen.getByRole('heading', {
    name: /404 Not Found/i,
  });
  const messageElement = screen.getByText(
    /Sorry, the page you are looking for does not exist/i
  );

  expect(headingElement);
  expect(messageElement);
});
