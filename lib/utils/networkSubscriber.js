const request = require('superagent');

module.exports = () => {
  return request
    .post('https://location-temperatures.herokuapp.com/subscribe ')
    .send({ url: process.env.HOST })
    .then(res => {
      if(!res.ok) throw 'You shall not receive the temps';
    });
};

// # Previous URL
// http://temp.alchemycodelab.io/subscribe

// # New URL
// https://location-temperatures.herokuapp.com/subscribe
