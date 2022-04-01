const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found'); // 404
const InternalError = require('../errors/internal-err'); // 500
const ConflictError = require('../errors/conflict'); // 409
const BadRequestError = require('../errors/bad-request'); // 400
const UnauthorizedError = require('../errors/unauthorized'); // 401

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (_, res, next) => {
  User.find({})
    .then((users) => res.send(users.map((user) => {
      const {
        _id, name, email
      } = user;
      return {
        _id, name, email
      };
    })))
    .catch(() => {
      next(new InternalError('На сервере произошла ошибка'));
    });
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById({ _id: userId })
    .then((user) => {
      if (!user) {
        throw Error('404');
      }
      const {
        _id, name, email
      } = user;

      res.send({
        name, email, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      if (err.message === '404') {
        next(new NotFoundError('Пользователь не найден'));
        return;
      }
      next(new InternalError('На сервере произошла ошибка'));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, email, password: hash,
    })
      .then((user) => {
        const {
          _id,
        } = user;
        res.send({
          name, email, _id,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Переданы некорректные данные'));
          return;
        }
        if (err.name === 'MongoServerError' && err.code === 11000) {
          next(new ConflictError('Такой e-mail уже существует'));
          return;
        }
        next(new InternalError('На сервере произошла ошибка'));
      });
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    // если после findUserByCredentials перешли в then, 
    // значит пароль верный
    .then((user) => {
      // создает токен с payload, в который записывается информация о _id
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'); 
    
      res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
          sameSite: 'None',
          secure: true,
        }).send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Неверный логин и/или пароль'));
    });
};