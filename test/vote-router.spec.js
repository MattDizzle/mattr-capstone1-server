const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');
const AuthService = require('../src/auth/auth-router');

describe('vote endpoints', () => {
  //create test seed data
  const vote = { 
    election_id: 1,
    candidate_id: 1
  }

  const user = {
    user_email: "mattdizzledev200@gmail.com",
    user_password: "Imgood1$"
  }

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

  describe('POST /vote', () => {
    context('given new vote without auth token', () => {
           
      it('responds 401, unauthorized', () => {

        return supertest(app)
          .post('/api/vote')
          .send(vote)
          .expect(401, {
              error: 'Missing bearer token'
          });
      });
    });
    
    
  });
});