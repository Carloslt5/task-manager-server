import { type Response, type NextFunction, type Request } from 'express'

export interface ReqPayload {
  _id: string
  firstName: string
  lastName: string
}

export interface CustomRequest extends Request {
  payload?: ReqPayload
}

export type AsyncRequestHandler = (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>
