import React, {Component} from 'react'
import {Link} from 'react-router'
import RegisterForm from './forms/RegisterForm'
import {connect} from "react-redux";
import { userSignUpRequest } from "../actions/signUpActions"
import { addFlashMessage} from '../actions/flashMessages'

class Register extends Component {

    render() {
        const { addFlashMessage} = this.props;
        return (
            <div >
                <div>
                    <RegisterForm userRegistrationRequest={userSignUpRequest} addFlashMessage={addFlashMessage}/>
                </div>
            </div>
        )
    }
}
Register.propTypes ={
    userSignUpRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};

export default connect((state)=>{return {} },{ userSignUpRequest, addFlashMessage})(Register);