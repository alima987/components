import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  onPageChange: (pageNumber: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  onPageChange,
  onPageSizeChange,
}) => {
  const pageNumbers = [];
  const pageSizes = [5, 10, 15];

  for (let i = 1; i <= Math.ceil(totalCount / 10); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <div>
        Page Size:
        <select onChange={(e) => onPageSizeChange(Number(e.target.value))}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <button type="button" onClick={() => onPageChange(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
