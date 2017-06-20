import React from 'react';
import {Route, IndexRoute} from 'react-router';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import List from '../pages/List';
import App from '../components/App';
import LoginForm from '../pages/forms/LoginForm';
import Authenticated from '../components/HighOrderComponent/Authenticated';
import NotAuth from '../components/HighOrderComponent/NotAuth';
import RegisterForm from '../pages/forms/RegisterForm';
import Profile from '../pages/forms/Profile';
import Settings from '../pages/forms/Settings';


export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute/>
            <Route path='list' component={List}/>
            <Route path='register' component={Authenticated(RegisterForm)}/>
            <Route path='login' component={Authenticated(LoginForm)}/>
            <Route path='profile' component={NotAuth(Profile)}>
            </Route>
            <Route path='settings' component={NotAuth(Settings)}/>
        </Route>
        <Route path='*' component={NotFound}/>
    </div>
);