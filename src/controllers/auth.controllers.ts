import User, { type UserPayload } from '../models/User.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

export class StatusError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'StatusError'
    this.statusCode = statusCode
  }
}

const signup: AsyncRequestHandler = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body
  console.log('en el endpoint')
  // try {
  //   await User.create({ firstName, lastName, email, password })
  //   res.status(201).json({ message: 'User created' })
  // } catch (error) {
  //   next(new StatusError('Bad request. Please check your input data', 400))
  // }
}

const login: AsyncRequestHandler = async (req, res, next) => {
  const { email, password } = req.body

  try {
    if (email === '' || password === '') {
      throw new StatusError('Provide email and password', 401)
    }

    const foundUser = await User.findOne({ email })
    if (foundUser === null) {
      throw new StatusError('User not found', 401)
    }

    if (foundUser.validatePassword(password)) {
      const authToken = foundUser.signToken()
      res.status(200).json({ authToken })
    } else {
      throw new StatusError('Unable to authenticate the user', 401)
    }
  } catch (error) {
    next(error)
  }
}

const verify: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  try {
    res.status(200).json(req.payload)
  } catch (error) {
    next(error)
  }
}

export {
  signup,
  login,
  verify
}
