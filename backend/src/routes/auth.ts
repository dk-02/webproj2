import express from 'express';
import { login } from '../../controllers/authControllers';
import asyncErrorHandler from '../../utils/asyncErrorHandler';
import { register } from '../../controllers/authControllers';
// import { authenticateToken } from '../../middleware/authenticateToken';

const router = express.Router();

router.post('/login', asyncErrorHandler(login));
router.post('/register', asyncErrorHandler(register));

export default router;
