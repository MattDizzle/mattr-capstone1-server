This is a project by Matthew Rougely.

Welcome to the My Poll Data Api Documentation.

Get All Votes (Bearer Token Required):
https://fathomless-reef-21167.herokuapp.com/api/vote

Using the /api/vote endpoint you GET all votes that have been cast
for all elections.

GET All Elections (Bearer Token Required):
https://fathomless-reef-21167.herokuapp.com/api/election

Using the /api/election endpoint you GET all elections data which
includes that have been cast for all elections.

POST vote (Bearer Token Required, JWT Token Required):
https://fathomless-reef-21167.herokuapp.com/api/election

Using the /api/election endpoint you GET all vote data which
includes that have been cast for all vote.

# About the Technology Stack

Front-end technologies:

HTML5, CSS3, Javascript, React, JSX

Server technologies:

​Express, Morgan, Helmet, Path, JsonWebToken, XSS, pg, Dotenv, Cors, Postgrator, Supertest

Data Persistence:

PostgreSQL

Hosting/SaaS:
Vercel
Heroku

​Development Environment

Node.js

Run the tests in watch mode `npm test`

Migrate the dev database `npm run migrate`

Migrate the test database `npm run migrate:test`

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.
