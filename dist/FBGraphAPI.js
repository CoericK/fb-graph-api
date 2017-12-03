"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RequestAPI = require("./RequestAPI");

var _GraphOauth = require("./GraphOauth");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FBGraphAPI = function () {
    function FBGraphAPI(options) {
        _classCallCheck(this, FBGraphAPI);

        this._clientID = options.clientID || null;
        this._clientSecret = options.clientSecret || null;
        this._appAccessToken = options.appAccessToken || null;
    }

    _createClass(FBGraphAPI, [{
        key: "generateAppAccessToken",
        value: function generateAppAccessToken() {
            var full = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var self = this;
            return new Promise(function (resolve, reject) {
                (0, _GraphOauth.generateAppAccessToken)(self._clientID, self._clientSecret).then(function (appAccessToken) {
                    self._appAccessToken = appAccessToken.access_token;
                    resolve(full ? appAccessToken : appAccessToken.access_token);
                }).catch(reject);
            });
        }
    }, {
        key: "debugToken",
        value: function debugToken(inputToken) {
            var _this = this;

            return this._appAccessToken ? (0, _RequestAPI.debugAccessToken)(this._appAccessToken, inputToken) : new Promise(function (resolve, reject) {
                return _this.generateAppAccessToken().then(function () {
                    return resolve(_this.debugToken(inputToken));
                }).catch(reject);
            });
        }
    }]);

    return FBGraphAPI;
}();

exports.default = FBGraphAPI;