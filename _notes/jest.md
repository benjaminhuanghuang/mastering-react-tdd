## How jest knows document.body?
Jest set environment to jsdom by default. If we change it to node, we can see the error for test
```
  "jest": {
      "testEnvironment": "node"
  }
```


## What happened in a test
```
import React from 'react'
import ReactDOM from 'react-dom'

import Appointment from '../src/Appointment'

describe('Appointment', () => {
  it("renders the customer first name", () => {
    const customer = {firstName: 'Ben'}

    const component = <Appointment customer={customer} />

    const constainer = document.createElement('div')

    document.body.appendChild(constainer)

    ReactDOM.render(component, constainer)
    expect(document.body.textContent).toMatch('Abc')
  })
})
```

## Click
```
import ReactTestUtils from 'react-dom/test-utils';
ReactTestUtils.Simulate.click(button);
```


## async
```
  it('saves existing value when submitted', async () => {
    render(<CustomerForm {...{ [fieldName]: value }} />);

    ReactTestUtils.Simulate.submit(form('customer'));

    const fetchOpts = fetchSpy.receivedArgument(1);
    expect(JSON.parse(fetchOpts.body)[fieldName]).toEqual(value);
  });
```
The **async** keywords tells Jest that the test will return a promise, and that the test runner should wait for that 
promise to resolve before reporting on the success or failure of the test.


