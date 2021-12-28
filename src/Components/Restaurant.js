import React from 'react'
import '../CSS/Restaurant.css'

const Restaurant = (props) => {
    const {restaurant} = props;

    /*
    / The restaurant object returned by the Google Places API has the following useful properties:
    /
    / business_status
    / geometry
    /   --> location {lat: X, lng: X}
    /   --> name
    / opening_hours
    /   --> open_now: [true / false]
    / place_id
    / price_level: [integer]
    / types: [Array]
    / vicinity: [Address as a String]
    */

    return (
        <div className='Restaurant-Contianer'>
            <h2>{restaurant.name} . . . . <span className='Restaurant-OpenNow'>Test</span></h2>
        </div>
    )
}

export default Restaurant
