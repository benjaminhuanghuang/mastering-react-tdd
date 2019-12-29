import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils';

import AppointmentsDayView from '../src/AppointmentsDayView'

describe('AppointmentsDayView', () => {
  let container;

  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: '111' }
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: '222' }
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
    expect(container.textContent).toMatch('111');
  });

  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll('li > button')).toHaveLength(2);
    expect(
      container.querySelectorAll('li > button')[0].type
    ).toEqual('button');
  });

  it('renders another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = container.querySelectorAll('button')[1];
    ReactTestUtils.Simulate.click(button);
    expect(container.textContent).toMatch('222');
  });
})