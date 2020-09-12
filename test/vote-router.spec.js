const knex = require('knex');

const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');

describe('vote endpoints', () => {
  //create test seed data
  const {
    votes, users
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

  describe('POST /vote', () => {
    context('given new vote without auth token', () => {
           
      it('responds 401, unauthorized', () => {

        return supertest(app)
          .post('/api/vote')
          .send(votes[0])
          .expect(401, {
              error: 'Missing bearer token'
          });

      });
    });

      context('given new vote with auth token', () => {
           
        it('responds 201, Created', () => {
  
          return supertest(app)
            .post('/api/vote')
            .set('Authorization', helpers.makeAuthHeaders(users[0]))
            .send(votes[0])
            .expect(201, {
                message: 'Your vote has been recorded!'
            });
  
        });
    });
    
  });
});