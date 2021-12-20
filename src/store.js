import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Action } from './actions';

const initialState = {
    user: {
        lat: "",
        lon: "",
    }
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
        default:
            return state;
    }
}

export const store = createStore(reducer, initialState, applyMiddleware(thunk));