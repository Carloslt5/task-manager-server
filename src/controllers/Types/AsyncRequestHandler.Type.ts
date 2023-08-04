import { type Request, type Response, type NextFunction } from 'express'

export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>
