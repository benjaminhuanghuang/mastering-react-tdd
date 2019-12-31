import React from 'react';
import ReactDOM from 'react-dom';
import { createContainer, withEvent } from './domManipulators';
import { AppointmentsDayView } from '../src/AppointmentsDayView';

describe('AppointmentsDayView', () => {
  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: 'Ashley' }
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: 'Jordan' }
    }
  ];
  let render, container, element, elements, click;

  beforeEach(() => {
    ({
      render,
      container,
      element,
      elements,
      click
    } = createContainer());
  });

  it('renders multiple appointments in an ol element', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(element('ol')).not.toBeNull();
    expect(element('ol').children).toHaveLength(2);
  });

  it('renders each appointment in an li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(elements('li')).toHaveLength(2);
    expect(elements('li')[0].textContent).toEqual('12:00');
    expect(elements('li')[1].textContent).toEqual('13:00');
  });

  it('initially shows a message saying there are no appointments today', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today.'
    );
  });

  it('selects the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.textContent).toMatch('Ashley');
  });

  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(elements('li > button')).toHaveLength(2);
    expect(elements('li > button')[0].type).toEqual('button');
  });

  it('renders appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = elements('button')[0];
    click(button);
    expect(container.textContent).toMatch('Ashley');
  });

  it('renders another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = elements('button')[1];
    click(button);
    expect(container.textContent).toMatch('Jordan');
  });

  it('adds toggled class to button when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = elements('button')[1];
    click(button);
    expect(button.className).toMatch('toggled');
  });

  it('does not add toggled class if button is not selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = elements('button')[1];
    expect(button.className).not.toMatch('toggled');
  });
});