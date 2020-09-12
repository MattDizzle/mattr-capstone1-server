const express = require('express')
const candidateService = require('./candidate-service')
const candidateRouter = express.Router()

candidateRouter
  .route('/')
  .get((req, res, next) => {
    candidateService.getAllCandidate(req.app.get('db'))
      .then(candidate => {
        res.json(candidate.map(candidateService.serializecandidate))
      })
      .catch(next)
  })

candidateRouter
  .route('/:candidate_id')
  .all(checkcandidateExists)
  .get((req, res) => {
    const result = candidateService.serializecandidate(res.candidate)
    res.json(result)
    
  })

async function checkcandidateExists(req, res, next) {
  try {
    const candidate = await candidateService.getCandidateById(
      req.app.get('db'),
      req.params.candidate_id
    )

    if (!candidate)
      return res.status(404).json({
        error: `candidate doesn't exist`
      })

    res.candidate = candidate
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = candidateRouter