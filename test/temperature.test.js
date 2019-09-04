require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Location = require('../lib/models/Location');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('status route returns a status code of 204 when POST route is hit', () => {
    return request(app)
      .post('/status')
      .then(res => {
        expect(res.status).toEqual(204);
      });
  });

  it('register returns a status code of 200 and an object with id', () => {
    return request(app)
      .post('/register')
      .send({
        name: 'Mars'
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
          id: expect.any(String)
        });
      });
  });

  it('deregister returns a status code of 204', async() => {
    const location = JSON.parse(JSON.stringify(await Location.create({
      name: 'Jupiter'
    })));
    return request(app)
      .delete('/deregister')
      .send({
        id: location._id
      })
      .then(res => {
        expect(res.status).toEqual(204);
      });
  });
});
