import React from 'react'
import ReactDOM from 'react-dom'

import AppointmentsDayView from '../src/AppointmentsDayView'

describe('AppointmentsDayView', () => {
  let container;
  let customer;

  const render = (component) =>{
    ReactDOM.render(component, container)
  }

  beforeEach(()=>{
    container = document.createElement('div')
  })

  it("renders a div with the right id", () => {
    customer = {firstName: 'Abc'}
    const component = <AppointmentsDayView appointments={[]} />
    render(component)
    expect(container.querySelector('div#appointmentDayView')).not.toBeNull
  })

  it("renders multiple appointments in an ol element", () => {
    const today = new Date();
    const appointments = [
      {startsAt: today.setHours(12, 0)},
      {startsAt: today.setHours(13, 0)},
    ]
    const component = <AppointmentsDayView appointments={appointments} />
    render(component)
    expect(container.querySelector('ol').children).toHaveLength(2)
  })

  it("renders each appointment in an il", () => {
    const today = new Date();
    const appointments = [
      {startsAt: today.setHours(12, 0)},
      {startsAt: today.setHours(13, 0)},
    ]
    const component = <AppointmentsDayView appointments={appointments} />
    render(component)
    expect(container.querySelector('ol').children).toHaveLength(2)
    expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00')
    expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00')
  })
})