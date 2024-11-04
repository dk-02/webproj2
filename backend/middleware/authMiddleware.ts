import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET environment variable.');
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        (req as any).user = user;
        next();
    });
};
