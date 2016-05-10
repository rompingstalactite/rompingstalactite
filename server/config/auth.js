import passport from 'passport';
import { Strategy as GoogleStrategy }  from 'passport-google-oauth20';

let googleClientID;
let googleClientSecret;
if (!process.env.TRAVIS) {
  googleClientID = process.env.GOOGLE_CLIENT_ID || require('../keys/googleAuth').googleKeys.CLIENT_ID;
  googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || require('../keys/googleAuth').googleKeys.CLIENT_SECRET;
}
import { postgresConnection as cn } from './helpers';
const pgp = require('pg-promise')();

const db = pgp(cn);

export const checkAuth = (req, res, next) => {
  if (req.session.passport ? req.session.passport.user : false) {
    next();
  } else {
    // Bad credentials
    res.redirect('/');
  }
};

export const handleGoogleLogin = passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login'],
});

export const authenticateGoogleLogin = passport.authenticate('google', {
  failureRedirect: '/',
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Find a user with a given Google user ID
const findOne = (googleID, callback) => {
  db.one({
    name: 'find-user',
    text: 'select * from users where google_id = $1',
    values: [googleID],
  })
    .then(callback)
    .catch(callback);
};

// Create a user with attributes inside the userObj, find a user if user already exists
const findOrCreateUser = (userObj, callback) => {
  const avatar = userObj.photos.length > 0 ? userObj.photos[0].value.slice(0, userObj.photos[0].value.length - 6) : '';
  const queryObj = {
    name: 'insert-user',
    text: 'insert into users(google_id, display_name, avatar) values ($1, $2, $3) returning *',
    values: [userObj.id, userObj.displayName, avatar],
  };

  db.one(queryObj)
    .then(callback)
    .catch((error) => {
      if (error.code === '23505' || error.code === '23502') {
        findOne(userObj.googleID, callback);
      } else {
        callback(new Error(`Error code: ${error.code}, Error message: ${error.detail}`));
      }
    });
};

const handleUserData = (error, user) => {
  if (error) {
    return error;
  }
  return user;
};

passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  findOrCreateUser(profile, handleUserData);
  return done(null, profile);
}));
