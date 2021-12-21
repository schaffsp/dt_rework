import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';

const PageBody = () => {
    const lat = useSelector(state => state.user.lat);
    const lon = useSelector(state => state.user.lon);
    const [nearbyPlaces, setNearbyPlaces] = useState('');

    // I know this is a bad idea but its temporary
    const key = 'AIzaSyC-GnsYOSBo7-JcT7e83IQl9QKFuwVokD0';

    var axios = require('axios');

    const updateNearbyPlaces = newPlaces => {
        setNearbyPlaces(newPlaces);
    }

    /*
    / The 'https://cors-anywhere.herokuapp.com/' prefix is temporary and should be replaced.
    / Currently, radius is locked at 1.5 km but it can be easily changed to a dynamic number
    / --> Note that the google places api uses meters as radius
    */
    var config = {
    method: 'get',
    url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=1500&type=restaurant&key=${key}`,
    headers: { }
    };

    axios(config)
        .then(function (response) {
        //console.log(response.data.results);
        updateNearbyPlaces(response.data.results);
    })
    .catch(function (error) {
        console.log(error);
    });

    console.log(nearbyPlaces);

    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}
//{nearbyPlaces.map(place => <h1>H: {console.log(place)}{place.name}</h1>)}
export default PageBody
