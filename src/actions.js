import { assertResponse } from 'react-thunk';

export const Action = Object.freeze({
    UpdateUserLat: 'UpdateUserLat',
    UpdateUserLon: 'UpdateUserLon',
    AddNearbyPlaces: 'AddNearbyPlaces',
});

export function updateUserLat(newLat) {
    return {type: Action.UpdateUserLat, payload: newLat};
}

export function updateUserLon(newLon) {
    return {type: Action.UpdateUserLon, payload: newLon};
}

export function AddNearbyPlaces(places) {
    return {type: Action.AddNearbyPlaces, payload: places};
}

export function fetchNearbyPlaces(radius, lat, lon) {
    const key = 'AIzaSyC-GnsYOSBo7-JcT7e83IQl9QKFuwVokD0';
    var axios = require('axios');

    return dispatch => {
        /*
        / The 'https://cors-anywhere.herokuapp.com/' prefix is temporary and should be replaced.
        / --> Note that the google places api uses meters as radius
        */
        var config = {
            method: 'get',
            url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&type=restaurant&key=${key}`,
            headers: { }
        };
        
        axios(config)
            .then(function (response) {
            dispatch(AddNearbyPlaces(response.data.results));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}