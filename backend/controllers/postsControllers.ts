import pool from '../db/db';
import { Request, Response } from 'express';


export const getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await pool.query('SELECT id, title, user_id, created_at FROM posts');
        res.json(posts.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
};


export const createPost = async (req: Request, res: Response): Promise<void> => {
    const { title, content, user_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO posts (title, content, user_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
            [title, content, user_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error creating post' });
    }
};


export const getPostById = async (req: Request, res: Response): Promise<void> => {
    const { postId } = req.params;
    try {
        const post = await pool.query('SELECT content FROM posts WHERE id = $1', [postId]);

        if (post.rows.length === 0) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }

        res.json(post.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching post' });
    }
};