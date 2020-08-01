const xss = require('xss')

const VoteService = {
  getById(db, id) {
    return db
      .from('poll_data_vote AS userVote')
      .select(
        'userVote.id',
        'userVote.date_created',
        'userVote.election_id',
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'user_first_name', usr.user_first_name,
              'user_last_name', usr.user_last_name,
              'date_created', usr.date_created,
              'date_modified', usr.date_modified
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'poll_data_users AS usr',
        'election.user_id',
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
      text: xss(vote.text),
      election_id: vote.election_id,
      date_created: new Date(vote.date_created),
      user: {
        id: user.id,
        user_first_name: user.user_first_name,
        user_last_name: user.user_last_name,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    }
  }
}

module.exports = VoteService