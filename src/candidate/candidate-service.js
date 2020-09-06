const xss = require('xss');

const CandidateService = {
  getAllCandidate(db) {
    return db('poll_data_candidate')
      .select('*');
  },

  getCandidateById(db, candidate_id) {
    return db('poll_data_candidate')
      .where({candidate_id})
      .first();
  },

  serializecandidate(candidate) {
    return {
      candidate_id: candidate.candidate_id,
      candidate_name: xss(candidate.candidate_name)
         
    };
  }
};

module.exports = CandidateService;