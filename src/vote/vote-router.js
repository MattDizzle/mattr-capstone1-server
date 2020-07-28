const express = require('express');
const path = require('path');
const VoteService = require('./vote-service');
const { requireAuth } = require('../middleware/basic-auth');

const voteRouter = express.Router();
const jsonBodyParser = express.json();

voteRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { election_id, text } = req.body;
    const newVote = { election_id, text };

    for (const [key, value] of Object.entries(newconst express = require('express')
const path = require('path')
const CommentsService = require('./comments-service')
const { requireAuth } = require('../middleware/basic-auth')

const commentsRouter = express.Router()
const jsonBodyParser = express.json()

commentsRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { article_id, text } = req.body
    const newComment = { article_id, text }

    for (const [key, value] of Object.entries(newVote))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    newVote.user_id = req.user.id

    VotesService.insertVote(
      req.app.get('db'),
      newVote
    )
      .then(vote => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${vote.id}`))
          .json(votesService.serializeVote(vote))
      })
      .catch(next)
    })

module.exports = voteRouter))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newComment.user_id = req.user.id;

    VoteService.insertComment(
      req.app.get('db'),
      newComment
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