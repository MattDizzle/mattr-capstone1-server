const express = require('express');
const path = require('path');
const VoteService = require('./vote-service');
const { requireAuth } = require('../middleware/basic-auth');

const voteRouter = express.Router();
const jsonBodyParser = express.json();

voteRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { election_id, candidate_id, user_id } = req.body;
    const newVote = { election_id, candidate_id, user_id };

    for (const [key, value] of Object.entries(newVote))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newVote.user_id = req.user.id;

    VoteService.insertVote(
      req.app.get('db'),
      newVote
    )
      .then(vote => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${vote.id}`))
          .json(VoteService.serializeComment(vote));
      })
      .catch(next);
  });

module.exports = voteRouter;