import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app'
import { connect } from '../db'
import User from '../models/User.model'

beforeEach(async () => {
  await connect()
})

afterAll(async () => {
  await mongoose.disconnect()
})

describe('POST /api/auth/signup', () => {
  afterEach(async () => {
    await User.deleteMany({ email: 'test@email.com' })
  })

  const userTestData = {
    firstName: 'First NAme test',
    lastName: 'Last Name test',
    email: 'test@email.com',
    password: 'testPassword'
  }

  test('should return 201', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send(userTestData)

    expect(response.status).toBe(201)
    expect(response.headers['content-type']).toContain('json')
  })

  test('generate New User', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send(userTestData)

    expect(response.body._id).toBeDefined()
    expect(response.body.email).toBe(userTestData.email)
  })
})
