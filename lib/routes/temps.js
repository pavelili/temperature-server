const { Router } = require('express');
const Location = require('../models/Location');

module.exports = Router()
  .get('/', (req, res, next) => {
    Location
      .find()
      .then(loc => res.send(loc))
      .catch(next);
  })
  .get('/:locationId', (req, res, next) => {
    Location
      .getTemperaturesByLocation(req.params.locationId)
      .then(temp => res.send(temp[0]))
      .catch(next);
  });

// # Start of get average temps route
// .get('/avg', (req, res, next) => {
//   console.log(req, res, next);
// });
