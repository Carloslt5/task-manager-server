import { Request, Response } from 'express';
import { signupTestData } from '../../constants/mockUserData';
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

describe('Signup function', () => {
  it('Sing up User and return status 201', async () => {
    const req = { body: signupTestData } as Request;
    await signup(req, res, next);

    expect(usermodel.signup).toHaveBeenCalledTimes(1);
    expect(usermodel.signup).toHaveBeenCalledWith(signupTestData);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: true, message: 'User created' });
    expect(next).not.toHaveBeenCalled();
  });
  it('User create failed and return status 404', async () => {
    const req = {} as Request;
    (usermodel.signup as jest.Mock) = jest.fn(() => Promise.resolve({ rowCount: 0 }));

    await signup(req, res, next);
    expect(usermodel.signup).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ status: false, message: 'Can not create user' });
    expect(next).not.toHaveBeenCalled();
  });
});
