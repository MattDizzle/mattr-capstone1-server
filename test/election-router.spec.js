const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");
const supertest = require("supertest");

describe("election endpoint", () => {
  //create test seed data
  const election = {
    election_id: 1,
    election_name: "Presidential Election 2020",
    candidate1: 1,
    candidate2: 2,
  };

  //create knex instance
  let db;

  before("create db connection", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  // use helper function to clean tables
  beforeEach("clean tables", () => helpers.cleanTables(db));

  //destroy connection
  after("destroy connection", () => db.destroy());

  describe("get /election", () => {
    context("given requested elections", () => {
      it("responds 200", () => {
        return supertest(app).get("/api/election").expect(200);
      });
    });
  });
});
