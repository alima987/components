import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
    const linkElement = screen.getByText(/Search ships!/i);
    expect(linkElement).toBeTruthy();
  });

  it('handles search term change', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(
      'Starships'
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(inputElement.value).toBe('test');
  });

  it('performs search', async () => {
    render(<App />);
    const buttonElement = screen.getByText('Search ships!');
    fireEvent.click(buttonElement);
    await act(async () => {
      expect(screen.getByText('Loading...')).toBeTruthy();
    });
  });

  it('throws error on button click', () => {
    render(<App />);
    const buttonElement = screen.getByText('Error');
    expect(() => {
      fireEvent.click(buttonElement);
    }).toThrow('Test error thrown by the button click');
  });

  it('handles page change', () => {
    render(<App />);
    const pageChangeButton = screen.getByLabelText('Go to page 2');
    fireEvent.click(pageChangeButton);
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('handles page size change', () => {
    render(<App />);
    const pageSizeSelect = screen.getByLabelText('Items per page:');
    fireEvent.change(pageSizeSelect, { target: { value: '10' } });
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('handles API error', async () => {
    jest.spyOn(window, 'fetch').mockRejectedValueOnce(new Error('API Error'));

    render(<App />);
    const buttonElement = screen.getByText('Search ships!');
    fireEvent.click(buttonElement);

    await act(async () => {
      expect(
        screen.getByText('Something went wrong. Please try again later.')
      ).toBeTruthy();
    });

    jest.restoreAllMocks();
  });
});
