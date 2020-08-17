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
  .route('/:vote_id')
  .all(checkVoteExists)
  .get((req, res) => {
    const result = VoteService.serializeVote(res.vote);
    console.log(result);
    res.json(result);
  });

  async function checkVoteExists(req, res, next) {
    try {
      const vote = await VoteService.getById(
        req.app.get('db'),
        req.params.vote_id
      )
  
      if (vote)
        return res.status(404).json({
          
          error: `Vote already exist`
        })
      res.vote = vote
      next()
    } catch (error) {
      next(error)
    }
  }

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