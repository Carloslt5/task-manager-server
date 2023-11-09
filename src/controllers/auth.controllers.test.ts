import { StatusError, signup } from './auth.controllers'
import User from '../models/User.model'

const mockUserTestData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'password123'
}

const req = {
  body: mockUserTestData
}

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
}

const next = jest.fn()

jest.mock('../models/User.model')

describe('signup function', () => {
  it('should create a new user and respond with 201 status code', async () => {
    await signup(req as any, res as any, next)

    expect(User.create).toHaveBeenCalledWith(mockUserTestData)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(next).not.toHaveBeenCalled()
  })

  it('should handle error when user creation returns null', async () => {
    (User.create as jest.Mock).mockResolvedValue(null)
    await signup(req as any, res as any, next)

    expect(User.create).toHaveBeenCalledWith(mockUserTestData)
    expect(next).toHaveBeenCalledWith(new StatusError('Error: Unable to create user', 422))
  })
})
