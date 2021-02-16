import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "./index.scss"
import { Competition } from '../../../utils/interfaces'

const localizer = momentLocalizer(moment)

const EventCalendar = ({competitions}: { competitions: Competition[]}) => {
    const competitionsEventList = competitions.map((competition, id) => {
      return {
        id,
        title: competition.name,
        start: new Date(JSON.parse(competition.dateRange).lower),
        end: new Date(JSON.parse(competition.dateRange).upper),
        desc: competition.description
      }
    })
    
    return <Calendar
      localizer={localizer}
      events={competitionsEventList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 600, width: "inherit" }}
    />
}
export default EventCalendar;