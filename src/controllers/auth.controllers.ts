import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { type RequestHandler } from 'express'
import { type AsyncRequestHandler } from './Types/AsyncRequestHandler.Type'
import User from '../models/User.model'

const signup: AsyncRequestHandler = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body

  try {
    await User.create({ firstName, lastName, email, password })
    res.status(201).json({ message: 'User created' })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

const login: AsyncRequestHandler = async (req, res, next) => {
  const { email, password } = req.body

  if (email === '' || password === '') {
    res.status(400).json({ errorMessages: ['Provide email and password.'] })
  }

  try {
    const foundUser = await User.findOne({ email })

    if (foundUser == null) {
      res.status(401).json({ errorMessages: ['User not found.'] })
      return
    }

    if (bcrypt.compareSync(password, foundUser.password)) {
      const { _id, firstName, lastName } = foundUser

      const payload = { _id, firstName, lastName }

      const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET as string,
        { algorithm: 'HS256', expiresIn: '6h' }
      )

      res.status(201).json({ authToken })
    } else {
      res.status(401).json({ errorMessages: ['Unable to authenticate the user'] })
    }
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

const verify: RequestHandler = (req, res, next) => {
  res.json('All good verify')
}

export {
  signup,
  login,
  verify
}
