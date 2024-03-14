import { Request, Response } from 'express';
import {
  loginDataSuccess,
  loginEmailError,
  loginPasswordError,
  mockAuthToken,
  signupTestData,
} from '../../constants/mockUserData';
import { HTTPError } from '../../error-handling/HTTPError';
import { usermodel } from '../../models/postgre-sql/user';
import { login, signup } from '../auth.controllers';
afterEach(() => jest.clearAllMocks());

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
  afterEach(() => jest.clearAllMocks());

  it('Sing up User and return status 200', async () => {
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
    await signup(req, res, next);
    expect(usermodel.signup).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ status: false, message: 'Can not create user' });
    expect(next).not.toHaveBeenCalled();
  });
});

describe('Login function', () => {
  afterEach(() => jest.clearAllMocks());

  it('Login user and return 200', async () => {
    const req = { body: loginDataSuccess } as Request;
    await login(req, res, next);
    expect(usermodel.findOne).toHaveBeenCalledTimes(1);
    expect(usermodel.findOne).toHaveBeenCalledWith({ email: loginDataSuccess.email });
    expect(usermodel.validatePassword).toHaveBeenCalledTimes(1);
    expect(usermodel.signToken).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ authToken: mockAuthToken });
    expect(next).not.toHaveBeenCalled();
  });

  it('Login user not found', async () => {
    const req = { body: loginEmailError } as Request;
    await login(req, res, next);
    expect(usermodel.findOne).toHaveBeenCalledTimes(1);
    expect(usermodel.findOne).toHaveBeenCalledWith({ email: loginEmailError.email });
    expect(usermodel.validatePassword).not.toHaveBeenCalledTimes(1);
    expect(usermodel.signToken).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new HTTPError(401, 'User not found'));
  });

  it('Login user with incorrect password', async () => {
    const req = { body: loginPasswordError } as Request;
    await login(req, res, next);
    expect(usermodel.findOne).toHaveBeenCalledTimes(1);
    expect(usermodel.findOne).toHaveBeenCalledWith({ email: loginPasswordError.email });
    expect(usermodel.validatePassword).toHaveBeenCalledTimes(1);
    expect(usermodel.signToken).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new HTTPError(400, 'Password incorrect'));
  });
});
