import React from 'react';

import styles from './Forecast.scss';

const ForecastDay = ({ dt, temp, weather, handleGetDateInfo, handleIcon }) => {
   return (
      <div key={dt} className={styles.Forecast}>
         <div className={styles.Forecast__Day}>
            <div>{handleGetDateInfo(dt, 'day')}</div>
         </div>
         <div className={styles.Forecast__Info}>
            <div className={styles.Forecast__Info__Temp}>
               {Math.round(temp.max)}{' '}
               <i className={`wi wi-degrees ${styles.Forecast__Info__Temp}`} />C
            </div>
            <i
               className={`${handleIcon(weather[0].id)} ${
                  styles.Forecast__Info__Icon
               }`}
            />
            <div className={styles.Forecast__Info__Text}>{weather[0].main}</div>
         </div>
         <div className={styles.Forecast__Date}>
            {handleGetDateInfo(dt, 'dateShort')}
         </div>
      </div>
   );
};

export default ForecastDay;
