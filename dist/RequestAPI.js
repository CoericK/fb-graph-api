'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.debugAccessToken = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debugAccessToken = exports.debugAccessToken = function debugAccessToken(appAccessToken, inputToken) {
    return new Promise(function (resolve, reject) {
        if (!appAccessToken) {
            reject({ message: 'Missing \'appAccessToken\' param.' });
        } else if (!inputToken) {
            reject({ message: 'Missing \'inputToken\' param.' });
        } else {

            _request2.default.get({
                url: _config.BASE_URL + '/debug_token?access_token=' + appAccessToken + '&input_token=' + inputToken,
                json: true
            }, function (e, res, body) {
                if (e) {
                    console.log('e', e);
                    reject({ message: 'Somethjng wrong' });
                } else {
                    if (res.statusCode === 200) {
                        resolve(body.data);
                    } else if (res.statusCode === 400) {
                        reject({
                            message: body.error && body.error.message ? body.error.message : 'Something wrong with FB API'
                        });
                    } else {
                        reject({ message: 'something wrong statusCode' });
                    }
                }
            });
        }
    });
};