import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Message from '../../../Message/Message';
import styles from './SuggestionFailMessage.scss';

import { clearSuggestions } from '../../../../actions/suggestionsActions';

const SuggestionFailMessage = props => {

   const dispatch = useDispatch();

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

   return (
      <div className={ styles.SuggestionFailMessage }>
         <Message message={ props.message } />
      </div>
   )
}

export default SuggestionFailMessage;