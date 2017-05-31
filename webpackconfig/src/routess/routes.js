import React from 'react';
import {Route, IndexRoute} from 'react-router';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import List from '../pages/List';
import App from '../components/App';
import LoginForm from '../pages/forms/LoginForm';
//import Navbar from '../components/Navbar'
export const routes = (
    <div>
        <Route path='/homePage' component={App}>
            <IndexRoute/>
            <Route path='/list' component={List}/>
        </Route>
        <Route path='/login' component={LoginForm}/>
        <Route path='/register' component={Register}/>
        <Route path='*' component={NotFound}/>
    </div>
);