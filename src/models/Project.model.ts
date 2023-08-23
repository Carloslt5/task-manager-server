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
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }
)

const Project = model<IProject>('Project', projectschema)

export default Project
