// export const getTemps = ({ url }) => {
//   return fetch('http://temp.alchemycodelab.io/subscribe', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ url }),
//   })
//     .then(res => {
//       if(!res.ok) throw 'You shall not receive the temps';
//       return res.json();
//     });
// };

const superagent = require('superagent');

export const getTemps = () => {
  superagent
    .post('http://temp.alchemycodelab.io/subscribe ')
    .send({ url: 'https://pavelili-temps-server.herokuapp.com/' })
    .then(res => {
      if(!res.ok) throw 'You shall not receive the temps';
      return res.json();
    });
};

