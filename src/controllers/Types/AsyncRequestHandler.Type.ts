import { type NextFunction, type Response } from 'express'

export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>
