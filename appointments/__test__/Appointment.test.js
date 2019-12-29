import React from 'react'
import ReactDOM from 'react-dom'

import Appointment from '../src/Appointment'

describe('Appointment', () => {
  it("renders the customer first name", () => {
    const customer = {firstName: 'Abc'}

    const component = <Appointment customer={customer} />

    const constainer = document.createElement('div')

    document.body.appendChild(constainer)

    ReactDOM.render(component, constainer)
    expect(document.body.textContent).toMatch('Abc')
  })
})