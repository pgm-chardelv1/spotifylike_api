/**
 * Authentication middleware
 */

// Imports
import passport from 'passport';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';
import {
  logger
} from '../../services/logger.js';

// Initialize dotenv
dotenv.config();

// Initialize passport
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// Define options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

// Use passport
passport.use(
  new JwtStrategy(opts, async (jwtData, done) => {
    try {
      logger.log({
        level: 'info',
        message: `${jwtData.username} does an authenticated request. Admin: ${!!jwtData.is_admin === true}.`,
        label: 'auth'
      })
      return done(null, jwtData);
    } catch (e) {
      done(null, e);
    }
  })
);

export const isUserAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', {
    session: false
  }, (error, user, info) => {
    // If there is an error or no user do not authorize
    if (error || !user) {
      logger.log({
        level: 'error',
        message: info,
        label: 'auth'
      });
      res.status(401).send(info);
    } else {
      next();
    }
  })(req, res, next);
};

export const isAdminAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', {
    session: false
  }, (error, user, info) => {

    // If there is an error, or no user or
    // user is not an admin do not authorize
    if (error || !user || !!user.is_admin === false) {
      logger.log({
        level: 'error',
        message: `${info}. ${user.username} is not an admin.`,
        label: 'admin'
      });
      res.status(401).send(`Error: User ${user.username} is not authorized to make this request.`);
    } else {
      next();
    }
  })(req, res, next);
};

export const isUserAuthorizedToView = (req, res, next) => {
  passport.authenticate('jwt', {
    session: false
  }, (error, user, info) => {
    // If there is an error, or no user or
    // params has a user id which does not equal user id and is not an admin or
    // params has a username which does not equal user username and is not an admin do not authorize
    if (
      error || 
      !user || 
        (
          req.params.userId && 
          req.params.userId !== user.id && 
          user.is_admin !== 1
        ) || 
        (
          req.params.username && 
          req.params.username !== user.username && 
          user.is_admin !== 1
        )
      ) {
      logger.log({
        level: 'error',
        message: `User ${user.username} is not authorized to make this request.`,
        label: 'auth'
      });
      res.status(401).send(`Error: User ${user.username} is not authorized to make this request.`);
    }
    next()
  })(req, res, next);
}
