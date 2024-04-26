import { UserPayload } from 'src/interfaces/user.type';

declare global {
  namespace Express {
    interface Request {
      payload: UserPayload;
    }
  }
}
