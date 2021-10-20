# About
 
When you use Redux in your application, then you need to create constants for actions and action functions which you will dispatch for example in components or in sagas.

It looks something like this:

```sh
const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

const A_SignInRequest = (payload) => ({ type: SIGN_IN_REQUEST, payload });
const A_SignInSuccess = (payload) => ({ type: SIGN_IN_SUCCESS, payload });
const A_SignInFailure = (payload) => ({ type: SIGN_IN_FAILURE, payload });

const A_SignUpRequest = (payload) => ({ type: SIGN_UP_REQUEST, payload });
const A_SignUpSuccess = (payload) => ({ type: SIGN_UP_SUCCESS, payload });
const A_SignUpFailure = (payload) => ({ type: SIGN_UP_FAILURE, payload });
```

It isn't difficult to do this, but nevertheless, it takes additional time during the development process.

This package provides you few methods for creating constants and actions.

# How to use

1. Create constants
```sh
// src/constants/index.js
import { createActionTypes } from "react-redux-jedi";

export const AUTH_CONSTANTS = ["SIGN_IN", "SIGN_UP"];

export default createActionTypes(AUTH_CONSTANTS);
```

Response:

```sh
{
    SIGN_IN: {
        FAILURE: "SIGN_IN_FAILURE",
        REQUEST: "SIGN_IN_REQUEST",
        SUCCESS: "SIGN_IN_SUCCESS",
    },
    SIGN_UP: {
        FAILURE: "SIGN_UP_FAILURE",
        REQUEST: "SIGN_UP_REQUEST",
        SUCCESS: "SIGN_UP_SUCCESS",
    }
}
```

2. Create actions

```sh
// src/actions/index.js
import { createActions } from "react-redux-jedi";
import { AUTH_CONSTANTS } from "./constants";

export default createActions(AUTH_CONSTANTS);
```

Response:

```sh
{
    SIGN_IN: {
        FAILURE: (payload, cb, options) => {…},
        REQUEST: (payload, cb, options) => {…},
        SUCCESS: (payload, cb, options) => {…},
    },
    SIGN_UP: {
        FAILURE: (payload, cb, options) => {…},
        REQUEST: (payload, cb, options) => {…},
        SUCCESS: (payload, cb, options) => {…},
    }
}
```

3. Use in components

```sh
import React from "react";
import { useDispatch } from "react-redux";
import actions from "./actions";

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmitForm = data => {
    dispatch(actions.SIGN_IN.REQUEST(data));
  };

  return ...
}
```

3. Use in saga

```sh
// src/sagas/index.js
import constants from "./constants";
import actions from "./actions";

function* sigInSagaWorker({ payload, cb }) {
  try {

    // TODO
    
    yield put(actions.SIGN_IN.SUCCESS(data));
  } catch (err) {
    yield put(actions.SIGN_IN.FAILURE(err));
  } finally {
    cb && typeof cb === "function" && cb();
    // cb?.() for TypeScript
  }
}

export const authWatcherSaga = function* () {
  yield takeLatest(constants.SIGN_IN.REQUEST, sigInSagaWorker);
};
```

# Description of methods

- createActions - returns an object with actions. Created actions have callback function and additional options. Payload, callback and optiona are optional.
- createActionTypes - returns an object with constants
- createActionsWithTypes - returns an object with constants and actions

| Arguments | Description | Type |
| ------ | ------ | ------ |
| constants | Array of unique constants | required |
| prefixes | Additional prefixes for action types | optional |

Example:

```sh
createActionTypes(["SIGn_IN", "SIGN_UP"])
{
    SIGN_IN: {
        FAILURE: "SIGN_IN_FAILURE",
        REQUEST: "SIGN_IN_REQUEST",
        SUCCESS: "SIGN_IN_SUCCESS",
    },
    SIGN_UP: {
        FAILURE: "SIGN_UP_FAILURE",
        REQUEST: "SIGN_UP_REQUEST",
        SUCCESS: "SIGN_UP_SUCCESS",
    }
}

createActionTypes(["SIGn_IN", "SIGN_UP"], [CLEAR])

{
    SIGN_IN: {
        FAILURE: "SIGN_IN_FAILURE",
        REQUEST: "SIGN_IN_REQUEST",
        SUCCESS: "SIGN_IN_SUCCESS",
        CLEAR: "SIGN_IN_CLEAR"
    },
    SIGN_UP: {
        FAILURE: "SIGN_UP_FAILURE",
        REQUEST: "SIGN_UP_REQUEST",
        SUCCESS: "SIGN_UP_SUCCESS",
        CLEAR: "SIGN_UP_CLEAR"
    }
}
```

TypeScript included.