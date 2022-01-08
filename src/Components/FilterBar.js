import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchNearbyPlaces } from '../actions';
import '../CSS/FilterBar.css'

/**
 * Formats a section for the user to select options before the API request is fired off that returns a list of nearby restuarants.
 * @returns a bar with different options for the external API request that returns a list of nearby restaurants.
 */
const FilterBar = () => {
    const dispatch = useDispatch();
    const lat = useSelector(state => state.user.lat);
    const lon = useSelector(state => state.user.lon);

    /**
     * Disptaches the external API request to get a lists of nearby restaurarnts based on user parameters
     */
    function findNearbyPlaces() {
        // TODO: Consider adding a check to see if the distance has been changed before disptaching a fetch to avoid being spammed and overcharged
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
                    <option value="driving">Driving</option>
                    <option value="walking">Walking</option>
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
