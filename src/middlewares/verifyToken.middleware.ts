import { type Request } from 'express'
import { expressjwt } from 'express-jwt'
import { type Secret } from 'jsonwebtoken'

const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET as Secret,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders
})

function getTokenFromHeaders(req: Request): string | undefined {
  if (req?.headers?.authorization?.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1]
    return token
  }
}

export { isAuthenticated }
