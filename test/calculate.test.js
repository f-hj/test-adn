/* eslint-env jest */

const calculate = require('../src/calculate')

const mock = require('./mock')

test('should calculate with mock points', () => {
  const res = calculate(mock.points, mock.events)
  expect(Object.keys(res).length).toBe(mock.points.length)
  expect(res.A.clicks).toBe(2)
  expect(res.A.impressions).toBe(2)
  expect(res.B.clicks).toBe(0)
  expect(res.B.impressions).toBe(1)
})
