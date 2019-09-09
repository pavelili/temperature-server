/* eslint-disable no-console */
const client = require('../lib/utils/client');

client.query(`
  CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`)
  .then(
    () => console.log('create tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });
