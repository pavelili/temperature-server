/* eslint-disable no-console */
const client = require('../lib/utils/client');

console.log('##### CREATING TABLES #####');

client.query(`
  CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE temps (
    id SERIAL PRIMARY KEY,
    temperature DECIMAL,
    location INTEGER NOT NULL REFERENCES locations (id)
  );
`)
  .then(
    () => console.log('create table complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });
