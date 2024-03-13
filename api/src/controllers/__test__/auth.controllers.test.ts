import { Request, Response } from 'express';
import { usermodel } from '../../models/postgre-sql/user';
import { signup } from '../auth.controllers';

jest.mock('../../models/postgre-sql/user');

const res = {} as Response;
const next = jest.fn();

beforeEach(() => {
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
});
afterEach(() => {
  jest.clearAllMocks();
});

const signupTestData = {
  firstName: 'First  Name Test',
  lastName: 'Last Name Test',
  email: 'test@email.com',
  password: 'password123',
};

describe('User controller, success request', () => {
  it('Create User and status 201', async () => {
    const req = { body: signupTestData } as Request;
    await signup(req, res, next);

    expect(usermodel.signup).toHaveBeenCalledTimes(1);
    expect(usermodel.signup).toHaveBeenCalledWith(signupTestData);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: true, message: 'User created' });
    expect(next).not.toHaveBeenCalled();
  });
});
