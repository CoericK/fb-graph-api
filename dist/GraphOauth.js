'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateAppAccessToken = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateAppAccessToken = exports.generateAppAccessToken = function generateAppAccessToken(clientID, clientSecret) {
    var grantType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'client_credentials';

    return new Promise(function (resolve, reject) {
        if (!clientID) {
            reject({ message: 'Missing \'clientID\' param.' });
        } else if (!clientSecret) {
            reject({ message: 'Missing \'clientSecret\' param.' });
        } else {

            _request2.default.get({
                url: _config.BASE_URL + '/oauth/access_token?client_id=' + clientID + '&client_secret=' + clientSecret + '&grant_type=' + grantType,
                json: true
            }, function (e, res, body) {
                if (e) {
                    console.log('e', e);
                    reject({ message: 'something else wrong' });
                } else {
                    //console.log('res', res);
                    console.log('res.statusCode', res.statusCode);
                    if (res.statusCode !== 200) {
                        reject({ message: 'something else wrong statusCode' });
                    } else {
                        resolve(body);
                    }
                }
            });
        }
    });
};