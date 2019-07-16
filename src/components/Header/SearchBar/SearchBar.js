import React, { useState, useRef } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import fetchLocations, {
   clearSuggestions
} from '../../../actions/suggestionsActions';

import styles from './SearchBar.scss';

import Suggestion from './Suggestion/Suggestion';
import SuggestionFailMessage from './SuggestionFailMessage/SuggestionFailMessage';
import Loading from '../../Loading/Loading';

function SearchBar() {
   const [searchValue, setSearchValue] = useState('');
   const dispatch = useDispatch();
   const { error, fetching, fetched, searchText, payload } = useSelector(
      state => ({
         ...state.suggestionsReducer
      }),
      shallowEqual
   );

   const handleFormSubmit = e => {
      e.preventDefault();
   };

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

   let suggestionsJsx;
   if (fetching) {
      suggestionsJsx = <Loading />;
   } else if (fetched && payload.length > 0) {
      suggestionsJsx = payload.map(({ id, place_name, center }) => (
         <Suggestion
            key={id}
            placeId={id}
            placeName={place_name}
            lon={center[0]}
            lat={center[1]}
         />
      ));
   } else if (fetched && searchText && payload.length === 0) {
      suggestionsJsx = (
         <SuggestionFailMessage message="Sorry couldn't find the place" />
      );
   } else if (error) {
      suggestionsJsx = (
         <SuggestionFailMessage message="Sorry Mapbox API error" />
      );
   } else {
      suggestionsJsx = null;
   }

   return (
      <div className={styles.SearchBar}>
         <form onSubmit={handleFormSubmit} autoComplete="off">
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
         </form>

         <div className={styles.SearchSuggestions}>{suggestionsJsx}</div>
      </div>
   );
}

export default SearchBar;
