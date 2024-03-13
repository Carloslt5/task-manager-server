import { type Request } from 'express';
import { expressjwt, type TokenGetter } from 'express-jwt';
import { type ParamsDictionary, type Query } from 'express-serve-static-core';
import { type Secret } from 'jsonwebtoken';
import { type UserPayload } from '../models/User.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PayloadRequest<P = ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = Query> = Request<
  P,
  ResBody,
  ReqBody,
  ReqQuery
> & {
  payload?: UserPayload;
};

const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET ?? ('secret' as Secret),
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders as TokenGetter,
});

function getTokenFromHeaders(req: Request): string | undefined | null {
  if (req?.headers?.authorization?.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }
  return null;
}

export { isAuthenticated };
