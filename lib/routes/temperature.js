const { Router } = require('express');
// const Location = require('../models/Location');
// const Temp = require('../models/Temperature');
const client = require('../utils/client');

module.exports = Router()
  .get('/status', (req, res) => {
    res.sendStatus(204);
  })
  // .post('/register', (req, res, next) => {
  //   const { name } = req.body;

//   res.status(200);

  //   Location
  //     .create({ name })
  //     .then(location => res.send({
  //       id: location._id
  //     }))
  //     .catch(next);
  // })
  .post('/register', (req, res, next) => {
    const { name } = req.body;

    res.status(200);

    client.query(`
      INSERT INTO locations (name)
      VALUES ($1)
      RETURNING
        id, name, created;
    `, [name])
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(next);
  });

// .post('/temp/:id', (req, res, next) => {
//   const { temperature } = req.body;

//   Temp
//     .create({ temperature, location: req.params.id })
//     .then(temp => res.send(temp))
//     .catch(next);
// })
// .delete('/deregister', (req, res, next) => {
//   const { id } = req.body;
//   res.status(204);
//   Location
//     .findByIdAndDelete(id)
//     .then(location => res.send(location))
//     .catch(next);
// });
