import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from 'src/interfaces/user.type';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.TOKEN_SECRET || 'secret', (err, user) => {
    if (err) return res.status(403).json([{ message: 'Forbidden' }]);
    req.payload = user as UserPayload;
    next();
  });
};
