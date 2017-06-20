import Navbar from './Navbar'
import React from 'react'
import Greetings from './Greetings'
import * as authAction from '../actions/authAction';
import {connect} from "react-redux";
import {getToken, deleteToken, putToken} from '../utils/tokenManager';
import {api} from '../actions/api/Api';
import {browserHistory} from 'react-router';
import * as path from '../const/PathConstants';
import {bindActionCreators} from 'redux'
import {callConfirm} from '../utils/Utils';
import Profile from '../pages/forms/Profile';

class App extends React.Component {

    componentWillMount() {
        if (!this.props.auth.isAuthenticated) {
            console.log('componentWillMount', this.props.auth);
            if (getToken()) {
                this.props.authAction.fetchUserData();
            }
        }
    }

    componentWillReceiveProps(props) {
    console.log(props);
        const data = props.auth;
        console.log(data);
        if(!data.isAuthenticated&&!data.isFetching) {
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
            } else {
                console.log('componentWillReceiveProps', this.props.auth);
                if (getToken()) {
                    this.props.authAction.fetchUserData();
                }
            }
        }
    }

    logout = () => {
        callConfirm('Выход', 'Вы действительно хотите выйти из профиля?', () => {

        });
        this.props.authAction.makeLogoutUser(this.props.auth);
        deleteToken();
        browserHistory.push('/');
    };

    render() {
        const {auth} = this.props;
        const {logout} = this;
        const login = this.props.location.pathname;
        return (
            <div>
                <div>
                {this.props.location.pathname === path.LOGIN || login === path.REGISTER ?
                    <div></div> :
                    <div>
                        {auth.isFetching ? <div></div> :
                            <div>
                                <Navbar user={auth} logout={logout}/>
                            </div>}
                    </div>
                }
                <Greetings/>
                </div>
                {this.props.children}
            </div>
        )
    }
}

App.propTypes = {
    auth: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.authenticaton
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authAction: bindActionCreators(authAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);