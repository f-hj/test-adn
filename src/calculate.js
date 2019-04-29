const utils = require('./utils')

module.exports = (points, events) => {
  // Adding each points to object
  let result = {}
  for (const point of points) {
    result[point.name] = {
      lat: point.lat,
      lon: point.lon,
      name: point.name,
      clicks: 0,
      impressions: 0
    }
  }

  events.forEach(event => {
    // find more close
    let point = utils.findMoreClose(points, event)
    if (event.event_type === 'imp') {
      result[point.name].impressions++
    } else if (event.event_type === 'click') {
      result[point.name].clicks++
    }
  })

  return result
}
