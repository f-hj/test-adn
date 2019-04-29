# Test Audion

## Getting started

The list of events **events.csv** is at the root of repository

### Run

`npm start`

Will open the port 3000 or set the env variable `API_PORT` to the port you want (eg `8080`)

### Tests

No tests was asked on subject, but I had time to code it

`npm test` use the Jest framework (very simple, used before, automatic async + expect lib)

### Docker

Nothing special needed: `docker build .`

## Application

### Parsing file

I chose to use `csv-parse` module (very famous, good coverage, good maintability and used before)

### Creating API

Express server with express integrated json middleware

#### Steps

- Prepare result object
- For loop to all points from API body
  - For loop to all events
    - Calculate nearest point
    - Increment clicks or impressions for nearest point depend of `event_type`
- Send results