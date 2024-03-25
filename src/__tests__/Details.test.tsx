import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Details from '../components/Details/Details';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from '../query/store';

describe('Details component', () => {
  it('displays detailed card data correctly', async () => {
    const mockDetailsData = {
      name: 'Starship 1',
      model: 'Model 1',
      manufacturer: 'Manufacturer 1',
    };

    const mockBody = { results: [mockDetailsData] };

    const mockResponse: Response = {
      json: jest.fn().mockResolvedValue(mockBody),
      body: {
        getReader: () => ({
          read: () => Promise.resolve({ done: true, value: new Uint8Array() }),
        }),
      } as ReadableStream<Uint8Array>,
      bodyUsed: false,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      ok: true,
      redirected: false,
      status: 200,
      statusText: 'OK',
      type: 'basic',
      url: 'https://example.com',
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
      text: jest.fn(),
      clone: jest.fn(),
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);
    jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details?page=1']}>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    const loadingElement = screen.getByText('Loading details...');
    expect(loadingElement).toBeInTheDocument();

    const detailsElement = await screen.findByText(
      'Manufacturer: Manufacturer 1'
    );
    expect(detailsElement).toBeInTheDocument();

    expect(screen.getByText('Starship 1')).toBeInTheDocument();
    expect(screen.getByText('Model: Model 1')).toBeInTheDocument();
    expect(
      screen.getByText('Manufacturer: Manufacturer 1')
    ).toBeInTheDocument();
  });

  it('hides the component when clicking the close button', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details?page=1']}>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    const loadingElement = screen.getByText('Loading details...');
    expect(loadingElement).toBeInTheDocument();

    await screen.findByText('Manufacturer: Manufacturer 1');
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    const modalElement = screen.queryByTestId('modal');
    expect(modalElement).not.toBeInTheDocument();
  });

  it('handles missing page parameter in the URL', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details']}>
          <Details />
        </MemoryRouter>
      </Provider>
    );
    await act(async () => {
      await waitFor(() => {
        expect(screen.getByText('Loading details...')).toBeInTheDocument();
      });
    });
  });

  it('fetches details data correctly', async () => {
    const mockDetailsData = {
      name: 'Starship 1',
      model: 'Model 1',
      manufacturer: 'Manufacturer 1',
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: [mockDetailsData] }),
      headers: { get: () => 'application/json' },
      ok: true,
      redirected: false,
      status: 200,
    } as unknown as Response);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details?page=1']}>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Starship 1')).toBeInTheDocument();
      expect(screen.getByText('Model: Model 1')).toBeInTheDocument();
      expect(
        screen.getByText('Manufacturer: Manufacturer 1')
      ).toBeInTheDocument();
    });
  });
});
