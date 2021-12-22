import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchNearbyPlaces } from '../actions';
import '../CSS/PageBody.css'

const PageBody = () => {
    const lat = useSelector(state => state.user.lat);
    const lon = useSelector(state => state.user.lon);
    const DEFAULT_DISTANCE = 2;
    var distance = DEFAULT_DISTANCE;
    
    const nearbyPlaces = useSelector(state => state.nearbyPlaces);

    const dispatch = useDispatch();
    //dispatch(fetchNearbyPlaces(1500, lat, lon));
    console.log(nearbyPlaces);

    function distanceChanged(new_distance) {
        distance = new_distance;
        var output = document.getElementById("willing-to-drive");
        output.innerHTML = new_distance;
        var singularPlural = document.getElementById("willing-to-drive-s");
        if (new_distance == 1) {
            singularPlural.innerHTML = "";
        } else {
            singularPlural.innerHTML = "s";
        }
    }

    return (
        <div className='PageBody-PlacesOptions-Container'>
            <h2>I can drive <span id="willing-to-drive">{DEFAULT_DISTANCE}</span> mile<span id="willing-to-drive-s">s</span> for food!</h2>
            <input type="range" min="1" max="30" defaultValue={DEFAULT_DISTANCE} onChange={(evt) => { distanceChanged(evt.target.value); }} className="PageBody-PlacesOptions-Slider" id="slider"></input>
        </div>
    )
}
    //{nearbyPlaces.map(place => <h1>H: {console.log(place)}{place.name}</h1>)}
export default PageBody
