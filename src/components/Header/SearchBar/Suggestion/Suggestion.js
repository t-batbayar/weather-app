import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import fetchLocationInfo from '../../../../actions/locationsAction';
import { clearSuggestions } from '../../../../actions/suggestionsActions';
import styles from './Suggestion.scss';

const Suggestion = ({ placeId, placeName, lon, lat }) => {

   const handleEscPress = (event) => {
      if (event.key === 'Escape') {
         document.getElementById('searchInput').value = '';
         dispatch(clearSuggestions());
      }
   }

   useEffect(() => {
      addEventListener('keydown', handleEscPress);
      // Clear event listener
      return () => removeEventListener('keydown', handleEscPress);
   });

   const dispatch = useDispatch();

   const handleSuggestionClick = (placeId, placeName, lon, lat) => {
      dispatch(fetchLocationInfo(placeId, placeName, lon, lat));
      document.getElementById('searchInput').value = '';
      dispatch(clearSuggestions());
   }

   return (
      <p className={ styles.Suggestion } onClick={ () => handleSuggestionClick(placeId, placeName, lon, lat) }>{ placeName }</p>
   )
}

export default Suggestion;