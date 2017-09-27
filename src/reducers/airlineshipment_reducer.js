import { FETCH_AIRLINE_SHIPMENT } from '../actions/types';

export default function (state=[], action) {
  switch(action.type) {
    case FETCH_AIRLINE_SHIPMENT:
      return action.payload;
  }
  return state;
}