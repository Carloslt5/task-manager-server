import { UserNotID } from '../../../schemas/user.type';

export const usermodel = {
  signup: jest.fn().mockImplementation(({ input }: { input: UserNotID }) => {
    const id = crypto.randomUUID();
    const newUser = { id, ...input };
    return { rows: newUser };
  }),
};
