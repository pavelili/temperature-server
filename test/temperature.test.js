require('dotenv').config();

const client = require('../lib/utils/client');
const request = require('supertest');
const app = require('../lib/app');
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
      name: 'Mars'
    })
    .expect(200);

  const testLoc = loc => {
    expect(loc).toEqual({
      id: expect.any(Number)
    });
  };
  
  it('creates a location', () => {
    return createLoc()
      .then(({ body }) => {
        testLoc(body);
      });
  });

  it('status route returns a status code of 204 when POST route is hit', () => {
    return request(app)
      .get('/status')
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
          id: expect.any(Number)
        });
      });
  });

  // it('deregister returns a status code of 204', async() => {
  //   const location = JSON.parse(JSON.stringify(await Location.create({
  //     name: 'Jupiter'
  //   })));
  //   return request(app)
  //     .delete('/deregister')
  //     .send({
  //       id: location._id
  //     })
  //     .then(res => {
  //       expect(res.status).toEqual(204);
  //     });
  // });

  it('temp adds a new temperature by location to database', async() => {
    createLoc()
      .then(
        (location) => {
          return request(app)
            .post(`/temp/${location.id}`)
            .send({
              temperature: 37.3
            })
            .then(res => {
              expect(res.body).toEqual({
                id: expect.any(String),
                temperature: '37.3',
                location: location.id
              });
            });
        }
      );
  });
});
