import { z } from 'zod'

export const signUpSchema = z.object({
  body: z.object({
    firstName: z.string().min(3, 'Name requires a minimum of 3 characters').trim(),
    lastName: z.string().min(3, 'Last Name requires a minimum of 3 characters').trim(),
    email: z.string().email('This is not a valid email').trim(),
    password: z.string().min(4, 'Password requires a minimum of 4 characters').trim()
  })
})
export type SignUpDataType = z.infer<typeof signUpSchema>['body']

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Provide email and password').trim(),
    password: z.string().refine(value => value.length > 1, { message: 'Provide password' })
  })
})

export type LoginDataType = z.infer<typeof loginSchema>['body']
