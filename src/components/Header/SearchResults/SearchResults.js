import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import styles from './SearchResults.scss';

import SearchSuggestion from './SearchSuggestions/SearchSuggestions';
import Loading from '../../Loading/Loading';

const SearchResults = () => {
   const { error, fetching, fetched, searchText, payload } = useSelector(
      state => ({
         ...state.suggestionsReducer
      }),
      shallowEqual
   );

   let jsx;
   if (fetching) {
      jsx = <Loading />;
   } else if (fetched && payload.length > 0) {
      jsx = <SearchSuggestion payload={payload} />;
   } else if (fetched && searchText && payload.length === 0) {
      jsx = <p>Sorry could not find the place</p>;
   } else if (error) {
      jsx = <p>Sorry Mapbox API error</p>;
   } else {
      jsx = null;
   }

   return <div className={styles.SearchResults}>{jsx}</div>;
};

export default SearchResults;
