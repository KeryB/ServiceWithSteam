import Navbar from './Navbar'
import React from 'react'
import Greetings from './Greetings'
import LoginForm from '../pages/forms/LoginForm';
import Register from '../pages/Register';
import {connect} from "react-redux";
import {getToken, deleteToken, putToken} from '../utils/tokenManager';
import {api} from '../actions/api/Api';
import {getUserData, updateUserData} from "../actions/authAction";
import {browserHistory} from 'react-router';
import * as path from '../const/PathConstants';
import Authenticated from '../components/HighOrderComponent/Authenticated';

class App extends React.Component {

    componentWillMount() {
        console.log(this.props.auth.isAuthenticated);
        if (!this.props.auth.isAuthenticated) {
            if (getToken()) {
                api('/api/user/getData', 'POST').then(response => {
                        this.props.getUserData(response.result[0]);
                    },
                    error => {
                        deleteToken();
                    });
            }
        }
    }

    componentWillReceiveProps(props) {
        const data = props.auth;
        if (data.isAuthenticated) {
            if (data.user.isTokenExpired) {
                deleteToken();
                api('/api/auth/refresh_token', 'POST').then(response => {
                        putToken(response.result[0])
                    },
                    error => {
                        deleteToken();
                    })
            }
        }
    }

    logout = () => {
        this.props.updateUserData(this.props.auth);
        deleteToken();
        browserHistory.push('/homePage');
    };

    render() {
        const {auth} = this.props;
        const {logout} = this;
        const login = this.props.location.pathname;
        return (
            <div>
                {this.props.location.pathname === path.LOGIN ||login === path.REGISTER?
                    <div></div>:
                    <div>
                        <Navbar user={auth} logout={logout}/>
                    </div>
                }
                <Greetings/>
                {this.props.children}
            </div>
        )
    }
}

App.propTypes = {
    auth: React.PropTypes.object.isRequired,
    getUserData: React.PropTypes.func.isRequired,
    updateUserData: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.authenticaton
    }
}

export default connect(mapStateToProps, {getUserData, updateUserData})(App);