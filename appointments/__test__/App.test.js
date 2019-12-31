import React from 'react';
import {
  createShallowRenderer,
  type,
  click,
  childrenOf,
  className,
  id,
  prop
} from './shallowHelpers';
import { App, MainScreen } from '../src/App';
import { AppointmentsDayViewLoader } from '../src/AppointmentsDayViewLoader';

describe('App', () => {
  let render, elementMatching, child, log;
  let historySpy;

  beforeEach(() => {
    ({
      render,
      elementMatching,
      child,
      log
    } = createShallowRenderer());
  });

  const switchElement = () => elementMatching(type(Switch));
  const childRoutes = () =>
    childrenOf(elementMatching(type(Switch)));

  const routeFor = path => childRoutes().find(prop('path', path));

  it('initially shows the AppointmentsDayViewLoader', () => {
    render(<App />);
    expect(elementMatching(type(AppointmentsDayViewLoader))).toBeDefined();
  });
});