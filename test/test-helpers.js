const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

function makeVotesArray() {
  return [
    { 
      user_id: 1,
      election_id: 1,
      candidate_id: 1,
    },
    {
      election_id: 1,
      candidate_id: 1,
    },
    {
      election_id: 1,
      candidate_id: 1,
    },
    {
      election_id: 1,
      candidate_id: 2,
    },
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
      user_email: "user1@test.com",
      user_password: "P@ssword123",
    },
    {
      user_id: 2,
      user_email: "user2@test.com",
      user_password: "P@ssword123",
    },
    {
      user_id: 3,
      user_email: "user3@test.com",
      user_password: "P@ssword123",
    },
  ];
}

function makeFixtures() {
  const users = makeUsersArray();
  const votes = makeVotesArray();
  return { users, votes };
}

function seedUsers(db, users) {
  const hashedUsers = users.map((user) => ({
    ...user,
    user_password: bcrypt.hashSync(user.user_password, 12),
  }));

  return db("poll_data_user")
    .insert(hashedUsers)
    .then(() => {
      return db.raw(
        `
        SELECT setval ('users_id_seq', ?)`,
        [users.length - 1]
      );
    });
}

function seedTables(db, users) {
  return db.transaction(async (trx) => {
    await seedUsers(trx, users);
  });
}

function makeAuthHeaders(user, secret = process.env.JWT_SECRET) {
  //create jwt
  console.log(user)
  const token = jwt.sign({ user_id: user_id }, secret, {
    subject: user.user_email,
    algorithm: "HS256",
  });
  console.log('test token: ', token)
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
