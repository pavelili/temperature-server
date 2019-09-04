export const getTemps = ({ url }) => {
  return fetch('http://temp.alchemycodelab.io/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url }),
  })
    .then(res => {
      if(!res.ok) throw 'You shall not receive the temps';
      return res.json();
    });
};

// export const getRates = () => {
//   return fetch('https://api.ratesapi.io/api/latest?base=USD')
//     .then(res => {
//       if(!res.ok) throw 'Unable to get rates';

//       return res.json();
//     })
//     .then(json => {
//       return Object.entries(json.rates)
//         .map(entry => ({
//           name: entry[0],
//           quote: entry[1]
//         }));
//     });
// };
