# MY POLL DATA

This is a project by Matthew Rougely.

Live link:
https://my-poll-data.vercel.app/

## Welcome to the My Poll Data Api Documentation.

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
includes that have been cast for all vote

Home:
![My Poll Data Screenshot: Home](https://github.com/thinkful-ei-panda/mattr-capstone1-client/blob/master/screenshots/Home.JPG?raw=true)

Election:
![My Poll Data Screenshot: Election](https://github.com/thinkful-ei-panda/mattr-capstone1-client/blob/master/screenshots/Elections.JPG?raw=true)

Login:
![My Poll Data Screenshot: Login](https://github.com/thinkful-ei-panda/mattr-capstone1-client/blob/master/screenshots/Login.JPG?raw=true)

Register:
![My Poll Data Screenshot: Register](https://github.com/thinkful-ei-panda/mattr-capstone1-client/blob/master/screenshots/Register.JPG?raw=true)





# About the Technology Stack

Front-end technologies:

HTML5, CSS3, Javascript, React, JSX

Server technologies:

​Express, Morgan, Helmet, Path, JsonWebToken, XSS, pg, Dotenv, Cors, Postgrator, Supertest

Data Persistence:

PostgreSQL.

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
