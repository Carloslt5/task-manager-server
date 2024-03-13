// import User from '../models/User.model'
import { NextFunction, RequestHandler, Response } from 'express';
import { HTTPError } from '../error-handling/HTTPError';
import { PayloadRequest } from '../middlewares/verifyToken.middleware';
import { usermodel } from '../models/postgre-sql/user';
import { UserNotID } from '../schemas/user.type';

// export class StatusError extends Error {
//   statusCode: number;
//   constructor(message: string, statusCode: number) {
//     super(message);
//     this.name = 'StatusError';
//     this.statusCode = statusCode;
//   }
// }

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const input: UserNotID = req.body;
    const data = await usermodel.signup(input);
    data.rowCount === 0
      ? res.status(404).json({ status: false, message: 'Can not create user' })
      : res.status(200).json({ status: true, message: 'User created' });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await usermodel.findOne({ email });
    if (data.rowCount === 0) {
      throw new HTTPError(401, 'User not found');
    }

    const user = data.rows[0];
    if (user && (await usermodel.validatePassword(password, user.password))) {
      const authToken = await usermodel.signToken(user);
      res.status(200).json({ authToken });
    } else {
      throw new HTTPError(400, 'Password incorrect');
    }
  } catch (error) {
    next(error);
  }
};

export const verify = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json(req.payload);
  } catch (error) {
    next(error);
  }
};
