import { type RequestHandler } from 'express'
import User, { type UserPayload } from '../models/User.model'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'

const signup: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body

  try {
    await User.create({ firstName, lastName, email, password })
    res.status(201).json({ message: 'User created' })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body

  if (email === '' || password === '') {
    res.status(400).json({ errorMessages: ['Provide email and password.'] })
  }

  try {
    const foundUser = await User.findOne({ email })

    if (foundUser === null) {
      res.status(401).json({ errorMessages: ['User not found.'] })
      return
    }

    if (foundUser.validatePassword(password)) {
      const authToken = foundUser.signToken()
      res.status(200).json({ authToken })
    } else {
      res.status(401).json({ errorMessages: ['Unable to authenticate the user'] })
    }
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

const verify: AsyncRequestHandler<UserPayload> = async (req, res, next) => {
  if (req.payload !== null) {
    res.status(200).json(req.payload)
  }

  res.status(401)
}

export {
  signup,
  login,
  verify
}
