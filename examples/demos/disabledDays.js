import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from '../events'
import dates from '../../src/utils/dates'

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class DisabledDays extends React.Component {
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
        step={60}
        showMultiDayTimes
        max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
        defaultDate={new Date(2015, 3, 1)}
        localizer={localizer}
        disabledDays={[dates.today(), dates.tomorrow()]}
        onSelectEvent={event => console.log(event)}
        onSelectSlot={this.handleSelect}
      />
    )
  }
}

export default DisabledDays
