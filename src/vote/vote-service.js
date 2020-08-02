const xss = require('xss')

const VoteService = {
  getById(db, id) {
    return db
      .from('poll_data_vote')
      .select(
        'poll_data_vote.id',
        'userVote.date_created',
        'userVote.election_id',
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'date_created', usr.date_created
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'poll_data_user',
        'user_id',
        'usr.id',
      )
      .where('election.id', id)
      .first()
  },

  insertComment(db, newVote) {
    return db
      .insert(newVote)
      .into('poll_data_votes')
      .returning('*')
      .then(([vote]) => vote)
      .then(vote =>
        VoteService.getById(db, vote.id)
      )
  },

  serializeComment(vote) {
    const { user } = vote
    return {
      id: vote.id,
      election_id: election_id,
      candidate_id: candidate_id,
      user_id: user_id,
      date_created: new Date(vote.date_created),
    }
  }
}

module.exports = VoteService