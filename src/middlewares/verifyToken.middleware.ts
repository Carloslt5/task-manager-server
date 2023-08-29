import { type TokenGetter, expressjwt } from 'express-jwt'
import { type Response, type Request, type NextFunction } from 'express'
import { type Secret } from 'jsonwebtoken'

export const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET as Secret,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders as TokenGetter
})

async function getTokenFromHeaders(req: Request, res: Response, next: NextFunction): Promise<string | undefined> {
  if (req.headers.authorization === undefined) {
    res.status(401).json('Please authenticate')
    return
  }
  if (req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1]
    return token
  }
  res.status(401).json('Please authenticate')
}
