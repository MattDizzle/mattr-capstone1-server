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
  };

  const { users, votes, elections, candidates } = helpers.makeFixtures();

  const user = {
    user_email: 'mattdizzledev200@gmail.com',
    user_password: 'Imgood1$'
  };

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

  context('given data', () => {
    beforeEach('insert data', () => {
      return helpers.seedTables(db, users, candidates, elections);
    });

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
      
      context('given new vote with auth token', () => {  
        it('responds 201', () => {

          const vote = {
            election_id: 1,
            candidate_id: 1,
          };
  
          return supertest(app)
            .post('/api/vote')
            .set('Authorization', helpers.makeAuthHeaders(user))
            .send(vote)
            .expect(201);
        });
      });
    });

  });
});