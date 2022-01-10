import './CSS/App.css';
import './CSS/FilterBar.css';
import Navbar from './Components/Navbar';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserLat, updateUserLon } from './actions';
import { fetchNearbyPlaces } from './actions';
import Restaurant from './Components/Restaurant';

/**
 * Contains the main body of the application, including the NavBar, FilterBar, and nearby restaurant list.
 * @returns The entire application.
 */
function App() {
  const dispatch = useDispatch();

  const loadingNearbyPlaces = useSelector(state => state.loadingNearbyPlaces);
  const nearbyPlaces = useSelector(state => state.nearbyPlaces);
  const nearbyPlacesLoaded = useSelector(state => state.nearbyPlacesLoaded);
  const lat = useSelector(state => state.user.lat);
  const lon = useSelector(state => state.user.lon);

  const [haveLocation, setHaveLocation] = useState(false);
  const [sortPriority, setSortPriority] = useState('distance');
  const [excludeClosed, setExcludeClosed] = useState(false);
  const [searchText, setSearchText] = useState('');

  let formattedResultsExist = true;

  // This function attempts to get the user's current position in Lat and Lon
  navigator.geolocation.getCurrentPosition(onSuccess, onError);

  /**
   * Changes the haveLocaction's state if the navigatior.geolocation.getCurrentPosition() call is successful.
   */
  const gotLocation = () => {
    setHaveLocation(true);
  };

  /**
   * Updates the sort priority for the list of nearby places.
   * @param {*} priority is the new sort priority for the list of nearby places
   */
  const updateSortPriority = (priority) => {
    setSortPriority(priority);
  }

  function updateSearchText() {
    setSearchText(document.getElementById("inputId").value);
  }

  /**
   * Toggles the value of exclude closed.
   */
  const updateExcludeClosed = (value) => {
    setExcludeClosed(value);
  }

  // Alerts the user if the app can not issue a request to get the user's location
  if (!navigator.geolocation) {
    alert(`Your browser doesn't support Geolocation`);
  }

  

  /**
   * Uses nearbyPlaces returned from the external API and sorts it depending on the value of sortPriority.
   * @returns formatted list of place objects with distanceAsCrowFlies as an added field.
   */
  function formatNearbyPlaces() {
    let newNearbyPlaces = nearbyPlaces.map(place => ({...place, distanceAsCrowFlies: calcCrow(lat, lon, place.geometry.location.lat, place.geometry.location.lng)}));

    if (excludeClosed) {
      newNearbyPlaces = newNearbyPlaces.filter(function (place) {
        if (place.permanently_closed) return false;
        else return place.opening_hours.open_now
      });
    }

    if (searchText != "") {
      console.log(searchText);
      newNearbyPlaces = newNearbyPlaces.filter(function (place) {
        return place.name.toLowerCase().includes(searchText.toLowerCase());
      });
    }

    switch(sortPriority) {
      case 'alphabetical':
        newNearbyPlaces.sort((a, b) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        break;
      case 'distance':
        newNearbyPlaces.sort((a, b) => {
          return a.distanceAsCrowFlies - b.distanceAsCrowFlies;
        });
        break;
      case 'rating':
        newNearbyPlaces.sort((a, b) => {
            return b.rating - a.rating;
          });
          break;     
      default:
        console.log("Sort Priority Not Recognized: See formatNearbyPlaces in App.js");
        break;
    }

    formattedResultsExist = Object.keys(newNearbyPlaces).length != 0;

    return newNearbyPlaces;
  }

  /**
     * Disptaches the external API request to get a lists of nearby restaurarnts based on user parameters
     */
   function findNearbyPlaces() {
      // TODO: Consider adding a check to see if the distance has been changed before disptaching a fetch to avoid being spammed and overcharged
      console.log("Find fetchNearbyPlaces dispatched.");
      const travelDistance = document.getElementById('travelDistanceSelection') ? document.getElementById('travelDistanceSelection').value : 2;
      dispatch(fetchNearbyPlaces(travelDistance, lat, lon));
  }

  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies
  function calcCrow(lat1, lon1, lat2, lon2) 
  {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    //Division by 1.609344 to convert from km to mi
    return d / 1.609344;
  }

  // Converts numeric degrees to radians
  function toRad(Value) 
  {
      return Value * Math.PI / 180;
  }

  /**
   * Handles the success case of the navigatior.geolocation.getCurrentPosition()
   * @param {*} position is the geographical location of the user
   */
  function onSuccess(position) {
    dispatch(updateUserLat(position.coords.latitude));
    dispatch(updateUserLon(position.coords.longitude));
    gotLocation();
  }

  /**
   * Handles the error case of the navigatior.geolocation.getCurrentPosition()
   */
  function onError() {
      alert('Unable to get location.')
  }

  useEffect(() => {
    findNearbyPlaces();
  }, [haveLocation]);

  return (
    <div className="App">
      <Navbar />
      {haveLocation && 
        <div>
          <div className='PageBody-Container'>
            <div className='Pagebody-Filter-Container'>
            <form className='Pagebody-Filter-Form'>
                <input type="text" id="inputId" name="text_input" onChange={() => updateSearchText()} className="Pagebody-Filter-TextInput" placeholder="Have a specific place in mind?"/>
                <select id="travelDistanceSelection" className="Pagebody-Filter-SelectInput" name="distance">
                    <option value="2">2 mi</option>
                    <option value="5">5 mi</option>
                    <option value="7">7 mi</option>
                    <option value="10">10 mi</option>
                </select>
            </form>
            </div>
            <div className='Pagebody-Filter-Submit'>
                <h3 onClick={findNearbyPlaces}>🔎︎</h3>
            </div>
            
          </div>
          <div className='App-SortingBar-Container'>
            <button className='App-SortingBar-Component' onClick={() => updateSortPriority('distance')}>{sortPriority === 'distance' && <span>▼</span>}{sortPriority != 'distance' && <span>▲</span>}Distance</button>
            <button className='App-SortingBar-Component' onClick={() => updateSortPriority('rating')}>{sortPriority === 'rating' && <span>▼</span>}{sortPriority != 'rating' && <span>▲</span>}Rating</button>
            <button className='App-SortingBar-Component' onClick={() => updateSortPriority('alphabetical')}>{sortPriority === 'alphabetical' && <span>▼</span>}{sortPriority != 'alphabetical' && <span>▲</span>}Alphabetical</button>
            <button className='App-SortingBar-Component' onClick={() => updateExcludeClosed(!excludeClosed)}>{excludeClosed && <span>☒</span>}{!excludeClosed && <span>☐</span>}Exclude Closed Restaurants</button>
          </div>
          {loadingNearbyPlaces && <h3 className='App-Info'>Loading...</h3>}
          {nearbyPlacesLoaded && formatNearbyPlaces().map(place => <Restaurant key={place.place_id} restaurant={place}/>)}
          {!formattedResultsExist && haveLocation && <h3 className='App-Info'>No results fit the search or filter criteria, try either expanding the radius of the search or changing your search term.</h3>}
        </div>
      }
      {!haveLocation && <h2>Unable to get user location.</h2>}
    </div>
  );
}

export default App;
