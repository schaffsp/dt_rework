import React from 'react'
import '../CSS/Restaurant.css'

/**
 * Handles each individual restaurant in the list of nearby restaurants.
 * @param {*} props takes in a place object from a list of nearby restaurants. 
 * @returns an individual restaurant that has been formatted.
 */
const Restaurant = (props) => {
    const {restaurant} = props;

    let restaurant_open_text = 'Currently Closed';

    if (restaurant.opening_hours && restaurant.opening_hours.open_now) {
        restaurant_open_text = 'Open Now';
    }
    

    return (
        <div className='Restaurant-Contianer'>
            <div className='Restaurant-Top-Container'>
                <h3>[{restaurant.rating}] {restaurant.name}</h3>
                <h4 id="address" className='Restaurant-address'>{restaurant.vicinity}</h4>
                <h4>{restaurant.distanceAsCrowFlies.toFixed(2)} mi</h4>
                <h4 className='left'>{restaurant_open_text}</h4>
            </div>
        </div>
    )
}

export default Restaurant
