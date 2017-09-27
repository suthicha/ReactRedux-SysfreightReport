import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import { AUTH_LOGIN } from './actions/types';
import App from './components/app';
import Login from './components/auth/login';
import RequireAuth from './components/auth/require_auth';
import Register from './components/auth/register';
import Dashboard from './components/dashboard';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if (token) {
  // We need to update application state.
  store.dispatch({
    type: AUTH_LOGIN,
    payload: localStorage.getItem('fullname') || ''
  })
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="dashboard" component={RequireAuth(Dashboard)} />   
      </Route>
    </Router>
  </Provider>
  , document.querySelector('#app'));
