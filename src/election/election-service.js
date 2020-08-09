const xss = require('xss');

const ElectionService = {
  getAllElection(db) {
    return db('poll_data_election')
      .select('*');
    // .select('*').from('poll_data_election').leftOuterJoin('poll_data_election_candidate', 'poll_data_election.election_id', 'poll_data_election_candidate.election_id');
    // .select('*').from({poll_data_election}).fullOuterJoin(poll_data_election_candidate, poll_data_election.election_id, poll_data_election_candidate.election_id);
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
    // const { user } = vote;
    return {
      vote_id: vote.vote_id,
      election_id: vote.election_id,
      candidate_id: xss(vote.candidate_id),
      date_created: new Date(vote.date_created),
      
    };
  },
};

module.exports = ElectionService;