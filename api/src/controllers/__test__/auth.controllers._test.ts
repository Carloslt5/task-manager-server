// import { StatusError, login, signup } from './auth.controllers';
// import User from '../models/User.model';

// beforeEach(() => {
//   jest.clearAllMocks();
// });

// jest.mock('../models/User.model');

// const req: any = {
//   body: {},
// };

// const res: any = {
//   status: jest.fn().mockReturnThis(),
//   json: jest.fn(),
// };

// const next = jest.fn();

// describe('POST signup function', () => {
//   const signupTestData = {
//     firstName: 'First  Name Test',
//     lastName: 'Last Name Test',
//     email: 'test@email.com',
//     password: 'password123',
//   };

//   beforeEach(() => {
//     req.body = signupTestData;
//   });

//   const mockUser = { _id: 'someUserId', ...signupTestData };

//   it('should successfully create a new user and respond with status 201', async () => {
//     (User.create as jest.Mock).mockResolvedValue(mockUser);

//     await signup(req, res, next);
//     expect(User.create).toHaveBeenCalledWith(signupTestData);
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(mockUser);
//     expect(next).not.toHaveBeenCalled();
//   });

//   it('should handle an error when user creation returns null', async () => {
//     (User.create as jest.Mock).mockResolvedValue(null);

//     await signup(req, res, next);
//     expect(User.create).toHaveBeenCalledWith(signupTestData);
//     expect(next).toHaveBeenCalledWith(new StatusError('Error: Unable to create user', 422));
//   });
// });

// describe('POST login function', () => {
//   const loginTestData = {
//     email: 'test@email.com',
//     password: 'password123',
//   };

//   beforeEach(() => {
//     req.body = loginTestData;
//   });

//   it('should successfully log in and respond with status 200', async () => {
//     (User.findOne as jest.Mock).mockResolvedValue({
//       validatePassword: jest.fn().mockReturnValue(true),
//       signToken: jest.fn().mockReturnValue('fakeAuthToken'),
//     });

//     await login(req, res, next);
//     expect(User.findOne).toHaveBeenCalledWith({ email: loginTestData.email });
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({ authToken: 'fakeAuthToken' });
//     expect(next).not.toHaveBeenCalled();
//   });

//   it('should handle USER NOT FOUND and respond with status 401', async () => {
//     (User.findOne as jest.Mock).mockResolvedValue(null);

//     await login(req, res, next);
//     expect(User.findOne).toHaveBeenCalledWith({ email: loginTestData.email });
//     expect(next).toHaveBeenCalledWith(new StatusError('User not found', 401));
//   });

//   it('should handle INCORRECT PASSWORD and respond with status 401', async () => {
//     (User.findOne as jest.Mock).mockResolvedValue({
//       validatePassword: jest.fn().mockReturnValue(false),
//     });

//     await login(req, res, next);
//     expect(User.findOne).toHaveBeenCalledWith({ email: loginTestData.email });
//     expect(next).toHaveBeenCalledWith(new StatusError('Password incorrect', 401));
//   });
// });
