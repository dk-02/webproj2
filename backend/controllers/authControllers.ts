import pool from '../db/db';
import { Request, Response } from 'express';

export const login = async (req : Request, res : Response) => {
    const { username, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const values = [username, password];
        
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Database error', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}