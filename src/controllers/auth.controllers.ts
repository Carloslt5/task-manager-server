import { type NextFunction, type Request, type Response } from 'express'
import User from '../models/User.model'
import { type LoginDataType, type SignUpDataType } from '../schemas/auth.schema'
import { type PayloadRequest } from './Types/AsyncRequestHandler.Type'

export class StatusError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'StatusError'
    this.statusCode = statusCode
  }
}

const signup = async (req: Request<unknown, unknown, SignUpDataType>, res: Response, next: NextFunction): Promise<void> => {
  const { firstName, lastName, email, password } = req.body

  try {
    const createUser = await User.create({ firstName, lastName, email, password })
    if (createUser === null) {
      throw new StatusError('Error: Unable to create user', 422)
    } else {
      res.status(201).json({ message: 'User created' })
    }
  } catch (error) {
    next(error)
  }
}

const login = async (req: Request<unknown, unknown, LoginDataType>, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body

  try {
    const foundUser = await User.findOne({ email })
    if (foundUser === null) {
      throw new StatusError('User not found', 401)
    }

    if (foundUser.validatePassword(password)) {
      const authToken = foundUser.signToken()
      res.status(200).json({ authToken })
    } else {
      throw new StatusError('Password incorrect', 401)
    }
  } catch (error) {
    next(error)
  }
}

const verify = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
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
