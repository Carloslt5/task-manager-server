import { type Request, type Response } from 'express'
import { testController } from './auth.controllers'

describe('Test de la función "test"', () => {
  test('debería devolver un objeto JSON con un mensaje "todo ok" y un estado 200', () => {
    const req: Request = {}
    const res: Response = {
      status: jest.fn(),
      json: jest.fn()
    }

    testController(req, res)
    expect(res.json).toEqual({ message: 'todo ok' })
  })
})
