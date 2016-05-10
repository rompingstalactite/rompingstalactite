import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';

module.exports = (app, express) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser('githubForRecipes'));
  app.use(passport.initialize());
  app.use(session());
  app.use(passport.session());
  app.use(express.static(`${__dirname}/../../client`));
};
