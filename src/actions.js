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

export function fetchNearbyPlaces(travelMode, travelTime, lat, lon) {
    const key = '0d3eb680d271749b528753dd2cd78b93';
    var axios = require('axios');

    return dispatch => {
        var config = {
            method: 'get',
            url: `https://api.documenu.com/v2/restaurants/distance?lat=${lat}&lon=${lon}&minutes=${travelTime}&mode=${travelMode}&key=${key}`,
            headers: {
                'Access-Control-Allow-Origin':'http://localhost:3000'
            }
        };
        
        axios(config)
            .then(function (response) {
                console.log(response.data)
            dispatch(AddNearbyPlaces(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

function getBoundingBox (centerPoint, distance) {
    var MIN_LAT, MAX_LAT, MIN_LON, MAX_LON, R, radDist, degLat, degLon, radLat, radLon, minLat, maxLat, minLon, maxLon, deltaLon;
    if (distance < 0) {
      return 'Illegal arguments';
    }
    // helper functions (degrees<–>radians)
    Number.prototype.degToRad = function () {
      return this * (Math.PI / 180);
    };
    Number.prototype.radToDeg = function () {
      return (180 * this) / Math.PI;
    };
    // coordinate limits
    MIN_LAT = (-90).degToRad();
    MAX_LAT = (90).degToRad();
    MIN_LON = (-180).degToRad();
    MAX_LON = (180).degToRad();
    // Earth's radius (km)
    R = 6378.1;
    // angular distance in radians on a great circle
    radDist = distance / R;
    // center point coordinates (deg)
    degLat = centerPoint[0];
    degLon = centerPoint[1];
    // center point coordinates (rad)
    radLat = degLat.degToRad();
    radLon = degLon.degToRad();
    // minimum and maximum latitudes for given distance
    minLat = radLat - radDist;
    maxLat = radLat + radDist;
    // minimum and maximum longitudes for given distance
    minLon = void 0;
    maxLon = void 0;
    // define deltaLon to help determine min and max longitudes
    deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
    if (minLat > MIN_LAT && maxLat < MAX_LAT) {
      minLon = radLon - deltaLon;
      maxLon = radLon + deltaLon;
      if (minLon < MIN_LON) {
        minLon = minLon + 2 * Math.PI;
      }
      if (maxLon > MAX_LON) {
        maxLon = maxLon - 2 * Math.PI;
      }
    }
    // a pole is within the given distance
    else {
      minLat = Math.max(minLat, MIN_LAT);
      maxLat = Math.min(maxLat, MAX_LAT);
      minLon = MIN_LON;
      maxLon = MAX_LON;
    }
    return [
      minLon.radToDeg(),
      minLat.radToDeg(),
      maxLon.radToDeg(),
      maxLat.radToDeg()
    ];
  };