import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from '../events'
import dates from '../../src/utils/dates'

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

const businessHours = [
  {
    dow: [0, 1, 2, 3, 4, 5, 6], // Sunday, Monday, Tuesday, Wednesday...
    start: '08:30', // 8:30am
    end: '16:30', // 4:30pm
  },
]

class BusinessHours extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = { events }
  }
  handleSelect = ({ start, end }) => {
    this.setState({
      events: [
        ...this.state.events,
        {
          start,
          end,
          title: Math.random()
            .toString()
            .substring(7),
        },
      ],
    })
  }

  render() {
    const { localizer } = this.props
    return (
      <BigCalendar
        selectable
        events={events}
        views={allViews}
        step={15}
        showMultiDayTimes
        max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
        defaultDate={new Date(2015, 3, 1)}
        localizer={localizer}
        businessHours={businessHours}
        onSelectEvent={event => console.log(event)}
        onSelectSlot={this.handleSelect}
        timeslots={8}
        defaultView={BigCalendar.Views.WEEK}
      />
    )
  }
}

export default BusinessHours
