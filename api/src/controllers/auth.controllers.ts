import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HTTPError } from '../error-handling/HTTPError';
import { UserNotID } from '../interfaces/user.type';
import { usermodel } from '../models/postgre-sql/user';

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
    } else {
      const user = data.rows[0];
      if (user && (await usermodel.validatePassword(password, user.password))) {
        const authToken = await usermodel.signToken(user);
        res.status(200).json({ authToken });
      } else {
        throw new HTTPError(400, 'Password incorrect');
      }
    }
  } catch (error) {
    next(error);
  }
};

export const verify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json(req.payload);
  } catch (error) {
    next(error);
  }
};
