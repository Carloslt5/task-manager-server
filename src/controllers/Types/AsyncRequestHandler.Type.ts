import { type Response, type NextFunction, type Request } from 'express'
import { type JwtPayload } from 'jsonwebtoken'

interface CustomeRequest extends Request {
  payload?: JwtPayload
}

export type AsyncRequestHandler = (req: CustomeRequest, res: Response, next: NextFunction) => Promise<void>
