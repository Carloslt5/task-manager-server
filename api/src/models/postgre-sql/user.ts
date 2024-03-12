import { type UserNotID, type User } from '../../schemas/user.type'

const userTest = {
  id: '123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'password123',
}

class UserModel {
  async create({ firstName, lastName, email, password }: UserNotID): Promise<User> {
    const newID = crypto.randomUUID()

    const newUser: User = {
      id: newID,
      firstName,
      lastName,
      email,
      password,
    }

    return newUser
  }

  async get(): Promise<User> {
    return userTest
  }
}

export const usermodel = new UserModel()
