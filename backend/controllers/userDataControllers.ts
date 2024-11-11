import { Request, Response } from 'express';
import pool from '../db/db'; 


export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    
    try {
        const result = await pool.query('SELECT id, username, password, email, created_at FROM users WHERE id = $1', [userId]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching usersss' });
    }
};


export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM users');

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'No users found' });
            return;
        }

        res.json(result.rows);
    } catch (error) {
        console.log("Db err", error);
        res.status(500).json({ error: 'Error fetching users' });
    }
};
