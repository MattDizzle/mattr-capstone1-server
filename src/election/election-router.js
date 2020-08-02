const express = require('express')
const ElectionService = require('./election-service')
const { requireAuth } = require('../middleware/basic-auth')

const electionRouter = express.Router()

electionRouter
  .route('/')
  .get((req, res, next) => {
    ElectionService.getAllElection(req.app.get('db'))
      .then(election => {
        res.json(election.map(ElectionService.serializeElection))
      })
      .catch(next)
  })

electionRouter
  .route('/:election_id')
  // .all(requireAuth)
  .all(checkElectionExists)
  .get((req, res) => {
    res.json(ElectionService.serializeElection(res.election))
  })

// electionRouter.route('/:election_id/vote/')
//   .all(requireAuth)
//   .all(checkElectionExists)
//   .get((req, res, next) => {
//     ElectionService.getVoteForElection(
//       req.app.get('db'),
//       req.params.election_id
//     )
//       .then(vote => {
//         res.json(vote.map(ElectionService.serializeElectionComment))
//       })
//       .catch(next)
//   })

/* async/await syntax for promises */
async function checkElectionExists(req, res, next) {
  try {
    const election = await ElectionService.getById(
      req.app.get('db'),
      req.params.election_id
    )

    if (!election)
      return res.status(404).json({
        error: `Election doesn't exist`
      })

    res.election = election
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = electionRouter