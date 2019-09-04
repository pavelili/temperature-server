require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
// const connect = require('../lib/utils/connect');
// const mongoose = require('mongoose');

describe('app routes', () => {
  // beforeAll(() => {
  //   connect();
  // });

  // beforeEach(() => {
  //   return mongoose.connection.dropDatabase();
  // });

  // afterAll(() => {
  //   return mongoose.connection.close();
  // });

  it('returns a status code of 204 when POST route is hit', () => {
    return request(app)
      .post('/status')
      .then(res => {
        expect(res.status).toEqual(204);
      });
  });
});
