import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  test('renders page numbers and page size dropdown', () => {
    const { getByText, getByRole } = render(
      <Pagination
        currentPage={1}
        totalCount={20}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    );

    expect(getByText('1') as HTMLElement);

    expect(getByText('Page Size:'));
    expect(getByRole('combobox'));
  });

  test('calls onPageChange when a page number is clicked', () => {
    const onPageChangeMock = jest.fn();
    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalCount={20}
        onPageChange={onPageChangeMock}
        onPageSizeChange={() => {}}
      />
    );

    fireEvent.click(getByText('2'));

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  test('calls onPageSizeChange when a new page size is selected', () => {
    const onPageSizeChangeMock = jest.fn();
    const { getByRole } = render(
      <Pagination
        currentPage={1}
        totalCount={20}
        onPageChange={() => {}}
        onPageSizeChange={onPageSizeChangeMock}
      />
    );

    fireEvent.change(getByRole('combobox'), { target: { value: '15' } });

    expect(onPageSizeChangeMock).toHaveBeenCalledWith(15);
  });
});
