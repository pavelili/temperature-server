const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    res
      .send(res.status = 204)
      .catch(next);
  });

// http://temp.alchemycodelab.io/subscribe
