import { type RequestHandler } from 'express'

const signup: RequestHandler = (req, res, next) => {
  res.json('All good signup')
}

const login: RequestHandler = (req, res, next) => {
  res.json('All good login')
}
const verify: RequestHandler = (req, res, next) => {
  res.json('All good verify')
}

export {
  signup,
  login,
  verify
}
