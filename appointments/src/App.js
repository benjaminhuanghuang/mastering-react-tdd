import React, { useState, useCallback } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { AppointmentFormLoader } from './AppointmentFormLoader';
import { CustomerForm } from './CustomerForm';
import { CustomerSearchRoute } from './CustomerSearchRoute';
import { MainScreen } from './MainScreen';

export const App = ({ history }) => {
  const [customer, setCustomer] = useState();

  const transitionToAddAppointment = useCallback(
    customer => {
      setCustomer(customer);
      history.push('/addAppointment');
    },
    [history]
  );

  const transitionToDayView = useCallback(
    () => history.push('/'),
    [history]
  );

  const searchActions = customer => (
    <React.Fragment>
      <button
        role="button"
        onClick={() => transitionToAddAppointment(customer)}>
        Create appointment
      </button>
    </React.Fragment>
  );

  return (
    <Switch>
      <Route
        path="/addCustomer"
        render={() => (
          <CustomerForm onSave={transitionToAddAppointment} />
        )}
      />
      <Route
        path="/addAppointment"
        render={() => (
          <AppointmentFormLoader
            customer={customer}
            onSave={transitionToDayView}
          />
        )}
      />
      <Route
        path="/searchCustomers"
        render={props => (
          <CustomerSearchRoute
            {...props}
            renderCustomerActions={searchActions}
          />
        )}
      />
      <Route component={MainScreen} />
    </Switch>
  );
};