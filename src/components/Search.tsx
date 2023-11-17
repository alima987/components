import React from 'react';
import { ChangeEvent } from 'react';
import { useCustomState } from './Context';
import { useDispatch, useSelector } from 'react-redux';
import { saveSearchTerm } from '../reducers/starships';
import { RootState } from '../reducers/rootReducer';

interface SearchProps {
  handleSearch: () => void;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

const Search = (props: SearchProps) => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state: RootState) => state.starships);
  const { setSearchTerm } = useCustomState();

  return (
    <div className="search">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          const term = e.target.value.trim();
          dispatch(saveSearchTerm(term));
          props.handleSearchChange(e);
        }}
        placeholder="Starships"
      />
      <button type="button" onClick={props.handleSearch}>
        Search ships!
      </button>
    </div>
  );
};

export default Search;
