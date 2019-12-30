
import React from 'react'

import RadioButtonIfAvailable from './RadioButtonIfAvailable'

import {weeklyDateValues, dailyTimeSlots, toShortDate, toTimeValue} from './utils/timeHelper'

const TimeSlotTable = ({
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots,
  checkedTimeSlot,
  handleChange
}) => {
  const dates = weeklyDateValues(today);
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);
  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
          {dates.map(d => (
            <th key={d}>{toShortDate(d)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map(timeSlot => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
            {dates.map(date => (
              <td key={date}>
                <RadioButtonIfAvailable
                  availableTimeSlots={availableTimeSlots}
                  date={date}
                  timeSlot={timeSlot}
                  checkedTimeSlot={checkedTimeSlot}
                  handleChange={handleChange}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimeSlotTable;