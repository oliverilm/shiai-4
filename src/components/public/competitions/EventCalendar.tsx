import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import { Competition } from '../../../utils/interfaces';

const localizer = momentLocalizer(moment);

const EventCalendar = ({ competitions }: { competitions: Competition[] }) => {
  const competitionsEventList = competitions
    ? competitions.map((competition, id) => {
        const { name: title, description: desc } = competition;
        const { lower, upper } = JSON.parse(competition.dateRange);
        return {
          id,
          title,
          start: new Date(lower),
          end: new Date(upper),
          desc,
        };
      })
    : [];

  return (
    <Calendar
      localizer={localizer}
      events={competitionsEventList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 600, width: 'inherit' }}
    />
  );
};
export default EventCalendar;
