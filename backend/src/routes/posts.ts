import express from 'express';
import { getPosts, createPost, getPostById } from '../../controllers/postsControllers';

const router = express.Router();

router.get('/getAll', getPosts);
router.post('/newPost', createPost);
router.get('/:postId', getPostById);


export default router;
