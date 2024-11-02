import express from 'express';
import { login } from '../../controllers/authControllers';
import asyncErrorHandler from '../../utils/asyncErrorHandler';

const router = express.Router();

router.post('/login', asyncErrorHandler(login));


export default router;
