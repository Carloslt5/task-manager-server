import { type ObjectId, Schema, model } from 'mongoose'

interface IToDo {
  title: string
  completed: boolean
  owner: ObjectId
}

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId
    }
  },
  {
    timestamps: true
  }
)

const ToDo = model<IToDo>('ToDo', todoSchema)

export default ToDo
