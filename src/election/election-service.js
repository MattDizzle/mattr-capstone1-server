const xss = require('xss');

const ElectionService = {
  getAllElection(db) {
    return db
      .from('poll_data_election')
      .select('*');
  },

  getById(db, id) {
    return db('poll_data_election')
      .select('*')
      .where({id})
      .first();
  },

  // getVotesForElection(db, election_id) {
  //   return db
  //     .from('poll_data_vote AS vote')
  //     .select(
  //       'vote.id',
  //       'vote.text',
  //       'vote.date_created',
  //       db.raw(
  //         `json_strip_nulls(
  //           row_to_json(
  //             (SELECT tmp FROM (
  //               SELECT
  //                 usr.id,
  //                 usr.date_created,
  //                 usr.date_modified
  //             ) tmp)
  //           )
  //         ) AS "user"`
  //       )
  //     )
  //     .where('vote.election_id', election_id)
  //     .leftJoin(
  //       'poll_data_user AS usr',
  //       'vote.user_id',
  //       'usr.id',
  //     )
  //     .groupBy('vote.id', 'usr.id')
  // },

  serializeElection(election) {
    return {
      id: election.id,
      name: xss(election.name),
      date_created: new Date(election.date_created),
      date_end: new Date(election.date_end),
      number_of_votes: Number(election.number_of_votes) || 0,
     
    };
  },

  // serializeElectionVote(vote) {
  //   const { user } = vote
  //   return {
  //     id: vote.id,
  //     election_id: vote.election_id,
  //     candidate_id: xss(vote.candidate_id),
  //     date_created: new Date(vote.date_created),
  //     user: {
  //       id: user.id,
  //       date_created: new Date(user.date_created),
  //       date_modified: new Date(user.date_modified) || null
  //     },
  //   }
  // },
};

module.exports = ElectionService;