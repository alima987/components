import React from 'react';
import { ChangeEvent } from 'react';
import { useCustomState } from '../Context';
import { useDispatch, useSelector } from 'react-redux';
import { saveSearchTerm } from '../../reducers/characters';
import { RootState } from '../../reducers/rootReducer';
import './Search.scss';

interface SearchProps {
  handleSearch: () => void;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

const Search = (props: SearchProps) => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state: RootState) => state.characters);
  const { setSearchTerm } = useCustomState();

  return (
    <div className="search">
      <input
        className="search_int"
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          const term = e.target.value.trim();
          dispatch(saveSearchTerm(term));
          props.handleSearchChange(e);
        }}
        placeholder="Characters"
      />
      <button className="search_btn" type="button" onClick={props.handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
