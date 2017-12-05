import {
    debugAccessToken
} from "./RequestAPI";

import {
    generateAppAccessToken
} from "./GraphOauth";

class FBGraphAPI {

    constructor(options) {
        this._clientID = options.clientID || null;
        this._clientSecret = options.clientSecret || null;
        this._appAccessToken = options.appAccessToken || null;
    }

    generateAppAccessToken(full = false) {
        let self = this;
        return new Promise((resolve, reject) => {
            generateAppAccessToken(self._clientID, self._clientSecret)
                .then((appAccessToken) => {
                    self._appAccessToken = appAccessToken.access_token;
                    resolve(full ? appAccessToken : appAccessToken.access_token)
                })
                .catch(reject);
        });
    }

    debugToken(inputToken) {
        return this._appAccessToken ?
            debugAccessToken(this._appAccessToken, inputToken) :
            new Promise((resolve, reject) => this.generateAppAccessToken()
                .then(() => resolve(this.debugToken(inputToken)))
                .catch(reject))
    }

    isValid(inputToken) {
        return new Promise((resolve, reject) => {
            this.debugToken(inputToken)
                .then(data => resolve(data.is_valid))
                .catch(reject)
        });
    }
}


export default FBGraphAPI;