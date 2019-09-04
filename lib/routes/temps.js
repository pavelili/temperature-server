const { Router } = require('express');
const Location = require('../models/Location');

module.exports = Router()
  .get('/', (req, res, next) => {
    Location
      .find()
      .then(loc => res.send(loc))
      .catch(next);
  });
