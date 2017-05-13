import React, {Component} from 'react'
import {Link} from 'react-router'
import RegisterForm from './forms/RegisterForm'
import {connect} from "react-redux";
import { userSignUpRequest } from "../actions/signUpActions"

class Register extends Component {

    render() {

        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <RegisterForm userRegistrationRequest={userSignUpRequest}/>
                </div>
            </div>
        )
    }
}
Register.propTypes ={
    userSignUpRequest: React.PropTypes.func.isRequired
};

export default connect((state)=>{return {} },{ userSignUpRequest })(Register);