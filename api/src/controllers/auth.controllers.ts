// import User from '../models/User.model'
import { RequestHandler } from 'express';
import { usermodel } from '../models/postgre-sql/user';
import { UserNotID } from '../schemas/user.type';

export class StatusError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'StatusError';
    this.statusCode = statusCode;
  }
}

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

// const login = async (
//   req: PayloadRequest<unknown, unknown, LoginDataType>,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   const { email, password } = req.body;

//   try {
//     const foundUser = await usermodel.findOne({ email });
//     if (foundUser === null) {
//       throw new StatusError('User not found', 401);
//     }

//     if (foundUser.validatePassword(password)) {
//       const authToken = foundUser.signToken();
//       res.status(200).json({ authToken });
//     } else {
//       throw new StatusError('Password incorrect', 401);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// const verify = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     res.status(200).json(req.payload)
//   } catch (error) {
//     next(error)
//   }
// }
