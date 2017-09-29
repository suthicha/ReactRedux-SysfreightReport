import { FETCH_QUERY_AIRLINE_CHART } from '../actions/types';

export default function (state=[], action) {
  switch(action.type) {
    case FETCH_QUERY_AIRLINE_CHART:
      return action.payload;
  }
  return state;
}