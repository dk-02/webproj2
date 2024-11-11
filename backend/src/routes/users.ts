import express from 'express';
import { getUserById, getAllUsers } from '../../controllers/userDataControllers';

const router = express.Router();

router.get('/getAll', getAllUsers);
router.get('/:userId', getUserById);

export default router;
