import Navbar from './Navbar'
import React from 'react'
import Greetings from './Greetings'
import * as authAction from '../actions/authAction';
import {connect} from "react-redux";
import {getToken, deleteToken} from '../utils/tokenManager';
import {browserHistory} from 'react-router';
import * as path from '../const/PathConstants';
import {bindActionCreators} from 'redux'
import Modal from '../pages/forms/modal';
import {callConfirm} from '../utils/Utils';
import Profile from '../pages/forms/Profile';
import modal from '../pages/forms/modal';

class App extends React.Component {

    componentWillMount() {
        if (!this.props.auth.isAuthenticated) {
            console.log('componentWillMount');
            if (getToken()) {
                this.props.authAction.fetchUserData();
            }
        }
    }

    componentWillReceiveProps(props) {
        const data = props.auth;
        console.log(this.props);
        if (!data.isAuthenticated && !data.isFetching) {
            if (getToken()) {
                this.props.authAction.fetchUserData();
            }
        } else if (data.user.result === null && !data.isFetching && data.isAuthenticated) {
            this.props.authAction.refreshToken();
        }
    }

    logout = () => {

        this.props.authAction.makeLogoutUser(this.props.auth);
        console.log("Удаляю токен");
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
                        <div className="preloader"/> :
                        <div>
                            {auth.isFetching ? <div className="preloader"/> :
                                <div>
                                    <Navbar user={auth} logout={logout} appProps={this.props}/>
                                    <modal/>
                                </div>
                            }
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

function mapStateToProps(state, ownProps) {
    return {
        auth: state.authenticaton,
        kek: ownProps
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authAction: bindActionCreators(authAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);