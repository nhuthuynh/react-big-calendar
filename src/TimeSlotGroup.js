import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { dateIsInBusinessHours } from './utils/helpers'
import BackgroundWrapper from './BackgroundWrapper'

export default class TimeSlotGroup extends Component {
  render() {
    const {
      renderSlot,
      resource,
      group,
      getters,
      businessHours,
      components: { timeSlotWrapper: Wrapper = BackgroundWrapper } = {},
    } = this.props

    return (
      <div className="rbc-timeslot-group">
        {group.map((value, idx) => {
          const slotProps = getters ? getters.slotProp(value, resource) : {}
          const isDisabled =
            businessHours && businessHours.length > 0
              ? !dateIsInBusinessHours(value, businessHours)
              : false
          return (
            <Wrapper key={idx} value={value} resource={resource}>
              <div
                {...slotProps}
                className={cn(
                  'rbc-time-slot',
                  slotProps.className,
                  isDisabled && 'rbc-disable'
                )}
              >
                {renderSlot && renderSlot(value, idx)}
              </div>
            </Wrapper>
          )
        })}
      </div>
    )
  }
}

TimeSlotGroup.propTypes = {
  renderSlot: PropTypes.func,
  group: PropTypes.array.isRequired,
  resource: PropTypes.any,
  components: PropTypes.object,
  getters: PropTypes.object,
  businessHours: PropTypes.arrayOf(PropTypes.object),
}
