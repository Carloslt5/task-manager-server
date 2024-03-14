import { mockAuthToken, mockClient } from '../../../constants/mockUserData';
import { UserNotID } from '../../../schemas/user.type';

export const usermodel = {
  signup: jest.fn().mockImplementation((input: UserNotID) => {
    if (input) {
      const id = crypto.randomUUID();
      const newUser = { id, ...input };
      return { rowCount: 1, rows: newUser };
    } else {
      return { rowCount: 0, rows: [] };
    }
  }),
  findOne: jest.fn().mockImplementation(({ email }: { email: string }) => {
    const user = mockClient.find((client) => client.email === email);
    if (user) {
      return { rowCount: 1, rows: [user] };
    } else {
      return { rowCount: 0, rows: [] };
    }
  }),
  validatePassword: jest.fn().mockImplementation((password: string, inputPassword: string) => {
    if (password === inputPassword) {
      return true;
    } else {
      return false;
    }
  }),
  signToken: jest.fn().mockImplementation(() => {
    return mockAuthToken;
  }),
};
