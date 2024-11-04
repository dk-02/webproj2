import pool from '../db/db';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET environment variable.');
}

export const login = async (req : Request, res : Response) => {
    const { username, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE username = $1';
        const values = [username];
        
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        } 

        const user = result.rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const tkn = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', tkn });

    } catch (error) {
        console.error('Database error', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const register = async (req: Request, res: Response) => {
    const { username, password, email, secure } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const userExists = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);

        if(userExists.rows.length > 0) {
            const existingUser = userExists.rows[0];

            if(existingUser.username === username) {
                return res.status(409).json({ message: 'Username already exists.' });
            } else if(existingUser.email === email) {
                return res.status(409).json({ message: 'Email already in use.' });
            }
        }

        if(secure) {
            const hashedPass = await bcrypt.hash(password, 10);
            await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, hashedPass, email]);
        } else {
            await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, password, email]);
        }

        return res.status(201).json({ message: 'User registered successfully.' });

    } catch (err) {
        console.error('Database error', err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}