import { type Response, type NextFunction } from 'express'
import { type CustomRequest } from '../../middlewares/verifyToken.middleware'

export type AsyncRequestHandler = (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>
