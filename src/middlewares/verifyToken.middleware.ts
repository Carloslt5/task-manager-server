import { type TokenGetter, expressjwt, type Request } from 'express-jwt'
import { type Response } from 'express'

export const isAuthenticated = expressjwt({
  secret: () => {
    console.log(process.env)
    return process.env.TOKEN_SECRET as string
  },
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders as TokenGetter
})

async function getTokenFromHeaders(req: Request, res: Response): Promise<string | null> {
  if (req.headers.authorization === undefined) {
    return null
  }

  if (req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1]
    return token
  }

  return null
}
