const express = require('express')
const ElectionService = require('./election-service')

const electionRouter = express.Router()
// const { requireAuth } = require('../middleware/jwt-auth')

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
    const result = ElectionService.serializeElection(res.election)
    console.log(result)
    res.json(result)
    
  })

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