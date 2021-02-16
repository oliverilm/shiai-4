import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "./index.scss"

const localizer = momentLocalizer(moment)

const myEventsList = [
    {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(2021, 1, 0),
        end: new Date(2021, 1, 0),
      },
      {
        id: 1,
        title: 'Long Event',
        start: new Date(2021, 1, 7),
        end: new Date(2021, 1, 10),
      },
    
      {
        id: 2,
        title: 'DTS STARTS',
        start: new Date(2021, 2, 13, 0, 0, 0),
        end: new Date(2021, 2, 20, 0, 0, 0),
      },
    
      {
        id: 3,
        title: 'DTS ENDS',
        start: new Date(2016, 10, 6, 12, 0, 0),
        end: new Date(2016, 10, 5, 13, 0, 0),
      },
    
      {
        id: 4,
        title: 'Some Event',
        start: new Date(2021, 1, 14, 10, 0, 0),
        end: new Date(2021, 1, 14, 12, 0, 0),
      },
      {
        id: 5,
        title: 'Conference',
        start: new Date(2021, 3, 11),
        end: new Date(2021, 3, 13),
        desc: 'Big conference for important people',
      },
]


const EventCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 600, width: "50%" }}
    />
  </div>
)
export default EventCalendar;