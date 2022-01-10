import { assertResponse } from 'react-thunk';

export const Action = Object.freeze({
    UpdateUserLat: 'UpdateUserLat',
    UpdateUserLon: 'UpdateUserLon',
    AddNearbyPlaces: 'AddNearbyPlaces',
    AppendNearbyPlaces: 'AppendNearbyPlaces',
    LoadingNearbyPlaces: 'LoadingNearbyPlaces',
    NoLongerLoadingNearbyPlaces: 'NoLongerLoadingNearbyPlaces',
});

export function LoadingNearbyPlaces() {
    return {type: Action.LoadingNearbyPlaces, payload: true};
}

export function NoLongerLoadingNearbyPlaces() {
    return {type: Action.NoLongerLoadingNearbyPlaces, payload: false};
}

export function updateUserLat(newLat) {
    return {type: Action.UpdateUserLat, payload: newLat};
}

export function updateUserLon(newLon) {
    return {type: Action.UpdateUserLon, payload: newLon};
}

export function AddNearbyPlaces(places) {
    return {type: Action.AddNearbyPlaces, payload: places};
}

export function AppendNearbyPlaces(places) {
    return {type: Action.AppendNearbyPlaces, payload: places};
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
  

/*
* Documenu key: 0d3eb680d271749b528753dd2cd78b93
* Documenu url: https://cors-anywhere.herokuapp.com/https://api.documenu.com/v2/restaurants/distance?lat=${lat}&lon=${lon}&minutes=${travelTime}&mode=${travelMode}&key=${key}&size=50
*/
export function fetchNearbyPlaces(travelDistance, lat, lon) {
    const key = 'AIzaSyC-GnsYOSBo7-JcT7e83IQl9QKFuwVokD0';
    const travelDistanceMeters = Math.round(travelDistance * 1609.344);
    var axios = require('axios');

    return dispatch => {
        var config = {
            method: 'get',
            url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=${lat}%2C${lon}&radius=${travelDistanceMeters}&type=restaurant&key=${key}`,
            headers: {
                'Access-Control-Allow-Origin' : '*'
             }
        };
        
        axios(config)
            .then(function (response) {

                console.log(response.data);
                dispatch(LoadingNearbyPlaces());
                dispatch(AddNearbyPlaces(response.data.results));
                
                if (response.data.next_page_token) {
                    let token = response.data.next_page_token;
                    console.log(token);
                    sleep(2000).then(() => {
                        config = {
                            method: 'get',
                            url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${key}&pagetoken=${token}`,
                            headers: {
                                'Access-Control-Allow-Origin' : '*'
                             }
                        };
                        axios(config)
                        .then(function (response) {
                            console.log(response.data);
                            dispatch(AppendNearbyPlaces(response.data.results));
            
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    });
                }
                dispatch(NoLongerLoadingNearbyPlaces());

        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
