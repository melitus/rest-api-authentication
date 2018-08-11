import express from 'express';
import validate from 'express-validation';

import controller from '../../controllers/auth.controller';
import {
  login,
  register,
  oAuth,
  refresh,
} from '../../validations/auth.validation';

const oAuthLogin = require('../../middlewares/auth').oAuth;
const router = express.Router();

// POST- v1/auth/register Register
router.route('/register')
  .post(validate(register), controller.register);

// POST- v1/auth/login Login
router.route('/login')
  .post(validate(login), controller.login);

// POST- v1/auth/refresh-token Refresh Token
router.route('/refresh-token')
  .post(validate(refresh), controller.refresh);

// TODO: POST /v1/auth/reset-password
 
// POST- v1/auth/facebook Facebook Login
router.route('/facebook')
  .post(validate(oAuth), oAuthLogin('facebook'), controller.oAuth);

// POST- v1/auth/google Google Login
router.route('/google')
  .post(validate(oAuth), oAuthLogin('google'), controller.oAuth);


export default router;
