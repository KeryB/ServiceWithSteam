import * as Status from '../../const/ResponseStatus';
import {getToken} from '../../utils/tokenManager'

export const tokenHeader = 'x-auth-token';

export function api(path, method, data) {

    const config = ({
        method: method,
        headers: {'Content-Type': 'application/json'}
    });

    if (method === 'POST') {
        config.body = JSON.stringify(data);
    }
    const token = getToken();
    if (token) {
        config.headers[tokenHeader] = token;
    }

    console.log('Конфиг', config);
    return fetch(path, config).then(response => {
        const status = response.status;
        console.log(status);
        console.log(response.statusText);
        if (status >= Status.OK && status < 300) {
            return response.json();
        }
        throw {
            status,
            message: response.statusText
        };
    }).then(data => {
            console.log(data);
            if (data.status !== Status.OK) {
                let error = {
                    status: data.status,
                    message: data.message,
                };
                if (data.result) {
                    console.log('data', data.result);
                    error.data = data.result;
                }
                throw error;
            } else if (!data.result || !Array.isArray(data.result)) {
                throw {
                    status: Status.NO_DATA_FROM_SERVER,
                    message: 'Данные от сервера не получены',
                };
            } else {
                return new Promise((resolve, reject) => {
                    resolve(data);
                })
            }
        }
    ).catch(error => {
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
    )
}