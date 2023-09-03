import { type Request, type Response, type NextFunction } from 'express'
import jwt, { type JwtPayload, type Secret } from 'jsonwebtoken'

export const SECRET_KEY: Secret = process.env.TOKEN_SECRET as string

export interface CustomRequest extends Request {
  payload?: string | JwtPayload
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<undefined> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (token == null) {
      res.status(401).json({ error: 'No token provided' })
      return
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).payload = decoded

    next()
  } catch (err) {
    next(err)
  }
}
