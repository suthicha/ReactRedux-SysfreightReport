import { FETCH_AIRLINE_NAME } from '../actions/types';

export default function (state=[], action){
  switch(action.type){
    case FETCH_AIRLINE_NAME:
      return action.payload;
  }
  return state;
}