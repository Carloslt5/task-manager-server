import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true
    },
    lastName: {
      type: String,
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

userSchema.pre<IUser>('save', function (next) {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

const User = model<IUser>('User', userSchema)

export default User
