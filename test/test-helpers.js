const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

function makeVotesArray() {
  return [
    { 
      user_id: 1,
      election_id: 1,
      candidate_id: 1,
    }
  ];
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      poll_data_candidate,
      poll_data_election,
      poll_data_user,
      poll_data_vote
      RESTART IDENTITY CASCADE;
      `
  );
}

function makeUsersArray() {
  return [
    {
      user_id: 1,
      user_email: "mattdizzledev200@gmail.com",
      user_password: "Imgood1$"
    },
    {
      user_id: 2,
      user_email: 'test@email.com',
      user_password: "Imgood1$"
    }
  ];
};

function makeElectionsArray() {
  return [
    {
      election_id: 1,
      election_name: 'Presedential Election 2020',
      candidate1: 1,
      candidate2: 2,
      date_end: '11/3/2020',
    },
    {
      election_id: 2,
      election_name: 'Presedential Election 2024',
      candidate1: 3, 
      candidate2: 4,
      date_end: '11/3/2024',
    },
  ];
}

function makeCandidatesArray() {
  return [
    {
      candidate_id: 1,
      candidate_name: 'Joe Biden'
    },
    {
      candidate_id: 2,
      candidate_name: 'Donald Trump'
    },
    {
      candidate_id: 3,
      candidate_name: 'Kim Kardashian'
    },
    {
      candidate_id: 4,
      candidate_name: 'Kanye West'
    },
  ];
}

function makeFixtures() {
  const users = makeUsersArray();
  const votes = makeVotesArray();
  const elections = makeElectionsArray();
  const candidates = makeCandidatesArray();
  return { users, votes, elections, candidates };
}

function seedUsers(db, users) {
  const hashedUsers = users.map((user) => ({
    ...user,
    user_password: bcrypt.hashSync(user.user_password, 12),
  }));

  return db("poll_data_user")
    .insert(hashedUsers)
    .then(() => {
      return db.raw(`
      SELECT setval ('poll_data_user_user_id_seq', ?)`, [users[users.length-1].user_id]);
    });
};

function seedCandidates(db, candidates) {
  return db("poll_data_candidate")
    .insert(candidates)
    .then(() => {
      return db.raw(`
      SELECT setval ('poll_data_candidate_candidate_id_seq', ?)`, [candidates[candidates.length-1].candidate_id]);
    });
};

function seedElections(db, elections) {
  return db("poll_data_election")
    .insert(elections)
    .then(() => {
      return db.raw(`
      SELECT setval ('poll_data_election_election_id_seq', ?)`, [elections[elections.length-1].election_id]);
    });
};


function seedTables(db, users, candidates, elections) {
  return db.transaction(async (trx) => {
    await seedUsers(trx, users);
    await seedCandidates(trx, candidates);
    await seedElections(trx, elections)
  });
}

function makeAuthHeaders(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user_id }, secret, {
    subject: user.user_email,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

function makeAuthHeaders(user, secret = process.env.JWT_SECRET) {
  //create jwt
   const token = jwt.sign(
     {user_id: user.user_id}, 
     secret, 
     {subject: user.user_email, algorithm: 'HS256'}
   );
   return `Bearer ${token}`;
 }

module.exports = {
  cleanTables,
  makeFixtures,
  seedUsers,
  seedTables,
  makeAuthHeaders,
};
