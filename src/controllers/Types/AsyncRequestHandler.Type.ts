import { type Request } from 'express'
import { type ParamsDictionary, type Query } from 'express-serve-static-core'
import { type UserPayload } from '../../models/User.model'

export type PayloadRequest<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query
> = Request<P, ResBody, ReqBody, ReqQuery> & {
  payload?: UserPayload
}
