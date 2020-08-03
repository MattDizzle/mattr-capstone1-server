const xss = require('xss');

const ElectionService = {
  getAllElection(db) {
    return db('poll_data_election')
      .select('*')
  
    ;
  },

  getById(db, election_id) {
    return db('poll_data_election')
      .select('*')
      .where({election_id})
      .first();
  },

  serializeElection(election) {
    return {
      id: election.id,
      election_name: xss(election.election_name),
      candidate1: xss(election.candidate1),
      candidate2: xss(election.candidate2),
      date_created: new Date(election.date_created),
      date_end: new Date(election.date_end)
     
    };
  },

  serializeElectionVote(vote) {
    const { user } = vote;
    return {
      id: vote.id,
      election_id: vote.election_id,
      candidate_id: xss(vote.candidate_id),
      date_created: new Date(vote.date_created),
      user: {
        id: user.id,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    };
  },
};

module.exports = ElectionService;