import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { type ReqPayload } from './Types/ReqPayload.Type'
import { type IUser } from './Types/User.Type'

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
    },
    boards: [{
      type: Schema.Types.ObjectId,
      ref: 'Board'
    }]
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

userSchema.methods.signToken = function () {
  const { _id, firstName, lastName } = this
  const payload: ReqPayload = { _id, firstName, lastName }
  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET as string,
    { algorithm: 'HS256', expiresIn: '6h' }
  )
  return authToken
}

userSchema.methods.validatePassword = function (plainPassword: string) {
  return bcrypt.compareSync(plainPassword, this.password)
}

const User = model<IUser>('User', userSchema)

export default User
