import { FETCH_LOCATION_WEATHER_START, RECIEVE_LOCATION_WEATHER, FETCH_LOCATION_WEATHER_FAIL } from './types';

const OPENWEATHERMAP_API = '8de4dd0e1e2024327b50bf5b3e4b013f';
const days = '6';
const units = 'metric'

const initialState = {
   placeId: '',
   updating: false,
   fetching: false,
   fetched: false,
   error: null,
   payload: {},
   placeName: ''
}

const fetchLocationWeatherStart = (placeId, placeName) => {
   return {
      type: FETCH_LOCATION_WEATHER_START,
      locationData: {
         ...initialState,
         placeId,
         fetched: false,
         fetching: true,
         placeName
      }
   };
}

const recieveLocationWeather = (placeId, placeName, payload) => {
   return {
      type: RECIEVE_LOCATION_WEATHER,
      locationData: {
         ...initialState,
         placeId,
         fetched: true,
         payload,
         placeName
      }
   }
};

const fetchLocationWeatherFail = (placeId, placeName) => {
   return {
      type: FETCH_LOCATION_WEATHER_FAIL,
      locationData: {
         ...initialState,
         placeId,
         placeName,
         error: true
      }
   }
};

const fetchLocationInfo = (placeId, placeName, lat, lon) => dispatch => {
   dispatch(fetchLocationWeatherStart(placeId, placeName));
   fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${ lon }&lon=${ lat }&cnt=${ days }&units=${ units }&appid=${ OPENWEATHERMAP_API }`)
      .then(response => {
         if (!response.ok) {
            throw Error(response.statusText);
         }
         return response.json()
      })
      .then((payload) => dispatch(recieveLocationWeather(placeId, placeName, payload)))
      .catch(() => dispatch(fetchLocationWeatherFail(placeId, placeName)))
}

export default fetchLocationInfo;