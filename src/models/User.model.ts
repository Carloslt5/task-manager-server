import { Schema, model } from 'mongoose'

interface IUser {
  name: string
  email: string
  password: string
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    }
  },
  {
    timestamps: true
  }
)

const User = model<IUser>('User', userSchema)

export default User
