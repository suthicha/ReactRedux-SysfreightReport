import { AUTH_LOGIN, UNAUTH_LOGIN, ERROR_LOGIN, AUTH_REGISTER } from  '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_REGISTER:
      return { ...state, authenticated: false}
    case AUTH_LOGIN:
      return { ...state, authenticated: true, error: '', fullname: action.payload }
    case UNAUTH_LOGIN:
      return { ...state, authenticated: false, error: '', fullname: '' }
    case ERROR_LOGIN:
      return { ...state, error: action.payload }
  }
  return state;
}