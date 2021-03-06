import express from 'express';
import validate from 'express-validation';

import controller from '../../controllers/user.controller';
import { authorize, ADMIN, LOGGED_USER } from '../../middlewares/auth';
import {
  listUsers,
  createUser,
  replaceUser,
  updateUser,
} from '../../validations/user.validation';

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

router
  .route('/')
  // GET- v1/users List Users
  .get(authorize(ADMIN), validate(listUsers), controller.list)

  // POST- v1/users Create User
  .post(authorize(ADMIN), validate(createUser), controller.create);

router
  .route('/profile')
  // GET- v1/users/profile User Profile
  .get(authorize(), controller.loggedIn);

router
  .route('/:userId')
  // GET- v1/users/:id Get User
  .get(authorize(LOGGED_USER), controller.get)

  //  PUT- v1/users/:id Replace User
  .put(authorize(LOGGED_USER), validate(replaceUser), controller.replace)
  
   // PATCH- v1/users/:id Update User
  .patch(authorize(LOGGED_USER), validate(updateUser), controller.update)
  
   // PATCH- v1/users/:id Delete User
  .delete(authorize(LOGGED_USER), controller.remove);


export default router;
