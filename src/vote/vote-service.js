const xss = require("xss");

const VoteService = {
  getAllVote(db) {
    return db("poll_data_vote").select("*");
  },

  getVoteById(db, vote_id) {
    console.log(vote_id);
    return db("poll_data_vote")
    .where({ vote_id })
    .first();
  },

  getByCandidateId(db, id) {
    return db.from("poll_data_vote").select("candidate_id").where({ id });
  },

  insertVote(db, newVote) {
    // Debug here
      return db
      .insert(newVote)
      .into("poll_data_vote")
      // .returning("*") 
  },

  getVoteData(db, userId) {
    return db
    .select('*')
    .from('poll_data_vote')
    .where('user_id', userId)
  },

  serializeVote(vote) {
    // Debug here
    return {
      vote_id: vote.vote_id,
      election_id: xss(vote.election_id),
      candidate_id: xss(vote.candidate_id),
      user_id: vote.user_id,
      date_created: new Date(vote.date_created),
    };
  },
};

module.exports = VoteService;
