const AuthService = {
  getUserWithUserEmail(db, user_email) {
    return db('poll_data_user')
      .where({ user_email })
      .first();
  },
  parseBasicToken(token) {
    return Buffer
      .from(token, 'base64')
      .toString()
      .split(':');
  },
};
  
module.exports = AuthService;