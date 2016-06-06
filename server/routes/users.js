// users.js
const db = require('../db-config');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


const authenticate = (req, res, next) => {
  // we check the token here, but it really doesn't do anything with the authentication.
  if (req.body.user && req.body.token) {
    const token = req.body.token;

    jwt.verify(token, 'TODO:SECRET', (err, decoded) => {
      if (err) {
        req.isAuthenticated = false;
        return next();
      }
      // if everything is good, save to request for use in other routes
      req.isAuthenticated = true;
      req.username = decoded.username;

      return next();
    });
  }
    //  create a dummy room to always return until the front end can
    //  start passing in a existing user.
    // const adminRoomId = '00000';
    // User.findOne({ roomid: adminRoomId }, (err, results) => {
    //   if (results === null) {
    //     new User({ username: 'admin',
    //       password: 'no-password',
    //       roomid: adminRoomId,
    //       queue: [] })
    //     .save(() => {
    //       console.log('creating dummy user');
    //       req.username = 'admin';
    //       req.roomid = adminRoomId;

    //       return next();
    //     });
    //   } else {
    //     console.log('found dummy user');
    //     req.username = 'admin';
    //     req.roomid = adminRoomId;
    //     return next();
    //   }
    // });
  return next();
};


const generateToken = (username) => {
  const token = jwt.sign({ username: username }, 'TODO:SECRET', {
    expiresIn: 60 * 60 * 12,
  });
  //  console.log(token);
  return token;
};

//  TODO: Find way to keep looping till we find a unique id
const generateRoomId = (username) => {
  return new Promise((resolve, reject) => {
    const objId = mongoose.Types.ObjectId().toString();
    const potentialRoomId = objId.slice(0, 5) + objId.slice(objId.length - 1);
    User.find({ roomid: potentialRoomId }, (err, results) => {
      //  console.log('results:', results.length);
      if (err) {
        reject(err);
      }
      // TODO
      if (results.length === 0) {
        resolve(potentialRoomId);
      } else {
        reject('roomid already exists');
      }
    });
  });
};

//  TODO: Find way to keep looping till we find a unique id
const bcryptPromise = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 1, (hashErr, hash) => {
      if (hashErr) {
        reject(hashErr);
      }
      resolve(hash);
    });
  });
};

const doSignin = (username, password) => {

  return new Promise((resolve, reject) => {
    User.findOne({ username: username })
      .exec((err, user) => {
        if (err) {
          return reject(err);
        }

        if (user === undefined || user === null) {
          return reject('user does not exist');
        }

        bcrypt.compare(password, user.password, (comperr, res) => {
          if (comperr) {
            return reject(err);
          }

          if (!res) {
            return reject('bad password');
          }
          const returnUser = {
            username: user.username,
            roomid: user.roomid,
          };

          resolve(returnUser);
        });
      });
  });
};

const doSignup = (username, password) => {
  //  console.log('signup attempt of username: ', username);

  return new Promise((resolve, reject) => {
    User.find({ username: username }, (err, users) => {
      if (err) {
        reject('error finding username:', username);
      }
      if (users.length > 0) {
        reject('user already exists');
      } else {
        bcrypt.hash(password, 1, (hashErr, hash) => {
          if (hashErr) {
            reject('can\'t generate password', hashErr);
          }
          generateRoomId(username)
          .then((uniqueRoomId) => {
            const makeUser = new User({
              username: username,
              password: hash,
              roomid: uniqueRoomId,
              queue: [] });
            makeUser.save((saveErr, saveResult) => {
              if (saveErr) {
                return reject(saveErr);
              }
              const returnUser = {
                username: makeUser.username,
                roomid: makeUser.roomid,
              };
              return resolve(returnUser);
            });
          });
        });
      }
    });
  });
};


const signup = (req, res) => {
  // signup
  const username = req.body.username;
  const password = req.body.password;


  doSignup(username, password)
  .then((user) => {
    const token = generateToken(username);
    console.log('user successfully signed up', user);
    return res.json({
      user: user,
      loggedIn: true,
      token: token,
    });
  })
  .catch((err) => {
    console.log(username, ' failed to sign up: ', err);
    return res.json({
      message: err,
      loggedIn: false,
    });
  });
};

const signin = (req, res) => {
  // signin
  console.log('reqbody', req.body);
  const username = req.body.username;
  const password = req.body.password;

  doSignin(username, password)
  .then((user) => {
    const token = generateToken(username);
    console.log('user successfully authenticated', user);
    return res.json({
      user: user,
      loggedIn: true,
      token: token,
    });
  })
  .catch((err) => {
    console.log('failed login because of: ', err);
    return res.json({
      message: err,
      loggedIn: false,
    });
  });
};

module.exports = {
  signin,
  signup,
  doSignup,
  doSignin,
  generateRoomId,
  generateToken,
  authenticate,
};
