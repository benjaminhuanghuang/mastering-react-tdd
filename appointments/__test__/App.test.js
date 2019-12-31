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
import { Link, Switch } from 'react-router-dom';
import { App } from '../src/App';
import { MainScreen } from '../src/MainScreen';
import { AppointmentFormLoader } from '../src/AppointmentFormLoader';
import { CustomerForm } from '../src/CustomerForm';
import { CustomerSearchRoute } from '../src/CustomerSearchRoute';

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
    historySpy = jest.fn();
  });

  const switchElement = () => elementMatching(type(Switch));
  const childRoutes = () =>
    childrenOf(elementMatching(type(Switch)));

  const routeFor = path => childRoutes().find(prop('path', path));

  it('renders the MainScreen as the default route', () => {
    render(<App />);
    const routes = childRoutes();
    const lastRoute = routes[routes.length - 1];
    expect(lastRoute.props.component).toEqual(MainScreen);
  });

  it('renders CustomerForm at the /addCustomer endpoint', () => {
    render(<App />);
    expect(routeFor('/addCustomer').props.render().type).toEqual(
      CustomerForm
    );
  });

  it('renders AppointmentFormLoader at /addAppointment', () => {
    render(<App />);
    expect(
      routeFor('/addAppointment').props.render().type
    ).toEqual(AppointmentFormLoader);
  });

  it('renders CustomerSearchRoute at /searchCustomers', () => {
    render(<App />);
    expect(
      routeFor('/searchCustomers').props.render().type
    ).toEqual(CustomerSearchRoute);
  });

  const customer = { id: 123 };

  it('navigates to /addAppointment after the CustomerForm is submitted', () => {
    render(<App history={{ push: historySpy }} />);
    const onSave = routeFor('/addCustomer').props.render().props
      .onSave;
    onSave(customer);
    expect(historySpy).toHaveBeenCalledWith('/addAppointment');
  });

  it('passes saved customer to AppointmentFormLoader after the CustomerForm is submitted', () => {
    render(<App history={{ push: historySpy }} />);
    const onSave = routeFor('/addCustomer').props.render().props
      .onSave;
    onSave(customer);
    let renderFunc = routeFor('/addAppointment').props.render;
    expect(renderFunc().props.customer).toEqual(customer);
  });

  it('navigates to / when AppointmentFormLoader is saved', () => {
    render(<App history={{ push: historySpy }} />);
    const onSave = routeFor('/addAppointment').props.render().props
      .onSave;
    onSave();
    expect(historySpy).toHaveBeenCalledWith('/');
  });

  describe('search customers', () => {
    const renderSearchActionsForCustomer = customer => {
      render(<App history={{ push: historySpy }} />);
      const customerSearch = routeFor(
        '/searchCustomers'
      ).props.render();
      const searchActionsComponent =
        customerSearch.props.renderCustomerActions;
      return searchActionsComponent(customer);
    };

    it('passes a button to the CustomerSearch named Create appointment', () => {
      const button = childrenOf(
        renderSearchActionsForCustomer()
      )[0];
      expect(button).toBeDefined();
      expect(button.type).toEqual('button');
      expect(button.props.role).toEqual('button');
      expect(button.props.children).toEqual('Create appointment');
    });

    it('navigates to /addAppointment when clicking the Create appointment button', () => {
      const button = childrenOf(
        renderSearchActionsForCustomer(customer)
      )[0];
      click(button);
      expect(historySpy).toHaveBeenCalledWith('/addAppointment');
    });

    it('passes saved customer to AppointmentFormLoader when clicking the Create appointment button', () => {
      const button = childrenOf(
        renderSearchActionsForCustomer(customer)
      )[0];
      click(button);
      const appointmentForm = routeFor('/addAppointment').props.render();
      expect(appointmentForm.props.customer).toEqual(customer);
    });
  });
});