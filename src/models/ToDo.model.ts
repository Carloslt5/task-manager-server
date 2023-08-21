import { type ObjectId, Schema, model } from 'mongoose'

export interface IToDo {
  title: string
  description: string
  completed: boolean
  projectId: ObjectId
  state: ObjectId
  owner: ObjectId
}

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: 'State'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)
const ToDo = model<IToDo>('ToDo', todoSchema)

export default ToDo
