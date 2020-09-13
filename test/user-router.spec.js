const knex = require('knex');

const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');

describe('user endpoints', () => {
  //create test seed data
  const {
    users,
  } = helpers.makeFixtures();

  //create knex instance
  let db;

  before('create db connection', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    });
    app.set('db', db);
  });

  // use helper function to clean tables
  beforeEach('clean tables', () => helpers.cleanTables(db));

  //destroy connection
  after('destroy connection', () => db.destroy());

  describe('POST /user', () => {
    context('given new user', () => {
           
      it('responds 201, user registered', () => {

        return supertest(app)
          .post('/api/user')
          .send(users[0])
          .expect(201);

      });
    });
    
  });
});