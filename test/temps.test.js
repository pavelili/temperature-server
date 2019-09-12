require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const client = require('../lib/utils/client');
const child_process = require('child_process');

describe('app routes', () => {
  beforeEach(() => {
    child_process.execSync('npm run recreate-tables');
  });

  afterAll(() => {
    return client.end();
  });

  const createLoc = () => request(app)
    .post('/register')
    .send({
      name: 'Paris'
    });

  it('GET gets all locations', () => {
    return createLoc()
      .then(() => {
        return request(app)
          .get('/api/v1/temps')
          .then(res => {
            expect(res.body).toEqual([{
              id: expect.any(Number),
              name: 'Paris',
              created: expect.any(String)
            }]);
          });
      });
  });

  // it('Get/:locationId gets all temperatures by location id', () => {
  //   return createLoc()
  //     .then(loc => {
  //       return request(app)
  //         .post(`/temp/${loc.body.id}`)
  //         .send({
  //           temperature: 37.3
  //         })
  //         .get(`/${loc.body.id}`)
  //         .then(res => {
  //           expect(res.body).toEqual([{
  //             id: loc.body.id,
  //             name: loc.body.name,
  //             temps: ['12.5', '74']
  //           }]);
  //         });
  //     });
  // });
});
