import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Action } from './actions';

const initialState = {
    user: {
        lat: "",
        lon: "",
    },
    nearbyPlaces: [],
    loadingNearbyPlaces: false,
    nearbyPlacesLoaded: false,
};

function reducer(state, action) {
    switch (action.type) {
        case Action.UpdateUserLat:
            return {
                ...state,
                user: {
                    lat: action.payload,
                    lon: state.user.lon
                }
            };
        case Action.UpdateUserLon:
            return {
                ...state,
                user: {
                    lat: state.user.lat,
                    lon: action.payload
                }
            };
        case Action.AddNearbyPlaces:
            return {
                ...state,
                nearbyPlaces: action.payload
            }
        case Action.LoadingNearbyPlaces:
            return {
                ...state,
                loadingNearbyPlaces: action.payload
            }
        case Action.NoLongerLoadingNearbyPlaces:
            return {
                ...state,
                loadingNearbyPlaces: action.payload,
                nearbyPlacesLoaded: true,
            }
        default:
            return state;
    }
}

export const store = createStore(reducer, initialState, applyMiddleware(thunk));