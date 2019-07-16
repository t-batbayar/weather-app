import {
   FETCH_SUGGESTIONS_START,
   RECIEVE_SUGGESTIONS,
   FETCH_SUGGESTIONS_FAIL,
   CLEAR_SUGGESTIONS
} from '../actions/types';

const SUGGESTIONS_INITIAL_STATE = {
   fetching: false,
   fetched: false,
   error: null,
   payload: [],
   searchText: ''
};

const suggestionReducer = (state = SUGGESTIONS_INITIAL_STATE, action) => {
   switch (action.type) {
      case FETCH_SUGGESTIONS_START:
         return {
            ...SUGGESTIONS_INITIAL_STATE,
            fetching: true,
            fetched: false
         };
      case FETCH_SUGGESTIONS_FAIL:
         return {
            ...state,
            fetching: false,
            fetched: false,
            error: action.payload,
            searchText: action.searchText
         };
      case RECIEVE_SUGGESTIONS:
         return {
            ...state,
            fetching: false,
            fetched: true,
            error: null,
            payload: action.payload,
            searchText: action.searchText
         };
      case CLEAR_SUGGESTIONS:
         return {
            ...SUGGESTIONS_INITIAL_STATE
         };
      default:
         return state;
   }
};

export default suggestionReducer;
