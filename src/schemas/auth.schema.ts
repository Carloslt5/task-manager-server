import { z } from 'zod'

export const signUpSchema = z.object({
  body: z.object({
    firstName: z.string().min(3, 'Name requires a minimum of 3 characters'),
    lastName: z.string().min(3, 'Last Name requires a minimum of 3 characters'),
    email: z.string().email('This is not a valid email'),
    password: z.string().min(4, 'Password requires a minimum of 4 characters')
  })
})

export type SignUpDataType = z.infer<typeof signUpSchema>['body']
