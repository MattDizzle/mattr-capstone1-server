const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const { NODE_ENV } = require("./config");
const electionRouter = require("./election/election-router");
const voteRouter = require("./vote/vote-router");
const authRouter = require("./auth/auth-router");
const userRouter = require("./user/user-router");
const candidateRouter = require("./candidate/candidate-router");

const app = express();



app.use( 
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test",
  })
);
app.use(cors());
app.use(helmet());

app.use("/api/election", electionRouter);
app.use("/api/vote", voteRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/candidate", candidateRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: 'server error' }
  } else {
    console.error(error)
    response = { error: error.message, object: error }
  }
  res.status(500).json(response)
})

module.exports = app;
