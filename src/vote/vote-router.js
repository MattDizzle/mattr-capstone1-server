const express = require('express');
// const path = require('path');
const VoteService = require('./vote-service');
const { requireAuth } = require('../middleware/jwt-auth');

const voteRouter = express.Router();
const jsonBodyParser = express.json();

voteRouter
  .route('/')
  .get((req, res, next) => {
    VoteService.getAllVote(req.app.get('db'))
      .then(election => {
        res.json(election.map(VoteService.serializeVote));
      })
      .catch(next);
  });

voteRouter
  .route('/')
  .post( requireAuth , jsonBodyParser, (req, res, next) => {
    const user_id = req.user.user_id;
    const { election_id, candidate_id } = req.body;
    const newVote = { election_id, candidate_id, user_id };
    console.log(req.user.user_id);

    for (const [key, value] of Object.entries(newVote))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    // newVote.user_id = req.user.id;

    VoteService.insertVote(
      req.app.get('db'),
      newVote
    )
      .then(vote => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${vote.id}`))
          .json(VoteService.serializeVote(vote));
      })
      .catch(next);
  });

module.exports = voteRouter;