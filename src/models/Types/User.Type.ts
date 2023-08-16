export interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
  signToken: () => Promise<string>
  validatePassword: (plainPassword: string) => boolean
}
