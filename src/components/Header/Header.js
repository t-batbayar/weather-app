import React from 'react';

import styles from './Header.scss';
import SearchBar from './SearchBar/SearchBar';

const Header = () => {
    return (
        <div className={ styles.Header }>
            <h1>Weather App</h1>
            <SearchBar />
        </div>
    );
};

export default Header;