import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import fetchLocations, {
   clearSuggestions
} from '../../../actions/suggestionsActions';

import styles from './SearchBar.scss';

const SearchBar = () => {
   const [searchValue, setSearchValue] = useState('');
   const dispatch = useDispatch();

   const searchTimeoutId = useRef(0);
   const handleSearchInput = e => {
      clearTimeout(searchTimeoutId.current);
      const searchValue = e.target.value;
      if (searchValue.length > 0) {
         searchTimeoutId.current = setTimeout(() => {
            dispatch(fetchLocations(searchValue));
         }, 500);
      } else {
         dispatch(clearSuggestions());
      }
      setSearchValue(searchValue);
   };

   return (
      <div className={styles.SearchBar}>
         <input
            id="searchInput"
            type="text"
            placeholder="Search by place name..."
            name="location"
            value={searchValue}
            onChange={e => handleSearchInput(e)}
            className={styles.SearchInput}
            autoComplete="off"
         />
      </div>
   );
};

export default SearchBar;
