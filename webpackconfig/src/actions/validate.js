import {isEmail,equals} from 'validator';
import isEmpty from 'lodash/isEmpty';
import * as message from '../const/ValidatorMessage';
export function validateUserSignUpPage(userData) {
    let errors = {};

    if(!isEmail(userData.email)){
        errors.email = message.EMAIL_IS_INVALID;
    }
    if (isEmpty(userData.email)) {
        errors.email = message.FIELD_IS_REQUIRED;
    }
    if (isEmpty(userData.password)) {
        errors.password = message.FIELD_IS_REQUIRED;
    }
    if (isEmpty(userData.confirmPassword)) {
        errors.confirmPassword = message.FIELD_IS_REQUIRED;
    }
    if (isEmpty(userData.nickname)) {
        errors.nickname = message.FIELD_IS_REQUIRED;
    }
    if(!equals(userData.password,userData.confirmPassword)){
        errors.confirmPassword = message.PASSWORD_NOT_EQUALS;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
