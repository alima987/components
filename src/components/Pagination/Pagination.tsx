import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveItemsPerPage } from '../../reducers/characters';
import { RootState } from '../../reducers/rootReducer';
import './Pagination.scss';

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
    (state: RootState) => state.characters.itemsPerPage
  );
  const pageSizes = [20, 30, 40];
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const getPageNumbers = () => {
    const pagesToShow = 7;
    let startPage = currentPage - Math.floor(pagesToShow / 2);
    startPage = Math.max(startPage, 1);
    let endPage = startPage + pagesToShow - 1;
    endPage = Math.min(endPage, totalPages);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSizeChange = (pageSize: number) => {
    onPageSizeChange(pageSize);
    dispatch(saveItemsPerPage(pageSize));
  };

  return (
    <div className="pagination">
      <div className="page-size">
        Page Size:
        <select
          className="select"
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <ul className="pag-nums">
        <li>
          <button className="pag-items" onClick={handlePrevPage}>
            &lt;
          </button>
        </li>
        {getPageNumbers().map((number) => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <button
              className="pag-items"
              type="button"
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button className="pag-items" onClick={handleNextPage}>
            &gt;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
