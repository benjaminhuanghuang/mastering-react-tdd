import React from 'react'
import ReactDOM from 'react-dom'

import AppointmentsDayView from '../src/AppointmentsDayView'

describe('AppointmentsDayView', () => {
  let container;

  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: '1234' }
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: 'abcd' }
    },
  ]

  const render = (component) => {
    ReactDOM.render(component, container)
  }

  beforeEach(() => {
    container = document.createElement('div')
  })

  it("renders multiple appointments in an ol element", () => {

    const component = <AppointmentsDayView appointments={appointments} />
    render(component)
    expect(container.querySelector('ol').children).toHaveLength(2)
  })

  it("renders each appointment in an il", () => {
    const component = <AppointmentsDayView appointments={appointments} />
    render(component)
    expect(container.querySelector('ol').children).toHaveLength(2)
    expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00')
    expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00')
  })

  it('initially shows a message saying there are no appointments today', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today.'
    );
  });

  it('selects the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.textContent).toMatch('1234');
  });
})