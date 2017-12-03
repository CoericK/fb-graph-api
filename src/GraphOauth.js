import request from 'request';

import {
    BASE_URL,
} from "./config";


export const generateAppAccessToken = (clientID, clientSecret, grantType = 'client_credentials') => {
    return new Promise((resolve, reject) => {
        if (!clientID) {
            reject({message: `Missing 'clientID' param.`});
        } else if (!clientSecret) {
            reject({message: `Missing 'clientSecret' param.`});
        } else {


            request.get({
                url: `${BASE_URL}/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=${grantType}`,
                json: true
            }, (e, res, body) => {
                if (e) {
                    console.log('e', e);
                    reject({message: 'something else wrong'})
                } else {
                    //console.log('res', res);
                    console.log('res.statusCode', res.statusCode);
                    if (res.statusCode !== 200) {
                        reject({message: 'something else wrong statusCode'})
                    } else {
                        resolve(body);
                    }

                }
            });

        }
    });
};