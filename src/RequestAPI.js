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


            request
                .get({
                    url: `${BASE_URL}/debug_token?access_token=${appAccessToken}&input_token=${inputToken}`,
                    json: true
                }, (e, res, body) => {
                    if (e) {
                        console.log('e', e);
                        reject({message: 'Somethjng wrong'});
                    } else {
                        if (res.statusCode === 200) {
                            resolve(body.data);
                        } else if (res.statusCode === 400) {
                            reject({
                                message: body.error && body.error.message ? body.error.message : `Something wrong with FB API`,
                            });
                        } else {
                            reject({message: 'something wrong statusCode'});
                        }

                    }
                });

        }
    });
};

export const meWithAccessToken = (accessToken, fields) => {
    return new Promise((resolve, reject) => {
        if (!accessToken) {
            reject({message: `Missing 'accessToken' param.`});
        } else {
            request
                .get({
                    url: `${BASE_URL}/me?access_token=${accessToken}&fields=${fields}`,
                    json: true
                }, (e, res, body) => {
                    if (e) {
                        console.log('e', e);
                        reject({message: 'Somethjng wrong'});
                    } else {
                        if (res.statusCode === 200) {
                            resolve(body);
                        } else if (res.statusCode === 400) {
                            reject({
                                message: body.error && body.error.message ? body.error.message : `Something wrong with FB API`,
                            });
                        } else {
                            reject({message: 'something wrong statusCode'});
                        }

                    }
                });

        }
    });
};