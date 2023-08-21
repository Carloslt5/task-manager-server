import { Schema, model, type ObjectId } from 'mongoose'

export interface IProject {
  title: string
  description: string
  owner: ObjectId
}

const projectschema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId
    }
  }
)

const Project = model<IProject>('Project', projectschema)

export default Project