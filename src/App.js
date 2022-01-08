import './App.css';
import Navbar from './Components/Navbar';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserLat, updateUserLon } from './actions';
import FilterBar from './Components/FilterBar';
import Restaurant from './Components/Restaurant';

/**
 * Contains the main body of the application, including the NavBar, FilterBar, and nearby estaurant list.
 * @returns The entire application.
 */
function App() {
  const dispatch = useDispatch();

  const loadingNearbyPlaces = useSelector(state => state.loadingNearbyPlaces);
  const nearbyPlaces = useSelector(state => state.nearbyPlaces);
  const nearbyPlacesLoaded = useSelector(state => state.nearbyPlacesLoaded);

  const [haveLocation, setHaveLocation] = useState(false);
  const [sortPriority, setSortPriority] = useState('alphabetical');

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

  // Alerts the user if the app can not issue a request to get the user's location
  if (!navigator.geolocation) {
    alert(`Your browser doesn't support Geolocation`);
  }

  // This function attempts to get the user's current position in Lat and Lon
  navigator.geolocation.getCurrentPosition(onSuccess, onError);

  /**
   * Uses nearbyPlaces returned from the external API and sorts it depending on the value of sortPriority.
   * @returns formatted list of place objects with distanceAsCrowFlies as an added field.
   */
  function formatNearbyPlaces() {
    const nearbyPlacesFormatted = nearbyPlaces.data.map(place => ({...place, distanceAsCrowFlies: 0.7}))

    switch(sortPriority) {
      case 'alphabetical':
        nearbyPlacesFormatted.sort((a, b) => {
            let fa = a.firstName.toLowerCase(),
                fb = b.firstName.toLowerCase();
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        break;
      default:
        console.log("Sort Priority Not Recognized: See formatNearbyPlaces in App.js");
        break;
    }

    return nearbyPlacesFormatted;
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

  return (
    <div className="App">
      <Navbar />
      {haveLocation && 
        <div>
          <FilterBar />
          {loadingNearbyPlaces && <h3>Loading...</h3>}
          {nearbyPlacesLoaded && formatNearbyPlaces().data.map(place => <Restaurant key={place.restaurant_id} restaurant={place}/>)}
        </div>
      }
      {!haveLocation && <h2>Unable to get user location.</h2>}
    </div>
  );
}

export default App;
