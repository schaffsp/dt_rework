import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchNearbyPlaces } from '../actions';
import '../CSS/FilterBar.css'

const FilterBar = () => {
    const dispatch = useDispatch();
    const lat = useSelector(state => state.user.lat);
    const lon = useSelector(state => state.user.lon);

    function findNearbyPlaces() {
        // Consider adding a check to see if the distance has been changed before disptaching a fetch to avoid being spammed and overcharged
        console.log("Find fetchNearbyPlaces dispatched.");
        const travelMode = document.getElementById('travelModeSelection').value;
        const travelTime = document.getElementById('travelTimeSelection').value;
        dispatch(fetchNearbyPlaces(travelMode, travelTime, lat, lon));
    }

    return (
        <div className='PageBody-Container'>
            <div className='Pagebody-Filter-Container'>
            <form className='Pagebody-Filter-Form'>
                <input type="text" className="Pagebody-Filter-TextInput" placeholder="Have a specific place in mind?"/>
                <select id="travelTimeSelection" className="Pagebody-Filter-SelectInput" name="distance">
                    <option value="5">5 mins</option>
                    <option value="10">10 mins</option>
                    <option value="15">15 mins</option>
                    <option value="20">20 mins</option>
                </select>
                <select id="travelModeSelection" className="Pagebody-Filter-SelectInput" name="distance">
                    <option value="walking">Walking</option>
                    <option value="driving">Driving</option>
                </select>
            </form>
            </div>
            <div className='Pagebody-Filter-Submit'>
                <h3 onClick={findNearbyPlaces}>Q</h3>
            </div>
            
        </div>
    )
}

export default FilterBar
