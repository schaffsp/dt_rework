import './App.css';
import Navbar from './Components/Navbar';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserLat, updateUserLon } from './actions';
import PageBody from './Components/PageBody';

function App() {
  const dispatch = useDispatch();
  const [haveLocation, setHaveLocation] = useState(false);

  const gotLocation = () => {
    setHaveLocation(true);
  };

  // alert the user if the app can not get the current location
  if (!navigator.geolocation) {
    alert(`Your browser doesn't support Geolocation`);
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);

  // handle success case of getting user's current position
  function onSuccess(position) {
    dispatch(updateUserLat(position.coords.latitude));
    dispatch(updateUserLon(position.coords.longitude));
    gotLocation();
  }

  // handle error case of getting user's current position
  function onError() {
      alert('Unable to get location.')
  }

  return (
    <div className="App">
      <Navbar />
      {haveLocation && 
        <div>
          <PageBody />
        </div>
      }
      {!haveLocation && <h2>Unable to get user location.</h2>}
    </div>
  );
}

export default App;
