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