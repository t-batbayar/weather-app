import React from 'react';
import { Provider } from 'react-redux';

import 'normalize.css';
import 'weather-icons/css/weather-icons.min.css';
import styles from './WeatherApp.css';
import store from './store/store';
import Header from './components/Header/Header';
import Cities from './components/Cities/Cities';

const WeatherApp = () => {
   return (
      <Provider store={store}>
         <div className={styles.WeatherAppContainer}>
            <div className={styles.WeatherApp}>
               <Header />
               <Cities />
            </div>
         </div>
      </Provider>
   );
};
export default WeatherApp;
