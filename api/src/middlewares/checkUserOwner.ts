import { Request, type NextFunction, type Response } from 'express';
import { usermodel } from '../models/postgre-sql/user';

const checkUserOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.payload!.id;
  const { id: profileId } = req.params;

  if (typeof userId === 'string' && typeof profileId === 'string') {
    try {
      const count = await usermodel.checkOwnerForUser(userId, profileId);
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
