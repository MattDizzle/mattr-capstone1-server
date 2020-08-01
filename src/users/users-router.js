const express = require('express');
const path = require('path');
const UsersService = require('./users-service');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { user_first_name, user_last_name, user_email, user_dob, password } = req.body;

    for (const field of ['user_first_name', 'user_last_name','user_email', 'user_dob', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });

    // TODO: check user_email doesn't start with spaces

    const passwordError = UsersService.validatePassword(password);

    if (passwordError)
      return res.status(400).json({ error: passwordError });

    UsersService.hasUserWithEmail(
      req.app.get('db'),
      user_email
    )
      .then(hasUserWithEmail => {
        if (hasUserWithEmail)
          return res.status(400).json({ error: 'Email already registered' });

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              user_first_name,
              user_last_name,
              user_email,
              user_dob,
              password: hashedPassword,
              date_created: 'now()',
            };

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user));
              });
          });
      })
      .catch(next);
  });

module.exports = usersRouter;