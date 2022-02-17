const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  updateUserProfile,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);
usersRouter.patch('/me', updateUserProfile);

module.exports = usersRouter;