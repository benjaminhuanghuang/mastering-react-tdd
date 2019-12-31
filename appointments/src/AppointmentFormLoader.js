import React, { useEffect, useState } from 'react';
import { AppointmentForm } from './AppointmentForm';
/*
  This is a continer compoent. It's purpose is to pull data and pass data to other components
*/
export const AppointmentFormLoader = props => {
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
      const result = await window.fetch('/availableTimeSlots', {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      });
      setAvailableTimeSlots(await result.json());
    };

    fetchAvailableTimeSlots();
  }, []);

  return (
    <AppointmentForm
      {...props}
      availableTimeSlots={availableTimeSlots}
    />
  );
};
