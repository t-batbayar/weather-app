import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';

const INITIAL_STATE = {};

const middleware = applyMiddleware(thunk);

const store = createStore(
   rootReducer, 
   INITIAL_STATE, 
   middleware
);

export default store;