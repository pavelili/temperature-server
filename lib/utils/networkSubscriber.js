const request = require('superagent');

module.exports = () => {
  return request
    .post('http://temp.alchemycodelab.io/subscribe ')
    .send({ url: process.env.HOST })
    .then(res => {
      if(!res.ok) throw 'You shall not receive the temps';
    });
};
