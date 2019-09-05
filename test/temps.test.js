require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Location = require('../lib/models/Location');
const Temp = require('../lib/models/Temperature');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let loc1;
  beforeEach(async() => {
    loc1 = JSON.parse(JSON.stringify(await Location.create({
      name: 'Mars'
    })));

    JSON.parse(JSON.stringify(await Location.create({
      name: 'Jason\'s Dining Hall'
    })));

    JSON.parse(JSON.stringify(await Temp.create({
      temperature: 12.5,
      location: loc1._id
    })));

    JSON.parse(JSON.stringify(await Temp.create({
      temperature: 74,
      location: loc1._id
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

  it('Get/:locationId gets all temperatures by location id', () => {
    return request(app)
      .get(`/api/v1/temps/${loc1._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: loc1._id,
          name: loc1.name,
          temps: ['12.5', '74'],
          __v: 0
        });
      });
  });
});
