import { combineReducers } from 'redux';
import suggestionsReducer from './suggestionsReducer';
import locationsReducer from './locationsReducer';

const rootReducer = combineReducers({
   suggestionsReducer,
   locationsReducer
});

export default rootReducer;