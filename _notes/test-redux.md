```
  npm i -S redux react-redux redux-saga
  npm i -D expect-redux
```

- redux-saga performs asynchronous fetch requests.

- expect-redux to test resux


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