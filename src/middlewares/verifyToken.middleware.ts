import { type NextFunction, type Request } from 'express'
import { expressjwt, type TokenGetter } from 'express-jwt'
import { type Secret } from 'jsonwebtoken'

const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET as Secret,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders as TokenGetter
})

function getTokenFromHeaders(req: Request, next: NextFunction): string | undefined {
  try {
    if (req?.headers?.authorization?.split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1]
      return token
    }
  } catch (error) {
    next(error)
  }
}

export { isAuthenticated }
