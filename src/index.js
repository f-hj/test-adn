const fs = require('fs')

const express = require('express')
const parse = require('csv-parse/lib/sync')

const calculate = require('./calculate')

// Parse events from file
const buf = fs.readFileSync('./events.csv')
const events = parse(buf, {
  columns: true
})

console.log(`${events.length} events stored in-memory`)

// Create API
const app = express()
app.use(express.json())

// Health endpoint
app.get('/health', (req, res) => {
  res.send('OK')
})

// List endpoint (for search)
app.post('/list', (req, res) => {
  const points = req.body

  // Check if array
  if (!(points instanceof Array)) {
    return res.status(401).json({
      message: 'Your body must be an array of point'
    })
  }

  // Check if array noit empty
  if (points.length === 0) {
    return res.status(401).json({
      message: `Your array doesn't contain any point`
    })
  }

  // Check if point correctly formatted
  for (const point of points) {
    if (typeof point.name !== 'string' || typeof point.lat !== 'number' || typeof point.lon !== 'number') {
      return res.status(401).json({
        message: 'Each of your point must contain a string `name`, a float `lat` and a float `lon`'
      })
    }
  }

  res.json(calculate(points, events))
})

const port = process.env.API_PORT || 3000
const server = app.listen(port, _ => {
  console.log(`API ready on :${port}`)
})

module.exports = {
  app,
  server
}
