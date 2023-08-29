import { type Response, type NextFunction, type Request } from 'express'

export interface PayloadRequest<T> extends Request {
  payload?: T
}

export type AsyncRequestHandler<T> = (req: PayloadRequest<T>, res: Response, next: NextFunction) => Promise<void>
