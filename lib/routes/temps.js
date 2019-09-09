const { Router } = require('express');
// const Location = require('../models/Location');
const client = require('../utils/client');

module.exports = Router()
  .get('/', (req, res, next) => {
    client.query(`
      SELECT
        id,
        name,
        created
      FROM locations;
    `)
      .then(result => {
        res.send(result.rows);
      })
      .catch(next);
  });
// .get('/:locationId', (req, res, next) => {
//   Location
//     .getTemperaturesByLocation(req.params.locationId)
//     .then(temp => res.send(temp[0]))
//     .catch(next);
// });

// # Start of get average temps route
// .get('/avg', (req, res, next) => {
//   console.log(req, res, next);
// });
