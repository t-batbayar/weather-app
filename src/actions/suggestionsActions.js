import {
   FETCH_SUGGESTIONS_START,
   RECIEVE_SUGGESTIONS,
   FETCH_SUGGESTIONS_FAIL,
   CLEAR_SUGGESTIONS
} from './types';

const MAPBOX_ACCESS_TOKEN =
   'pk.eyJ1IjoidC1iYXRiYXlhciIsImEiOiJjang4cnlpYnowM3AzM29xN3FuaGhrYmpvIn0.NTeGJep8gknU1EWYaAVgQg';
const types = 'country%2Cregion%2Cplace';
const limit = '3';

const fetchSuggestionsStart = () => ({
   type: FETCH_SUGGESTIONS_START
});

const recieveSuggestions = (payload, searchText) => ({
   type: RECIEVE_SUGGESTIONS,
   payload,
   searchText
});

const fetchSuggestionsError = payload => ({
   type: FETCH_SUGGESTIONS_FAIL,
   payload
});

// Clear suggestions array
export const clearSuggestions = () => ({
   type: CLEAR_SUGGESTIONS
});

const fetchSuggestions = searchText => dispatch => {
   dispatch(fetchSuggestionsStart());
   fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/search_text=${searchText}.json?types=${types}&limit=${limit}&access_token=${MAPBOX_ACCESS_TOKEN}`
   )
      .then(response => {
         if (!response.ok) {
            throw Error(response.statusText);
         }
         return response.json();
      })
      .then(({ features: payload }) =>
         dispatch(recieveSuggestions(payload, searchText))
      )
      .catch(error => dispatch(fetchSuggestionsError(error)));
};

export default fetchSuggestions;
