import React from 'react';
import {
  createShallowRenderer,
  type,
  childrenOf,
  className,
 } from './shallowHelpers';
import { Link } from 'react-router-dom';
import { MainScreen } from '../src/MainScreen';
import { AppointmentsDayViewLoader } from '../src/AppointmentsDayViewLoader';

describe('MainScreen', () => {
  let render, child, elementMatching;

  beforeEach(() => {
    ({ render, child, elementMatching } = createShallowRenderer());
  });

  it('renders a button bar as the first child', () => {
    render(<MainScreen />);
    expect(child(0).type).toEqual('div');
    expect(child(0).props.className).toEqual('button-bar');
  });

  it('renders an AppointmnentsDayViewLoader', () => {
    render(<MainScreen />);
    expect(
      elementMatching(type(AppointmentsDayViewLoader))
    ).toBeDefined();
  });

  it('renders a Link to /addCustomer', () => {
    render(<MainScreen />);
    const links = childrenOf(
      elementMatching(className('button-bar'))
    );
    expect(links[0].type).toEqual(Link);
    expect(links[0].props.to).toEqual('/addCustomer');
    expect(links[0].props.className).toEqual('button');
    expect(links[0].props.children).toEqual(
      'Add customer and appointment'
    );
  });

  it('renders a Link to /searchCustomers', () => {
    render(<MainScreen />);
    const links = childrenOf(
      elementMatching(className('button-bar'))
    );
    expect(links[1].type).toEqual(Link);
    expect(links[1].props.to).toEqual('/searchCustomers');
    expect(links[1].props.className).toEqual('button');
    expect(links[1].props.children).toEqual('Search customers');
  });
});

