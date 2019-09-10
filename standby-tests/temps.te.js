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
    client.end();
  });

  it('GET gets all locations', () => {
    return request(app)
      .get('/api/v1/temps')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          name: 'Mars',
          __v: 0
        }, {
          _id: expect.any(String),
          name: 'Jason\'s Dining Hall',
          __v: 0
        }]);
      });
  });

  // it('Get/:locationId gets all temperatures by location id', () => {
  //   return request(app)
  //     .get(`/api/v1/temps/${loc1._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: loc1._id,
  //         name: loc1.name,
  //         temps: ['12.5', '74'],
  //         __v: 0
  //       });
  //     });
  // });
});
