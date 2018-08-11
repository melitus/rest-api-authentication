import BearerStrategy from 'passport-http-bearer';
import { ExtractJwt } from 'passport-jwt';

import { jwtSecret } from './vars';
import authProviders from '../services/authProviders';
import User from '../models/user.model';
import config from '../config/config';


const JwtStrategy = require('passport-jwt').Strategy;
const getsecret = config.get('authentication.token.secret')
const jwtOptions = {
  secretOrKey: getsecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwts = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

const oAuth = service => async (token, done) => {
  try {
    const userData = await authProviders[service](token);
    const user = await User.oAuthLogin(userData);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

export const jwt = new JwtStrategy(jwtOptions, jwts);
export const facebook = new BearerStrategy(oAuth('facebook'));
export const google = new BearerStrategy(oAuth('google'));
