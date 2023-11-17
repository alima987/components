import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveItemsPerPage } from '../reducers/starships';
import { RootState } from '../reducers/rootReducer';

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
  const dispatch = useDispatch();
  const itemsPerPage = useSelector(
    (state: RootState) => state.starships.itemsPerPage
  );
  const pageSizes = [5, 10, 15];

  const handlePageSizeChange = (pageSize: number) => {
    onPageSizeChange(pageSize);
    dispatch(saveItemsPerPage(pageSize));
  };

  const pageNumbers = Array.from(
    { length: Math.ceil(totalCount / itemsPerPage) },
    (_, index) => index + 1
  );

  return (
    <div className="pagination">
      <div>
        Page Size:
        <select onChange={(e) => handlePageSizeChange(Number(e.target.value))}>
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
