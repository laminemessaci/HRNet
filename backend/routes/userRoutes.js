import express from 'express';

import verifyJWT from '../middleware/verifyJWT.js';
import {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} from '../controllers/usersController.js';

const router = express.Router();
router.use(verifyJWT);

router
  .route('/')
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
