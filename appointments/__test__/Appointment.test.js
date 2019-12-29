import React from 'react'
import ReactDOM from 'react-dom'

import Appointment from '../src/Appointment'

describe('Appointment', () => {
  let container;
  let customer;

  const render = (component) =>{
    ReactDOM.render(component, container)
  }

  beforeEach(()=>{
    container = document.createElement('div')
  })

  it("renders the customer first name", () => {
    customer = {firstName: 'Abc'}
    const component = <Appointment customer={customer} />
    render(component)
    expect(container.textContent).toMatch('Abc')
  })

  it("renders another customer first name", () => {
    customer = {firstName: '1234'}
    render(<Appointment customer={customer} />)
    expect(container.textContent).toMatch('1234')
  })
})