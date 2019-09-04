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

  beforeEach(async() => {
    JSON.parse(JSON.stringify(await Location.create({
      name: 'Mars'
    })));

    JSON.parse(JSON.stringify(await Location.create({
      name: 'Jason\'s Dining Hall'
    })));
  });

  afterAll(() => {
    return mongoose.connection.close();
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
});
