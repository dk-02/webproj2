import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET environment variable.');
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) : void => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    } 

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        } 

        (req as any).user = user;
        next();
    });
};
