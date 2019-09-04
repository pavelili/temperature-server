const { Router } = require('express');
const Location = require('../models/Location');

module.exports = Router()
  .post('/status', (req, res, next) => {
    res
      .send(res.status = 204)
      .catch(next);
  })
  .post('/register', (req, res, next) => {
    const { name } = req.body;

    res.status(200);

    Location
      .create({ name })
      .then(location => res.send({
        id: location._id
      }))
      .catch(next);
  });
