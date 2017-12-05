# NodeJS Library for Facebook Graph API

With fb-graph-api you can now easily make requests to Facebook's [Graph API](https://developers.facebook.com/docs/graph-api).

**Author:** [CoericK](https://www.erickarroyo.com)

**License:** Apache v2

# Installing fb-graph-api with npm

```
npm install --save fb-graph-api
```

# Installing fb-graph-api with yarn

```
yarn add fb-graph-api
```

```js
// Using require() in ES5
var FBGraphAPI = require('fb-graph-api');

// Using ES2015 import through Babel
import FBGraphAPI from 'fb-graph-api';
```

## Library usage

```js
// ES5
var FB = new FBGraphAPI({
    clientID: '...',
    clientSecret: '...',
    appAccessToken: '...' // Optional
    
});

// ES2015 w/ import through Babel
const FB = new FBGraphAPI({
    clientID: '...',
    clientSecret: '...',
    appAccessToken: '...' // Optional
});
```


## Graph API

### generateAppAccessToken

Generates the [App Access Token](https://developers.facebook.com/docs/facebook-login/access-tokens/#apptokens) for you.


```js
FB.generateAppAccessToken()
    .then(appAccessToken => {
        console.log('appAccessToken', appAccessToken);
    })
    .catch(e => console.log('e', e));
```

### debugToken

[Debugs a given token](https://developers.facebook.com/docs/facebook-login/access-tokens/debugging-and-error-handling) using the App Access Token.


```js
FB.debugToken('EAAJ3bm5M....')
    .then(data => {
        console.log('debuggedToken', data);
        /*
         * data would look like this...
        {
            "app_id": 000000000000000, 
            "application": "Social Cafe", 
            "expires_at": 1352419328, 
            "is_valid": true, 
            "issued_at": 1347235328, 
            "scopes": [
                "email", 
                "publish_actions"
            ], 
            "user_id": 1207059
        }
        */
    })
    .catch(e => console.log('e', e));
```

### isValid

[Debugs a given token](https://developers.facebook.com/docs/facebook-login/access-tokens/debugging-and-error-handling) using the App Access Token and checks if the given token was crated for the App Access Token that was given.


```js
FB.isValid('EAAJ3bm5M....')
    .then(valid => {
        console.log('valid', valid); // true or false
    })
    .catch(e => console.log('e', e));
```