import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import airlineShipmentReducer from './airlineshipment_reducer';
import airlineNameReducer from './airlinename_reducer';
import queryAirlineReducer from './query_airline_reducer'; 

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  airlineDataForChart: queryAirlineReducer,
  airlineShipments: airlineShipmentReducer,
  airlineName: airlineNameReducer
});

export default rootReducer;
