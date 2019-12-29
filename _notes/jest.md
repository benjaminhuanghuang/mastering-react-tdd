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


## Ject command line 
```
  jest --watchAll
```