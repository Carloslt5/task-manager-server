import { type TokenGetter, expressjwt, type Request } from 'express-jwt'
import { type Response } from 'express'
import { type Secret } from 'jsonwebtoken'

export const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET as Secret,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders as TokenGetter
})

async function getTokenFromHeaders(req: Request, res: Response): Promise<string | null> {
  if (req.headers.authorization === undefined) {
    return ''
  }

  if (req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1]
    return token
  }

  return ''
}
