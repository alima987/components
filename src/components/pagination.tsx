import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  onPageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCount / 10); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li key={number} className={number === currentPage ? 'active' : ''}>
          <button type="button" onClick={() => onPageChange(number)}>
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
