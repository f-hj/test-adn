const distance = (a, b) => {
  const xs = Math.pow(b.lat - a.lat, 2)
  const ys = Math.pow(b.lon - a.lon, 2)
  return Math.sqrt(xs + ys)
}

module.exports = {
  findMoreClose (points, event) {
    let dist = +Infinity
    let moreClosePoint
    points.forEach(point => {
      let distEventFromPoint = distance(point, event)
      if (distEventFromPoint < dist) {
        dist = distEventFromPoint
        moreClosePoint = point
      }
    })
    return moreClosePoint
  }
}
