import express from 'express';

const router = express.Router();
import {
  createNewEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from '../controllers/employeesController.js';

import verifyJWT from '../middleware/verifyJWT.js';

router.use(verifyJWT);

router
  .route('/')
  .get(getAllEmployees)
  .post(createNewEmployee)
  .delete(deleteEmployee)
  .patch(updateEmployee);
router.route('/:id');

export default router;
