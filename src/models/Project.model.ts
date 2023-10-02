import { Schema, model, type ObjectId } from 'mongoose'
import { type IState } from './State.model'

export interface IProject extends Document {
  title: string
  description: string
  state: IState[]
  owner: ObjectId
}

const projectschema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true,
      unique: true
    },
    description: {
      type: String,
      trim: true
    },
    state: [{
      type: Schema.Types.ObjectId,
      ref: 'State'
    }],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

const Project = model<IProject>('Project', projectschema)

export default Project
