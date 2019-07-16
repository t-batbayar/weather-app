import { FETCH_LOCATION_WEATHER_START, RECIEVE_LOCATION_WEATHER, FETCH_LOCATION_WEATHER_FAIL } from '../actions/types';

const LOCATIONS_INITIAL_STATE = [];

const locationsReducer = (state = LOCATIONS_INITIAL_STATE, action) => {
   switch (action.type) {
      case FETCH_LOCATION_WEATHER_START: {
         const index = state.findIndex(({ placeId = '' }) => placeId === action.locationData.placeId);
         if (index === -1) {
            return [ action.locationData, ...state ]
         }
         const newState = state.map((location, i) => i === index ? 
            { ...location, updating: true } : 
            { ...location })
         return [ ...newState ]
      }
      case RECIEVE_LOCATION_WEATHER: {
         const index = state.findIndex(({ placeId = '' }) => placeId === action.locationData.placeId)
         if (index === -1) {
            return [ action.locationData, ...state ]
         }
         const newState = state.map((location, i) => i === index ? 
            { ...location, updating: false, ...action.locationData } :
            { ...location }
         )
         return [ ...newState ];
      }
      // case RECIEVE_LOCATION_WEATHER: {
      //    const index = state.findIndex(({ locationId }) => locationId === action.locationId);
      //    if (index !== -1) {
      //       return [ action.locationData, ...state ]
      //    }
      //    return state
      // }
      // case FETCH_LOCATION_WEATHER_FAIL:
      //    return [ action.locationData, ...state ]
      default:
         return state;
   }
}

export default locationsReducer;