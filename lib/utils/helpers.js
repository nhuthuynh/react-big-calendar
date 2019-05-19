'use strict'

exports.__esModule = true
exports.notify = notify
exports.instanceId = instanceId
exports.isFirstFocusedRender = isFirstFocusedRender
exports.dateIsInBusinessHours = dateIsInBusinessHours
exports.extractHoursMinutesFromTime = extractHoursMinutesFromTime
var idCount = 0

function uniqueId(prefix) {
  return '' + ((prefix == null ? '' : prefix) + ++idCount)
}

function notify(handler, args) {
  handler && handler.apply(null, [].concat(args))
}

function instanceId(component, suffix) {
  if (suffix === void 0) {
    suffix = ''
  }

  component.__id || (component.__id = uniqueId('rw_'))
  return (component.props.id || component.__id) + suffix
}

function isFirstFocusedRender(component) {
  return (
    component._firstFocus ||
    (component.state.focused && (component._firstFocus = true))
  )
} // refer from https://github.com/Incubity/react-big-calendar/blob/master/src/utils/helpers.js

function dateIsInBusinessHours(date, businessHours, endIncluded) {
  if (endIncluded === void 0) {
    endIncluded = false
  }

  // time : HH:MM
  var minutes = date.getMinutes()
  var hours = date.getHours()
  var weekDay = date.getDay()
  return businessHours.some(function(businessHour) {
    var start = extractHoursMinutesFromTime(businessHour.start)
    var end = extractHoursMinutesFromTime(businessHour.end)
    return (
      businessHour.dow.includes(weekDay) &&
      ((hours == start.hours && minutes >= start.minutes) ||
        hours > start.hours) &&
      ((hours == end.hours &&
        (endIncluded ? minutes <= end.minutes : minutes < end.minutes)) ||
        hours < end.hours)
    )
  })
}

function extractHoursMinutesFromTime(time) {
  // time : HH:MM
  var values = time.split(':')
  return {
    hours: values[0] ? parseInt(values[0]) : 0,
    minutes: values[1] ? parseInt(values[1]) : 0,
  }
}
