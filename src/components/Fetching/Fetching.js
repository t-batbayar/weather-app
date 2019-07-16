import React from 'react';

import styles from './Fetching.scss';

const Fetching = () => {
   return (
      <div className={ styles.SpinnerContainer }>
         <div className={ styles.Spinner }>
            <div className={ styles.Bounce1 }></div>
            <div className={ styles.Bounce2 }></div>
            <div className={ styles.Bounce3 }></div>
         </div>
      </div>
   );
}

export default Fetching;