import React from 'react';
import {render} from 'react-dom';
import {routes} from './routess/routes';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {AppContainer} from 'react-hot-loader';
import {Router, browserHistory} from 'react-router';
import rootReducer from './reducers/rootReducer';
import './css/material/custom.css';
import './css/material/bootstrap.css';
import './css/material/materialadmin.css';
import './css/material/font-awesome.min.css';
import './css/material/toastr.css';
import './css/material/material-design-iconic-font.min.css';
import './animation/materialadmin/App';
import './animation/materialadmin/bootstrap.min';
import './animation/materialadmin/jquery-1.11.2.min';
import './animation/materialadmin/AppForm';
import './animation/materialadmin/AppVendor';
import { syncHistoryWithStore } from 'react-router-redux';
import 'react-select/dist/react-select.css';

/*const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);*/
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);
const history = syncHistoryWithStore(browserHistory, store);

const renderApp = Routers => {
    render(
        <Provider store={store}>
            <Router history={history}>
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