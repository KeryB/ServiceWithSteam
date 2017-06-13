import React from 'react';
import {Route, IndexRoute} from 'react-router';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import List from '../pages/List';
import App from '../components/App';
import LoginForm from '../pages/forms/LoginForm';
import Authenticated from '../components/HighOrderComponent/Authenticated';
//import Navbar from '../components/Navbar'
export const routes = (
    <div>
        <Route path='/homePage' component={App}>
            <IndexRoute/>
            <Route path='/list' component={List}/>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Authenticated(LoginForm)}/>
        </Route>
        <Route path='*' component={NotFound}/>
    </div>
);