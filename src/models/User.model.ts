import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt, { type Secret } from 'jsonwebtoken'

export interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
  signToken: () => Promise<string>
  validatePassword: (plainPassword: string) => boolean
}

export interface ReqPayload {
  _id: string
  firstName: string
  lastName: string
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
userSchema.methods.validatePassword = function (plainPassword: string) {
  return bcrypt.compareSync(plainPassword, this.password)
}

userSchema.methods.signToken = function () {
  const { _id, firstName, lastName } = this
  const payload = { _id, firstName, lastName }
  const authToken: string = jwt.sign(
    payload,
    process.env.TOKEN_SECRET as Secret,
    { algorithm: 'HS256', expiresIn: '6h' }
  )
  return authToken
}

const User = model<IUser>('User', userSchema)

export default User
