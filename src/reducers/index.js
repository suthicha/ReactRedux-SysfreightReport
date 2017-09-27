import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import airlineShipmentReducer from './airlineshipment_reducer';
import airlineNameReducer from './airlinename_reducer';


const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  airlineShipments: airlineShipmentReducer,
  airlineName: airlineNameReducer
});

export default rootReducer;
