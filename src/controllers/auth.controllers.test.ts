import { StatusError, login, signup } from './auth.controllers'
import User from '../models/User.model'

beforeEach(() => {
  jest.clearAllMocks()
})

jest.mock('../models/User.model')

const req = {
  body: {}
}

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
}

const next = jest.fn()

describe('POST signup function', () => {
  const signupTestData = {
    firstName: 'First  Name Test',
    lastName: 'Last Name Test',
    email: 'test@email.com',
    password: 'password123'
  }

  beforeEach(() => {
    req.body = signupTestData
  })

  it('should successfully create a new user and respond with status 201', async () => {
    const mockUser = { _id: 'someUserId', ...signupTestData };
    (User.create as jest.Mock).mockResolvedValue(mockUser)
    await signup(req as any, res as any, next)

    expect(User.create).toHaveBeenCalledWith(signupTestData)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(mockUser)
    expect(next).not.toHaveBeenCalled()
  })

  it('should handle an error when user creation returns null', async () => {
    (User.create as jest.Mock).mockResolvedValue(null)
    await signup(req as any, res as any, next)

    expect(User.create).toHaveBeenCalledWith(signupTestData)
    expect(next).toHaveBeenCalledWith(new StatusError('Error: Unable to create user', 422))
  })
})

describe('POST login function', () => {
  const loginTestData = {
    email: 'test@email.com',
    password: 'password123'
  }

  beforeEach(() => {
    req.body = loginTestData
  })

  it('should successfully log in and respond with status 200', async () => {
    (User.findOne as jest.Mock).mockResolvedValue({
      validatePassword: jest.fn().mockReturnValue(true),
      signToken: jest.fn().mockReturnValue('fakeAuthToken')
    })

    await login(req as any, res as any, next)

    expect(User.findOne).toHaveBeenCalledWith({ email: loginTestData.email })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ authToken: 'fakeAuthToken' })
    expect(next).not.toHaveBeenCalled()
  })
})
