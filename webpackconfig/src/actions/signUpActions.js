//import axios from 'axios';
import 'whatwg-fetch';
import { validateUserSignUpPage } from './validate';
export function userSignUpRequest(userData) {

    const config=({
        method:'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify( userData)
    });
    console.log(config);
    const { errors, isValid } = validateUserSignUpPage(userData);
    if(errors||isValid){
        console.log(errors);
        console.log(isValid);
        return {errors,isValid};
    }
    return fetch('/api/auth/registration',config).then(response=>{
            console.log(response.status);
            return response.json();
        }).catch(error=>{
            console.log(error);
            return error;
    });

}
