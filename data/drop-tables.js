/* eslint-disable no-console */
const client = require('../lib/utils/client');

client.query(`
  DROP TABLE IF EXISTS temps;
  DROP TABLE IF EXISTS temperatures;
  DROP TABLE IF EXISTS locations;
`)
  .then(
    () => console.log('drop tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });
