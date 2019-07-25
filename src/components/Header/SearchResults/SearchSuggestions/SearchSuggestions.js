import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styles from './SearchSuggestions.scss';

import fetchLocationInfo from '../../../../actions/locationsAction';
import { clearSuggestions } from '../../../../actions/suggestionsActions';

const SearchSuggestions = ({ payload }) => {
   const [selected, setSelected] = useState(0);
   const dispatch = useDispatch();

   const keydownEvent = e => {
      if (e.key === 'ArrowUp') {
         selected === 0
            ? setSelected(payload.length - 1)
            : setSelected(e => e - 1);
      } else if (e.key === 'ArrowDown') {
         selected === payload.length - 1
            ? setSelected(0)
            : setSelected(e => e + 1);
      } else if (e.key === 'Enter') {
         const { id, place_name } = payload[selected];
         const [lon, lat] = payload[selected].center;
         dispatch(fetchLocationInfo(id, place_name, lon, lat));
         dispatch(clearSuggestions());
      }
      return;
   };

   useEffect(() => {
      addEventListener('keydown', keydownEvent);

      return () => {
         removeEventListener('keydown', keydownEvent);
      };
   }, [keydownEvent]);

   const handleOnClick = (id, place_name, lon, lat) => {
      dispatch(fetchLocationInfo(id, place_name, lon, lat));
      dispatch(clearSuggestions());
   };

   return (
      <>
         {payload.map(({ id, place_name, center }, index) => (
            <div
               key={id}
               style={index === selected ? { backgroundColor: '#00888c' } : {}}
               onClick={() =>
                  handleOnClick(id, place_name, center[0], center[1])
               }
               className={styles.SearchResult}
            >
               {place_name}
            </div>
         ))}
      </>
   );
};

export default SearchSuggestions;
