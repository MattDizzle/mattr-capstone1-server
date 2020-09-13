const express = require("express");
const path = require("path");
const VoteService = require("./vote-service");
const { requireAuth } = require("../middleware/jwt-auth");

const voteRouter = express.Router();
const jsonBodyParser = express.json();

voteRouter.route("/").get((req, res, next) => {
  VoteService.getAllVote(req.app.get("db"))
    .then((vote) => {
      res.json(vote.map(VoteService.serializeVote));
    })
    .catch(next);
});

async function checkVoteExists(req, res, next) {
  try {
    const vote = await VoteService.getVoteById(
      req.app.get("db"),
      req.params.vote_id
    );

    if (vote) {
      return res.status(501).json({
        error: `Vote already exist`,
      });
    }
    res.vote = vote;
    next();
  } catch (error) {
    next(error);
  }
}

voteRouter
  .route("/:vote_id")
  .all(requireAuth)
  .all(checkVoteExists)
  .get((req, res) => {
    const result = VoteService.serializeVote(res.vote);
    res.json(result);
  });

voteRouter
.route("/")
.post(requireAuth, jsonBodyParser, (req, res, next) => {
  const user_id = req.user.user_id;
  const { election_id, candidate_id } = req.body;
  const newVote = { election_id, candidate_id, user_id };

  for (const [key, value] of Object.entries(newVote))
    if (value == null)
      return res.status(400).json({
        error: `Please choose a candidate`,
      });

  return VoteService.insertVote(req.app.get("db"), newVote)
    .then((vote) => {
      res
        .status(201)
        .json({ message: "Your vote has been recorded!" })
        .location(path.posix.join(req.originalUrl, `/${vote.id}`))
        .json(VoteService.serializeVote(vote));
    })
    .catch(next);
});

module.exports = voteRouter;
