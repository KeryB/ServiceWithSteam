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
    if(!isValid){
        console.log('asd',errors);
        return {errors,isValid};
    }
    console.log("asdasd");
    return fetch('/api/auth/registration',config).then(response=>{
            console.log(response.status);
           console.log(response.json());
            return response.json();
        }).catch(error=>{
            console.log(error);
            return error;
    });

}
