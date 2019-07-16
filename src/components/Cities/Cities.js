import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import styles from './Cities.scss';
import City from './City/City';
import Fetching from '../Fetching/Fetching';

const Cities = () => {

    const locations = useSelector(state => [
        ...state.locationsReducer
    ], shallowEqual);

    return (
        <div className={ styles.Cities }>
            { locations.map(location => {
                if (location.fetching && !location.updating) {
                    return <Fetching key={ location.placeId } />
                } else if (location.fetched) {
                    return (<City
                        key={ location.placeId }
                        placeId={ location.placeId } 
                        placeName={ location.placeName } 
                        updating={ location.updating } 
                        info={ location.payload.list }
                    />)
                }
            }) }
        </div>
    )
}

export default Cities;