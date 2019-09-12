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
    const loc = req.params.id;

    client.query(`
      INSERT INTO temps (temperature, location)
      VALUES ($1, $2)
      RETURNING
        id, temperature, location;
    `, [temperature, loc])
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(next);
  })
  .delete('/deregister', (req, res, next) => {
    const { id } = req.body;

    res.status(204);

    client.query(`
      DELETE FROM temps
      WHERE location = $1;
    `, [id])
      .then(() => {
        return client.query(`
          DELETE FROM locations
          WHERE id = $1;
        `, [id]);
      })
      .then(() => res.end())
      .catch(next);
  });
