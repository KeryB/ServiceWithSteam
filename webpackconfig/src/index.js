import React from 'react';
import {render} from 'react-dom';
import {routes} from './routess/routes';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {AppContainer} from 'react-hot-loader';
import {Router, browserHistory} from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';

import './css/errors.css';
const store = createStore(
    (state = {}) => state,
    applyMiddleware(thunk)
);


const renderApp = Routers => {
    render(
        <Provider store={store}>
            <Router history={browserHistory}>
                <AppContainer>
                    {Routers}
                </AppContainer>
            </Router>
        </Provider>,
        document.getElementById('root')
    )
    ;
};
renderApp(routes);
if (module.hot) {
    module.hot.accept('./routess/routes.js', () => {
        renderApp(routes);
    });
}