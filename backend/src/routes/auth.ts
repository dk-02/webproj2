import express from 'express';
import { checkAuth, login } from '../../controllers/authControllers';
import asyncErrorHandler from '../../utils/asyncErrorHandler';
import { register } from '../../controllers/authControllers';
import { authenticateToken } from '../../middleware/authMiddleware';

const router = express.Router();

router.post('/login', asyncErrorHandler(login));
router.post('/register', asyncErrorHandler(register));
router.get('/check', authenticateToken, checkAuth);

export default router;
