import React from 'react';
import { Link } from 'react-router-dom';
import { AppointmentsDayViewLoader } from './AppointmentsDayViewLoader';

export const MainScreen = () => (
  <React.Fragment>
    <div className="button-bar">
      <Link to="/addCustomer" className="button">
        Add customer and appointment
      </Link>
      <Link to="/searchCustomers" className="button">
        Search customers
      </Link>
    </div>
    <AppointmentsDayViewLoader />
  </React.Fragment>
);