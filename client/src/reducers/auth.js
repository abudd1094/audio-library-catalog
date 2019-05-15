import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'), // default for the token in our state
  isAuthenticated: null, // boolean to indicate logged in status
  loading: true, // will set to false once we load the data
  user: null,
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  
  switch(type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload // name, email, etc... everything except the password
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token); // set the token in the state once logged in
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case AUTH_ERROR: // this does the same as the below case, clears all auth state and token from local storage
    case LOGIN_FAIL: // all failure instance will clear out the token
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    default:
      return state;
  }
}