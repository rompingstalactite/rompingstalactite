import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
const googleClientId = process.env.GOOGLE_CLIENT_ID || require('../keys/googleAuth').CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || require('../keys/googleAuth').CLIENT_SECRET;

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

passport.use(new Strategy({
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  return done();
  // User
  //   .findOrCreate({
  //     where: {
  //       googleUserId: profile.id
  //     },
  //     defaults: {
  //       firstName: profile.name.givenName,
  //       lastName: profile.name.familyName
  //     }
  //   })
  //   .spread(function(user, created) {
  //     console.log('User data returned from User.findOrCreate: ', user.get({
  //       plain: true
  //     }));
  //     console.log('New User Created? (t/f): ', created);
  //   });
  // return done(null, profile);
}));
