const xss = require('xss');

const VoteService = {
  
  getAllVote(db) {
    return db('poll_data_vote')
      .select('*');
  },

  getById(db, vote_id) {
    console.log(vote_id)
    return db('poll_data_vote')
      .select('*')
      .where({vote_id})
      .first();
  },

  getByCandidateId(db, id) {
    return db
      .from('poll_data_vote')
      .select('candidate_id')
      .where({id});
      
  },

  insertVote(db, newVote) {
    return db
      .insert(newVote)
      .into('poll_data_vote')
      .returning('*')
      .then(([vote]) => vote)
      .then(vote =>
        VoteService.getById(db, vote.id)
      );
  },

  serializeVote(vote) {
    return {
      vote_id: vote.vote_id,
      election_id: vote.election_id,
      candidate_id: vote.candidate_id,
      user_id: vote.user_id,
      date_created: new Date(vote.date_created),
    };
  }
};

module.exports = VoteService;