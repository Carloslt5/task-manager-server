import { z } from 'zod';

const userProperties = {
  firstName: z.string().min(3, 'Name requires a minimum of 3 characters').trim(),
  lastName: z.string().min(3, 'Last Name requires a minimum of 3 characters').trim(),
  email: z.string().email('This is not a valid email').trim(),
  password: z.string().min(4, 'Password requires a minimum of 4 characters').trim(),
};

export const SignupDataType = z.object({
  body: z.object({
    ...userProperties,
  }),
});

export const LoginDataType = z.object({
  body: z.object({
    email: userProperties.email,
    password: userProperties.password,
  }),
});
