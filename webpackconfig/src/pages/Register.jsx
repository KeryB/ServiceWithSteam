import React, {Component} from 'react'
import {Link} from 'react-router'
import RegisterForm from './forms/RegisterForm'
import {connect} from "react-redux";
import { userSignUpRequest } from "../actions/signUpActions"
import { addFlashMessage} from '../actions/flashMessages'

class Register extends Component {

    render() {
        return (
            <div >
                <div>
                </div>
            </div>
        )
    }
}

export default Register;