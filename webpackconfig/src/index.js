import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { routes } from './routess/routes';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware} from 'redux';
const store = createStore(
    (state = {})=> state,
    applyMiddleware(thunk)
);
render(
    <Provider store = {store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
  document.getElementById('root')
);
