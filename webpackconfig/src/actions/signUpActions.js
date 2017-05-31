import 'whatwg-fetch';
import * as Status from '../const/ResponseStatus'

export function userSignUpRequest(userData) {

    const config = ({
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });
    console.log('Конфиг', config);
    console.log("asdasd");
    return fetch('/api/auth/registration', config).then(response => {
        const status = response.status;
        console.log(status);
        console.log(response.statusText);
        if(status == Status.OK) {
            return response.json();
/*            response.json().then(response => {
                if (response.status >= 400 && response.status < 500) {
                    let obj = {
                        errorStatus: response.status,
                        message: response.message,
                        data: response.result[0]
                    };
                    console.log(obj);
                    return obj;
                }
            });*/
        }
    }).then(body=>{

    }).catch(error => {
        throw(error);
    });

}
