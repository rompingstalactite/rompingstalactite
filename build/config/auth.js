'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateGoogleLogin = exports.handleGoogleLogin = exports.checkAuth = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGoogleOauth = require('passport-google-oauth20');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var googleClientID = process.env.GOOGLE_CLIENT_ID;
var googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!process.env.TRAVIS && !process.env.HEROKU) {
  googleClientID = require('../keys/googleAuth').googleKeys.CLIENT_ID;
  googleClientSecret = require('../keys/googleAuth').googleKeys.CLIENT_SECRET;
}

var pgp = require('pg-promise')();

var db = pgp(_helpers.postgresConnection);

var checkAuth = exports.checkAuth = function checkAuth(req, res, next) {
  if (req.session.passport ? req.session.passport.user : false) {
    next();
  } else {
    // Bad credentials
    res.redirect('/');
  }
};

var handleGoogleLogin = exports.handleGoogleLogin = _passport2.default.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login']
});

var authenticateGoogleLogin = exports.authenticateGoogleLogin = _passport2.default.authenticate('google', {
  failureRedirect: '/'
});

_passport2.default.serializeUser(function (user, done) {
  done(null, user);
});

_passport2.default.deserializeUser(function (user, done) {
  done(null, user);
});

// Find a user with a given Google user ID
var findOne = function findOne(googleID, callback) {
  db.one({
    name: 'find-user-using-google-id',
    text: 'select * from users where google_id = $1',
    values: [googleID]
  }).then(callback).catch(callback);
};

// Create a user with attributes inside the userObj, find a user if user already exists
var findOrCreateUser = function findOrCreateUser(userObj, callback) {
  var avatar = userObj.photos.length > 0 ? userObj.photos[0].value.slice(0, userObj.photos[0].value.length - 6) : '';
  var queryObj = {
    name: 'insert-user',
    text: 'insert into users(google_id, display_name, avatar) values ($1, $2, $3) returning *',
    values: [userObj.id, userObj.displayName, avatar]
  };

  db.one(queryObj).then(callback).catch(function (error) {
    if (error.code === '23505' || error.code === '23502') {
      findOne(userObj.googleID, callback);
    } else {
      callback(new Error('Error code: ' + error.code + ', Error message: ' + error.detail));
    }
  });
};

var handleUserData = function handleUserData(error, user) {
  if (error) {
    return error;
  }
  return user;
};

_passport2.default.use(new _passportGoogleOauth.Strategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: '/auth/google/callback'
}, function (accessToken, refreshToken, profile, done) {
  findOrCreateUser(profile, handleUserData);
  return done(null, profile);
}));