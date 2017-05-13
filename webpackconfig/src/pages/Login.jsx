import React, {Component} from 'react'
import LoginForm from './forms/LoginForm'

export default class Login extends Component {

    render() {
        return (
            <div className="login_page">
                <div className="col-md-4 col-md-offset-4">
                    <LoginForm/>
                </div>
            </div>
        );
    }
};