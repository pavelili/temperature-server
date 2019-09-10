const { Router } = require('express');
// const Location = require('../models/Location');
// const Temp = require('../models/Temperature');
const client = require('../utils/client');

module.exports = Router()
  .get('/status', (req, res) => {
    res.sendStatus(204);
  })
  .post('/register', (req, res, next) => {
    const { name } = req.body;

    res.status(200);

    client.query(`
      INSERT INTO locations (name)
      VALUES ($1)
      RETURNING
        id;
    `, [name])
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(next);
  })
  .post('/temp/:id', (req, res, next) => {
    const { temperature } = req.body;

    client.query(`
      INSERT INTO temps (temperature)
      VALUES ($1)
      RETURNING
        id, temperature, location;
    `, [temperature])
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(next);
  })
// .delete('/deregister', (req, res, next) => {
//   const { id } = req.body;
//   res.status(204);
//   Location
//     .findByIdAndDelete(id)
//     .then(location => res.send(location))
//     .catch(next);
// });
  .delete('/deregister', (req, res, next) => {

  });
