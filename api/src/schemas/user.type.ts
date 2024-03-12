import { z } from 'zod';

const userID = {
  id: z.string(),
};
const userProperties = {
  firstName: z.string().min(3, 'Name requires a minimum of 3 characters').trim(),
  lastName: z.string().min(3, 'Last Name requires a minimum of 3 characters').trim(),
  email: z.string().email('This is not a valid email').trim(),
  password: z.string().min(4, 'Password requires a minimum of 4 characters').trim(),
};

export const CreateUser = z.object({
  body: z.object({
    ...userProperties,
  }),
});

const UserSchema = z.object({ ...userID, ...userProperties });
export type User = z.infer<typeof UserSchema>;
export type UserID = z.infer<typeof UserSchema>['id'];
export type UserNotID = Omit<User, 'id'>;
