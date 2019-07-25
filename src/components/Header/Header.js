import React from 'react';

import styles from './Header.scss';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';

const Header = () => {
   return (
      <div className={styles.Header}>
         <h1>Weather App</h1>
         <SearchBar />
         <SearchResults />
      </div>
   );
};

export default Header;
