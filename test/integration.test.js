/* eslint-env jest */

const axios = require('axios')

const index = require('../src/index.js')
afterAll(() => {
  index.server.close()
})

const mock = require('./mock')

const instance = axios.create({
  baseURL: `http://localhost:3000`
})

test('should be ok with health endpoint', async () => {
  const res = await instance.get('/health')
  expect(res.data).toBe('OK')
})

test('should return error if not an array', async () => {
  expect.assertions(1)
  try {
    await instance.post('/list', {})
  } catch (err) {
    expect(err.response.data.message).toContain('body must be an array')
  }
})

test('should return error if empty array', async () => {
  expect.assertions(1)
  try {
    await instance.post('/list', [])
  } catch (err) {
    expect(err.response.data.message).toContain(`array doesn't contain any point`)
  }
})

test('should return error if point name not correctly formatted', async () => {
  expect.assertions(1)
  try {
    await instance.post('/list', [
      {
        lat: 12,
        lon: 14
      }
    ])
  } catch (err) {
    expect(err.response.data.message).toContain(`your point must contain`)
  }
})

test('should return error if point lat not correctly formatted', async () => {
  expect.assertions(1)
  try {
    await instance.post('/list', [
      {
        name: 'Name',
        lat: 'Latitude incorrect',
        lon: 14
      }
    ])
  } catch (err) {
    expect(err.response.data.message).toContain(`your point must contain`)
  }
})

test('should return error if point lat not correctly formatted', async () => {
  expect.assertions(1)
  try {
    await instance.post('/list', [
      {
        name: 'Name',
        lon: 'Longitude incorrect',
        lat: 14
      }
    ])
  } catch (err) {
    expect(err.response.data.message).toContain(`your point must contain`)
  }
})

test('should calculate correctly', async () => {
  const res = await instance.post('/list', mock.points)
  expect(Object.keys(res.data).length).toBe(mock.points.length)
})
