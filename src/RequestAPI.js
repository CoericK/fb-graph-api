import request from 'request';

import {
    BASE_URL,
} from "./config";


export const debugAccessToken = (appAccessToken, inputToken) => {
    return new Promise((resolve, reject) => {
        if (!appAccessToken) {
            reject({message: `Missing 'appAccessToken' param.`});
        } else if (!inputToken) {
            reject({message: `Missing 'inputToken' param.`});
        } else {


            request.get({
                url: `${BASE_URL}/debug_token?access_token=${appAccessToken}&input_token=${inputToken}`,
                json: true
            }, (e, res, body) => {
                if (e) {
                    reject({message: 'Somethjng wrong'})
                    console.log('e', e);
                } else {
                    console.log('res.statusCode debugAccessToken', res.statusCode);
                    if (res.statusCode !== 200) {
                        reject({message: 'something wrong statusCode'});
                    } else {
                        resolve(body.data);
                    }

                }
            });

        }
    });
};