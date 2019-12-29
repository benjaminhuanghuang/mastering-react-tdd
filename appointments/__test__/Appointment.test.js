import React from 'react'
import ReactDOM from 'react-dom'

import Appointment from '../src/Appointment'

describe('Appointment', () => {
  it("renders the customer first name", () => {
    const customer = {firstName: 'Abc'}

    const component = <Appointment customer={customer} />

    const container = document.createElement('div')

    document.body.appendChild(container)

    ReactDOM.render(component, container)
    expect(document.body.textContent).toMatch('Abc')
  })

  it("renders another customer first name", () => {
    const customer = {firstName: '1234'}

    const component = <Appointment customer={customer} />

    const container = document.createElement('div')

    document.body.appendChild(container)

    ReactDOM.render(component, container)
    expect(container.textContent).toMatch('1234')
  })
})