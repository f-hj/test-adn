/* eslint-env jest */

const utils = require('../src/utils')

const mock = require('./mock')

test('should find more close 1', () => {
  expect(utils.findMoreClose(mock.points, {
    lat: 48.86,
    lon: 2.35
  }).name).toBe('A')
})

test('should find more close 2', () => {
  expect(utils.findMoreClose(mock.points, {
    lat: 48.8759992,
    lon: 2.3481253
  }).name).toBe('B')
})
