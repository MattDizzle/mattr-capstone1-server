const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");
const supertest = require("supertest");

describe("candidate endpoint", () => {
  //create test seed data
  const election = {
    "candidate_id": 1,
    "candidate_name": "Joe Biden"
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

  describe("get /candidate", () => {
    context("given requested candidate", () => {
      it("responds 200", () => {
        return supertest(app).get("/api/candidate").expect(200);
      });
    });
  });
});
