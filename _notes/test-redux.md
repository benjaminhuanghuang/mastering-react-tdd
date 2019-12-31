## Setup
```
  npm i -S redux react-redux redux-saga
  npm i -D expect-redux
```

- redux-saga performs asynchronous fetch requests.

- expect-redux to test resux. By using expect-redux, we can write test without referecne to redux-saga. The redux-saga can be replaced with redux-thunk and the test would still work.


A redux store is an object of data. The data for CustomerForm looks like
```
{
  addCustomer: {
    status: FAILED | SUCCESSFUL | SUBMITTING| VALIDATION_FAILED

    customer : {}

    validationErrors : {}

    errors: {}
  }
}
```

1. Add redux, saga.
2. Modify /test/domManipulators.js
3. Submit using redux action, modify test/CustomerForm.test.js
```
import { createContainerWithStore, withEvent } from './domManipulators';
import { expectRedux } from 'expect-redux';
```