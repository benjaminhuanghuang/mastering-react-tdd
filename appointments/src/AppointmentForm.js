import React, { useState, useCallback } from 'react';
import TimeSlotTable from './TimeSlotTable';

const Error = () => (
  <div className="error">An error occurred during save.</div>
);

export default function AppointmentForm ({
  selectableServices,
  service,
  selectableStylists,
  stylist,
  serviceStylists,
  onSave,  // notify parent compoent then the form data has been saved
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots,
  startsAt
}) {
  const [error, setError] = useState(false);

  const [appointment, setAppointment] = useState({
    service,
    startsAt,
    stylist
  });

  const handleSelectBoxChange = ({ target: { value, name } }) =>
    setAppointment(appointment => ({
      ...appointment,
      [name]: value
    }));

  const handleStartsAtChange = useCallback(
    ({ target: { value } }) =>
      setAppointment(appointment => ({
        ...appointment,
        startsAt: parseInt(value)
      })),
    []
  );

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await window.fetch('/appointments', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment)
    });
    if (result.ok) {
      setError(false);
      onSave();
    } else {
      setError(true);
    }
  };

  const stylistsForService = appointment.service
    ? serviceStylists[appointment.service]
    : selectableStylists;

  const timeSlotsForStylist = appointment.stylist
    ? availableTimeSlots.filter(slot =>
        slot.stylists.includes(appointment.stylist)
      )
    : availableTimeSlots;

  return (
    <form id="appointment" onSubmit={handleSubmit}>
      {error ? <Error /> : null}
      <label htmlFor="service">Salon service</label>
      <select
        name="service"
        id="service"
        value={service}
        onChange={handleSelectBoxChange}>
        <option />
        {selectableServices.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <label htmlFor="stylist">Stylist</label>
      <select
        name="stylist"
        id="stylist"
        value={stylist}
        onChange={handleSelectBoxChange}>
        <option />
        {stylistsForService.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <TimeSlotTable
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
        today={today}
        availableTimeSlots={timeSlotsForStylist}
        checkedTimeSlot={appointment.startsAt}
        handleChange={handleStartsAtChange}
      />

      <input type="submit" value="Add" />
    </form>
  );
};

AppointmentForm.defaultProps = {
  availableTimeSlots: [],
  today: new Date(),
  salonOpensAt: 9,
  salonClosesAt: 19,
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ],
  selectableStylists: ['Ashley', 'Jo', 'Pat', 'Sam'],
  serviceStylists: {
    Cut: ['Ashley', 'Jo', 'Pat', 'Sam'],
    'Blow-dry': ['Ashley', 'Jo', 'Pat', 'Sam'],
    'Cut & color': ['Ashley', 'Jo'],
    'Beard trim': ['Pat', 'Sam'],
    'Cut & beard trim': ['Pat', 'Sam'],
    Extensions: ['Ashley', 'Pat']
  },
  onSave: () => {}
};