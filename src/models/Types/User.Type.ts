export interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
  signToken: () => Promise<string>
  validatePassword: (plainPassword: string) => boolean
  // checkOwnerForUser: (userId: string, profileId: string) => Promise<void>
}
