import { type NextFunction, type Response } from 'express';
import User from '../models/User.model';
import { type PayloadRequest } from './verifyToken.middleware';

const checkUserOwner = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.payload?._id;
  const { id: profileId } = req.params;

  if (typeof userId === 'string' && typeof profileId === 'string') {
    try {
      const count = await User.checkOwnerForUser(userId, profileId);
      if (count > 0) {
        next();
      } else {
        res.status(401).json({ messages: ['No eres el dueño de este perfil'] });
      }
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).json({ messages: ['Parámetros inválidos'] });
  }
};

export { checkUserOwner };
