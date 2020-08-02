const express = require('express');
const path = require('path');
const UserService = require('./user-service');

const userRouter = express.Router();
const jsonBodyParser = express.json();

userRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { user_first_name, user_last_name, user_email, user_dob, user_password } = req.body;

    for (const field of ['user_first_name', 'user_last_name','user_email', 'user_dob', 'user_password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });

    // TODO: check user_email doesn't start with spaces

    const passwordError = UserService.validatePassword(user_password);

    if (passwordError)
      return res.status(400).json({ error: passwordError });

    UserService.hasUserWithEmail(
      req.app.get('db'),
      user_email
    )
      .then(hasUserWithEmail => {
        if (hasUserWithEmail)
          return res.status(400).json({ error: 'Email already registered' });

        return UserService.hashPassword(user_password)
          .then(hashedPassword => {
            const newUser = {
              user_first_name,
              user_last_name,
              user_email,
              user_dob,
              user_password: hashedPassword,
              date_created: 'now()',
            };

            return UserService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UserService.serializeUser(user));
              });
          });
      })
      .catch(next);
  });

module.exports = userRouter;