const xss = require('xss');

const ElectionService = {
  getAllElection(db) {
    return db('poll_data_election')
      .select('*');
  },

  getByElectionId(db, election_id) {
    return db('poll_data_election')
      .select('*')
      .where({election_id})
      .first();
  },

  serializeElection(election) {
    return {
      election_id: election.election_id,
      election_name: election.election_name,
      candidate1: election.candidate1,
      candidate2: election.candidate2,
      date_created: new Date(election.date_created),
      date_end: new Date(election.date_end)
     
    };
  }

};

module.exports = ElectionService;